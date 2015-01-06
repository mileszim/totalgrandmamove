import Ember from 'ember';

export default Ember.Component.extend({

	actions: {
		submit: function() {
			this.sendAction('submit', {
				text: this.get('text').replace(/\.?\s?tgm\.?\s*$/i, '') + '.'
			});
		}
	}

});
