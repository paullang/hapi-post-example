## Example application with various HTTP POST routes with [Hapi.js] (https://npmjs.org/package/hapi "Hapi.js")

After downloading, run the following to download the node_modules

    npm install

Please make sure you have node >= 0.10.5

    node -v

Run the program with

    node .

GET

    curl http://localhost:8000/hello?name=Paul
    should respond with 
    {"greeting":"hello Paul"}

POST

    curl http://localhost:8000/hello -d "name=Paul2"
    should respond with
    {"greeting":"POST hello Paul2"}

POST via XHR examples

See [http://localhost:8000/examples.html] (http://localhost:8000/examples.html "examples")


