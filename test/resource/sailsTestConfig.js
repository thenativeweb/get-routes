'use strict';

module.exports = {
  log: {
    level: 'silent'
  },
  models: {
    connection: 'test',
    migrate: 'drop'
  },
  connection: {
    test: {
      adapter: 'sails-memory'
    }
  },
  routes: {
    '/': (req, res) => {
      res.send('ok');
    }

  },
  http: {

    middleware: {

      order: [
        'cookieParser',
        'session',
        'bodyParser',
        'compress',
        'poweredBy',
        '$custom',
        'paramValidator',
        'router',
        'www',
        'favicon',
        '404',
        '500'
      ]
    }
  }
};

