import Ember    from 'ember';
import Firebase from 'tgm/mixins/firebase';

export default Ember.ObjectController.extend(Firebase, {
  
  // Properties
  exists: function() {
    return !!this.getAuth();
  }.property(),
  
  signedIn: function() {
    return !!this.get('token');
  }.property('token'),
  
  
  // Actions
  actions: {
    vote: function(move, flag) {
      var move_vote = this.store.createRecord('vote', {
        flag:    flag,
        content: move
      });
      var model = this.get('model');
      var user_vote = this.store.createRecord('vote', {
        flag:    flag,
        content: model
      });
      move.get('votes').addObject(user_vote);
      move.save();
      this.get('votes').addObject(move_vote);
      this.get('model').save();
    },
    
    toggleVote: function(move, move_vote) {
      var user_vote = this.get('votes').findBy('id', move.get('id'));
      var toggle = (user_vote.get('flag') === 'up') ? 'down' : 'up';
      move_vote.set('flag', toggle);
      move_vote.save();
      user_vote.set('flag', toggle);
      user_vote.save();
    },
    
    unvote: function(move, move_vote) {
      var user_vote = this.get('votes').findBy('id', move.get('id'));
      move_vote.delete();
      user_vote.delete();
    },
    
    // Auth
    login: function() {
      var auth = this.getAuth();
      var user = this.store.find('user', auth.uid);
      this.set('model', user);
    },
  
    signUp: function() {
      var _this = this;
      this.newAuth().then(function(auth) {
        var user = _this.store.createRecord('user', {
          id:         auth.uid,
          token:      auth.token,
          expires_at: auth.expires
        });
        return user.save();
      })
      .then(function(user) {
        _this.set('model', user);
      });
    },
  }
  
});
