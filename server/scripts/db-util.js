(function() {
    'use strict';

    var querys = {
        selectTest: selectTest
    };
    module.exports = querys;

    var pg = require('pg');
    var pgConfig = {
      user: 'postgres',
      database: 'ws-centralizador',
      password: 'postgres',
      port: 5432,
      max: 10,
      idleTimeoutMillis: 30000,
    };

    var pool = new pg.Pool(pgConfig);

    function select(query, args, callback) {
        pool.connect(function(err, client, done) {
            if(err) {
                return console.error('Falha ao carregar pool de conexão: ', err);
            }

            client.query(query, args, function(err, result) {
                done();

                if(err) {
                    if (callbackError) {
                        callbackError(err);
                    } else {
                        console.error(err);
                    }
                }

                callback(result.rows);
            });
        });

    }

    function selectTest() {
        select('SELECT $1::int AS number', ['1'], function (data, err) {
            console.log(data[0].number);
        });
    }

})();
