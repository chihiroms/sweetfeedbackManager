//http://psitsmike.com/2011/09/node-js-and-socket-io-chat-tutorial/

var app = require('express').createServer()
var io = require('socket.io').listen(app);
app.use(require('express').static(__dirname + '/public'));
app.listen(9999);

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

var gumball_data_array = {}; // gumball_data_array["Ted"][0] = "11,323,555"
var feedbacks = {};
var length = 256;

app.post('/post', function (req, res) {

    var data =  req.query.data,
    id = req.query.id,
    nickname = req.query.nickname;

    // if it has a feedback info, return it
    if ((feedbacks[nickname] != null) && (feedbacks[nickname] != "0")) {
	res.send(feedbacks[nickname]); 
	feedbacks[nickname] = "0"; // reset
    }
    else
	res.send('OK');

    // update the data array
    if (data != null) {
	if (gumball_data_array[nickname] == null) 
	    gumball_data_array[nickname]=new Array();

	for (i = gumball_data_array[nickname].length - 1; i > -1 ; i--) {
	    if (i < length - 1)
		gumball_data_array[nickname][i + 1] = gumball_data_array[nickname][i]
	}

	gumball_data_array[nickname][0] = data;	
	io.sockets.emit('updategraph', nickname, gumball_data_array[nickname]);
    }
});

app.post('/feedback', function (req, res) {

    var type =  req.query.type,
    id = req.query.id,
    nickname = req.query.nickname;

    // store feedback information
    feedbacks[nickname] = type;
}


io.sockets.on('connection', function (socket) {

    socket.on('gmclicked', function(nickname){
	feedbacks[nickname] = "candy";
    });

});