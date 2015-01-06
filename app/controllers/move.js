import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['session'],
  session: Ember.computed.alias("controllers.session.model"),
  
  vote: function() {
    return this.get('votes').findBy('id', this.get('session.id'));
  }.property('votes.@each.id', 'session.votes.@each.id'),
  
  upvotes: function() {
    return this.get('votes').filterBy('flag', 'up').get('length');
  }.property('votes.@each.flag'),
  
  downvotes: function() {
    return this.get('votes').filterBy('flag', 'down').get('length');
  }.property('votes.@each.flag'),
  
  
  upvoteAction: function() {
    if (!this.get('vote')) {
      return 'upvote';
    } else
    if (this.get('vote.down')) {
      return 'toggle';
    } else {
      return 'unvote';
    }
  }.property('vote.flag'),
  
  downvoteAction: function() {
    if (!this.get('vote')) {
      return 'downvote';
    } else
    if (this.get('vote.up')) {
      return 'toggle';
    } else
    if (this.get('vote.down')) {
      return 'unvote';
    }
  }.property('vote.flag'),
  
  // Actions
	actions: {
		upvote: function() {
      this.get('controllers.session').send('vote', this.get('model'), 'up');
		},
		
		downvote: function() {
      this.get('controllers.session').send('vote', this.get('model'), 'down');
		},
    
    toggle: function() {
      this.get('controllers.session').send('toggleVote', this.get('model'), this.get('vote'));
    },
    
    unvote: function() {
      this.get('controllers.session').send('unvote', this.get('model'), this.get('vote'));
    }
	}
  
});
