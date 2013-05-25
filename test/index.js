var specify = require('specify')
	, request = require('request')
	;

specify('hello_get', function(assert){
	var name = "Paul";
	var get = { uri: "http://localhost:8000/hello?name=" + name, json: true };
	request(get, function (err, resp, body) {
		assert.equal(err,null);
		assert.equal(body.greeting, "hello " + name);
	});
});

specify('hello_post', function(assert){
	var name = "Paul";

	var postMissingFields = { uri: "http://localhost:8000/hello", method: "POST", json: true };
	request(postMissingFields, function (err, resp, body) {
		assert.equal(err,null);
		console.log("body: " + body)
		assert.equal(resp.statusCode, 400);
	});

	var formData = {name: name, id: "123456"};
	var validPost = { uri: "http://localhost:8000/hello", method: "POST", form: formData, json: true };
	request(validPost, function (err, resp, body) {
		assert.equal(err,null);
		console.log("body: " + body)
		assert.equal(body.greeting, "POST hello to " + name);
	});
});


specify.run(process.argv.slice(2));