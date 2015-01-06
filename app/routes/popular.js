import Ember from 'ember';

export default Ember.Route.extend({
  controllerName: 'moves.index',
  templateName:   'moves.index',
  
	model: function() {
		return this.store.fetch('move');
	},
  
	setupController: function(controller, model) {
    this._super(controller, model);
		controller.set('sortProperties', ['upvotes']);
		//controller.set('sortAscending', false);
	}
  
});
