import Ember from 'ember';

export default Ember.Mixin.create({

  newAuth: function() {
    var fb = this.store.get('firebaseRoot');
    return new Ember.RSVP.Promise(function(resolve, reject) {
      fb.authAnonymously(function(error, auth) {
        if (error) {
          reject(error);
        } else {
          resolve(auth);
        }
      });
    });
  },

  getAuth: function() {
    return this.store.get('firebaseRoot').getAuth();
  }

});
