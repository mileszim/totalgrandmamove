import Ember from 'ember';

export default Ember.ArrayController.extend({
	needs: ['application'],
	
	model: [
		{title: "Latest", location: 'latest', active: null},
		{title: "Popular", location: 'popular', active: null}
	],
	
	title: "Total Grandma Move",
	showLogo: function() {
		return this.get('controllers.application.currentPath') !== 'index';
	}.property('controllers.application.currentPath')
});
