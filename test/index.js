const specify = require('specify');
const request = require('request');

const name = 'Paul';
const uri = 'http://localhost:8000/hello';

specify('hello_get', function(assert) {
	
	const get = { uri: uri + '?name=' + name, json: true };
	request(get, function (err, resp, body) {
		assert.equal(err,null);
		assert.equal(body.greeting, 'hello ' + name);
	});
});

specify('hello_post', function(assert) {

	const postMissingFields = { uri: uri, method: 'POST', json: true };
	request(postMissingFields, function (err, resp, body) {
		assert.equal(err,null);
		assert.equal(resp.statusCode, 400);
	});

	const formData = {name: name, id: '123456'};
	const validPost = { uri: uri, method: 'POST', form: formData, json: true };
	request(validPost, function (err, resp, body) {
		assert.equal(err,null);
		assert.equal(body.greeting, 'POST hello to ' + name);
	});
});

specify.run(process.argv.slice(2));
