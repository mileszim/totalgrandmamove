import Ember from 'ember';

export default Ember.Route.extend({
  
	model: function() {
		return this.store.fetch('move');
	},
  
	setupController: function(controller, model) {
    this._super(controller, model);
		controller.set('sortProperties', ['created_at']);
		controller.set('sortAscending', false);
	}
  
});
