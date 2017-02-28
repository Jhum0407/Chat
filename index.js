var express = require("express");
var app = express();


app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
	res.render("page");
});

var io = require('socket.io').listen(app.listen(process.env.PORT || 5000  ));

io.on('connection', function (socket) {
	socket.emit('message', { message: 'welcome to the chat' });
	socket.on('send', function (data) {
		io.sockets.emit('message', data);
	});
});
console.log("Listening on port ");