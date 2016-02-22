var express = require('express'),
	r = require('./app/server/route'),
	app = express(),
	bodyParser = require('body-parser')

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/api/posts', r.routes.getPosts);
app.get('/api/post/:id', r.routes.getItem);
app.post('/api/post', r.routes.postEntry);

app.listen(8000, function() {
	console.log('server is running');
});