//http://psitsmike.com/2011/09/node-js-and-socket-io-chat-tutorial/

var app = require('express').createServer()
var io = require('socket.io').listen(app);
app.use(require('express').static(__dirname + '/public'));
app.listen(9993);

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

var gumball_data_array = {}; // gumball_data_array["Ted"][0] = "11,323,555"
var feedbacks = {};
var length = 256;

app.post('/post', function (req, res) { // receives in such a way that post?id=1111&nickname=Ted&data=1,2,3

    var data =  req.query.data,
    id = req.query.id,
    nickname = req.query.nickname;

    

    // if id is empty... forget about it
    if (id != null) {

	// nickname can be null. 
	if (nickname == null) 
	    nickname = id;

	// if it has a feedback request, give it
	if ((feedbacks[nickname] != null) && (feedbacks[nickname] != "0")) {
	    res.send(feedbacks[nickname]); // A, C, or D
	    feedbacks[nickname] = "0"; // reset
	}
	else
	    res.send('OK');

	// if the gumball machine has no sensor
	if (data == null) 
	    data = {"sensor_0":0,"sensor_1":0,"sensor_2":0,"timestamp":0};
	
	// if this is the new gumball machine
	if (gumball_data_array[nickname] == null) 
	    gumball_data_array[nickname]=new Array();

	// update the data array
	for (i = gumball_data_array[nickname].length - 1; i > -1 ; i--) {
	    if (i < length - 1)
		gumball_data_array[nickname][i + 1] = gumball_data_array[nickname][i]
	}
	gumball_data_array[nickname][0] = data;	

	// update interface 
	io.sockets.emit('update', nickname, gumball_data_array[nickname]);
    }

});

app.post('/feedback', function (req, res) {

    var type =  req.query.type, // type must be A, C, or D
    id = req.query.id, // NO NEED OF ID... 
    nickname = req.query.nickname;

    if (nickname != null && type != null)
	feedbacks[nickname] = type;

    res.send("Thanks. Sent: " + type + " to " + nickname);

});


app.post('/shake', function (req, res) {

    var id = req.query.id, // NO NEED OF ID NOW...
    nickname = req.query.nickname;

    // update interface 
    io.sockets.emit('shaked', nickname);
    res.send("OK");
});
