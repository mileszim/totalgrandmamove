import Ember from 'ember';

export default Ember.Controller.extend({
	needs: ['application'],
	
	show: function() {
		return this.get('controllers.application.currentPath') === 'index';
	}.property('controllers.application.currentPath')
});
