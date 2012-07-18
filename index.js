var express = require('express');
var app = express.createServer();

app.configure(function(){
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(express.static(__dirname));
    app.set('views', __dirname);
    app.set('view engine', 'html');
    app.register('.html', require('ejs'));
    app.set('view options', {
      open: '<?',
      close: '?>',
      layout: false
    });
});

app.get('/ctrl', function(req, res){
	res.render('ctrl.html', {
		host: req.headers.host
	});
})

var io = require('socket.io').listen(app);
io.sockets.on('connection', function (socket) {
  var page = 0;
  socket.emit('page', page);
  socket.on('next', function () {
  	console.log('>>>>>>>>>>>>');
    socket.broadcast.emit('page', ++page);
  });
  socket.on('prev', function(){
  	console.log('<<<<<<<<<<<<');
  	socket.broadcast.emit('page', --page);
  })
});
app.listen(3000);


