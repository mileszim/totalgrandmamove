import {Model, attr, hasMany} from 'fireplace';

export default Model.extend({
  //user:     hasOne({ embedded: false }),
  
  text:     attr('string'),
  
	votes:     hasMany('user', { embedded: false, as: 'vote' }),
  //votes:     hasMany({ embedded: false }),
  //upvotes:   attr('number', { default: function() { return 0; } }),
  //downvotes: attr('number', { default: function() { return 0; } }),
  
	created_at: attr('timestamp', { 
    default: function() { return new Date(); } 
  })
  
});
