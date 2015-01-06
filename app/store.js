import {Store} from 'fireplace';

export default Store.extend({
  firebaseRoot: new window.Firebase('https://totalgrandmamove.firebaseio.com')
});