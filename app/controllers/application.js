import Ember from 'ember';

export default Ember.Controller.extend({
  showSubmitMoveButton: function() {
    return this.get('currentPath') !== 'moves.new';
  }.property('currentPath')
});
