import Ember from 'ember';
import {MetaModel, attr} from 'fireplace';


export default MetaModel.extend({
	flag: Ember.computed.alias('meta'),
  
  up:   Ember.computed.equal('flag', 'up'),
  down: Ember.computed.equal('flag', 'down')
  
  // created_at: attr('timestamp', {
  //   default: function() { return new Date(); }
  // })
});