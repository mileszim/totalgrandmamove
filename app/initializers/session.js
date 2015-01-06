export function initialize(container) {
  var session = container.lookup('controller:session');
  if (session.get('exists')) {
    session.send('login');
  } else {
    session.send('signUp');
  }
}

export default {
  name: 'session',
  after: 'store',
  initialize: initialize
};
