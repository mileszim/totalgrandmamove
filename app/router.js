import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	this.route('index', { path: '/' });
	
	this.route('latest');
	this.route('popular');

  this.resource('moves', function() {
  	this.route('new');
  });
  this.resource('move', { path: 'move/:move_id' });
});

export default Router;
