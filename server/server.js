var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 9000});

var weak = require('weak');
var count = 0;
var countGc = 0;

//var dbUtil = require('./scripts/db-util');
//dbUtil.selectTest();

wss.on('connection', function(socket) {

    // count client objects not garbage collected
    countGc++;
    weak(socket, function() {
        countGc--;
    });
    count++;

    // wss.clients.forEach(function each(client) {
    //     try {
    //         if (client.uuid) {
    //             socket.send(client.uuid + ' Participa da conversa.');
    //         }
    //     } catch(e) {
    //         console.error('Falha ao enviar mensagem', e);
    //     }
    // });

    socket.on('message', function(message) {
        try {
            var receive = JSON.parse(message);

            if (!socket.uuid && receive.nome) {
                socket.uuid = receive.nome;
                // wss.clients.forEach(function each(client) {
                //     if (client !== socket) {
                //         client.send(socket.uuid + ' entrou na sala');
                //     }
                // });
            }

            // wss.clients.forEach(function each(client) {
            //     if (receive.mensagem.indexOf('Conectou') > -1) {
            //         return;
            //     }
            //     if (client !== socket) {
            //         client.send(receive.nome + ': ' + receive.mensagem);
            //     }
            // });
        } catch(e) {
            console.error('Falha ao receber mensagem', e);
        }
    });

    socket.on('close', function() {
        count--;
        // try {
        //     wss.clients.forEach(function each(client) {
        //         if (client !== socket) {
        //             client.send(socket.uuid + ': Desconectou');
        //         }
        //     });
        // } catch(e) {
        //     console.error('Falha ao enviar mensagem', e);
        // }

        socket.close();
        delete socket;
    });

});

setInterval(function() {
  if (typeof gc === 'function') gc()
  console.log('connected: %d, not garbage collected: %d   | Memory use %d Mb', count, countGc, process.memoryUsage().rss / 1048576)
}, 1000);
