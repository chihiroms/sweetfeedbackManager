//http://psitsmike.com/2011/09/node-js-and-socket-io-chat-tutorial/

var app = require('express').createServer()
var io = require('socket.io').listen(app);
app.use(require('express').static(__dirname + '/public'));
app.listen(9999);

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

var received = {};
var length = 256;
app.post('/post', function (req, res) {

    var data =  req.query.data,
    id = req.query.id,
    nickname = req.query.nickname;


    if ((feedbacks[nickname] != null) && (feedbacks[nickname] == "candy")) {
	res.send('candy'); feedbacks[nickname] = "0";
    }
    else
	res.send('hello');

    if (data != null) {
	if (received[nickname] == null) 
	    received[nickname]=new Array();

	for (i = received[nickname].length - 1; i > -1 ; i--) {
	    if (i < length - 1)
		received[nickname][i + 1] = received[nickname][i]
	}

	received[nickname][0] = data;	
	io.sockets.emit('updategraph', nickname,  received[nickname]);
    }
});


var feedbacks = {};
io.sockets.on('connection', function (socket) {

    socket.on('gmclicked', function(nickname){
	feedbacks[nickname] = "candy";
    });

});