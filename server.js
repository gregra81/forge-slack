// Provide environment through console i.e. PORT=3001 node server.js
var port = process.env.PORT || 3001,
    config = require('./config.js');


//import all the messages for commands
var ossCmd = require('./messages/oss');

//Make sure port is a number
if (isNaN(port)) {
    port = 3001;
}

// Setup dependencies
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));


var formatResponse = function(responseObj,respBody){
    if (respBody.attachments){
        responseObj.attachments = respBody.attachments;
    }
    if (respBody.text){
        responseObj.text = respBody.text;
    }

    return responseObj;
}

var responseToForgeCmd = function(text){
    var params = text.split(' ');
    var respBody;
    switch (params[0].toLowerCase()){
        case 'oss':
            respBody = ossCmd.response(params[1].toLowerCase());
            break;
        default:
            respBody = {text: 'I\'m not familiar with this forge command'};
            break;
    }

    return respBody;
}

// Access token service
app.post('/slack-forge', function (req, res) {

    console.log(config.SLACK_TOKEN);
    console.log(req.body);
    if (req.body.token && req.body.token === config.SLACK_TOKEN){

        var responseObj = {
            "response_type": "ephemeral"
        },
        respBody;
        //general forge command - /forge
        switch (req.body.command){
            case '/forge':
                respBody = responseToForgeCmd(req.body.text);
                break;
            default:
               respBody = {text: 'I\'m not familiar with this command'};
               break;    

        }




        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(formatResponse(responseObj,respBody)));


    }else{
        res.status(401).send('You must provide a valid slack token');
    }

});

app.get('/slack-forge', function (req, res) {
    res.send("1");
});


app.listen(port);

console.log('Express server started on port ' + port);
