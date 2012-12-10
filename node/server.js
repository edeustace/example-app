var app, express, fs, port;

fs = require('fs');

express = require('express');
app = express();


var scores = {};

app.use(express.static(__dirname + '/'));

app.post("/grade", function(req, res){

	req.on('data', function(chunk) {
      console.log("Receiving Post:");
      var xml = chunk.toString();
      var sid = xml.match("<sourcedId>(.*?)</sourcedId>")[1];
		var score = xml.match("<textString>(.*?)</textString>")[1];
		console.log(sid);
		console.log(score);
		scores[sid] = score;
    });

	res.send("Okay");
});

app.get("/grade", function(req, res) {
	console.log(req.query);
	res.send(scores[req.query.id]);
});

port = process.env.PORT || 8000;

app.listen(port, function() {
  return console.log("server started");
});