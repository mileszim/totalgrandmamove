import {Model, attr, hasMany} from 'fireplace';


export default Model.extend({
  token: attr('string'),
  votes: hasMany('move', { embedded: false, as: 'vote' }),
  
	created_at: attr('timestamp', { 
    default: function() { return new Date(); } 
  }),
  
  expires_at: attr('timestamp')
  
});
