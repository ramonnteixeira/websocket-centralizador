var WebSocket = require('ws');


for (var j = 0; j < 10; j++) {
    setTimeout(function() {
        for (var i = 0; i < 1500; i++) {
            openWs();
        }
    }, j * 1000);
}


function openWs() {
  var ws = new WebSocket('ws://localhost:9000');
  ws.on('open', function() {
    ws.send('{"nome": "Teste", "mensagem": "teste"}');
    setTimeout(function() { ws.close(); }, 15000);
  });
}
