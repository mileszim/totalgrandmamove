import Ember from 'ember';

export default Ember.Route.extend({
	
	actions: {
		createMove: function(move) {
			var self = this;
			
			var new_move = this.store.createRecord('move', {
				text: move.text
			});
			
			new_move.save().then(function() {
				self.transitionTo('latest');
			});
		}
	}
	
});
