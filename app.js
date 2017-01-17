var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Web3 = require("web3")

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
web3.net.peerCount //verify that the node is connnected to at least 1 peer, if not: panic
web3.eth.syncing // if result = "false" we are good to go; if not: you can still make the calls but the blockchain won't be up to date// 


MotorLedger = web3.eth.contract([{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"MotorList","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_identifierMotor","type":"bytes32"},{"name":"_newAddress","type":"address"},{"name":"_description","type":"string"}],"name":"modifyMotor","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"_MechsList","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_identifierMotor","type":"bytes32"},{"name":"_description","type":"string"},{"name":"_identifiertendeur","type":"bytes32"},{"name":"_logtendeur","type":"string"},{"name":"_identifiervilebrequin","type":"bytes32"},{"name":"_logvilebrequin","type":"string"}],"name":"addMotor","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_AllowedMechsContract","type":"address"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"identifier","type":"bytes32"},{"indexed":false,"name":"TrackAddress","type":"address"},{"indexed":false,"name":"description","type":"string"}],"name":"MotorAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"identifier","type":"bytes32"},{"indexed":false,"name":"TrackAddress","type":"address"},{"indexed":false,"name":"description","type":"string"}],"name":"MotorChanged","type":"event"}])

// ######### adding the ABI for Motor 

Motor = web3.eth.contract([{"constant":false,"inputs":[{"name":"_logvilebrequin","type":"string"},{"name":"_identifiervilebrequin","type":"bytes32"}],"name":"changevilebrequin","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"description","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"identifier","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"tendeur","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"vilebrequin","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_logtendeur","type":"string"},{"name":"_identifiertendeur","type":"bytes32"}],"name":"changetendeur","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_identifier","type":"bytes32"},{"name":"_description","type":"string"},{"name":"_part1","type":"address"},{"name":"_part2","type":"address"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_WhatPart","type":"string"},{"indexed":false,"name":"newPart","type":"address"}],"name":"PartReplaced","type":"event"}])

// ######### adding the ABI for Part

Part = web3.eth.contract([{"constant":false,"inputs":[{"name":"_log","type":"string"}],"name":"LogChange","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"log","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"PartIdentifier","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"MotorIdentifier","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"inputs":[{"name":"_identifierMotor","type":"bytes32"},{"name":"_identifierPart","type":"bytes32"},{"name":"_log","type":"string"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"change","type":"string"}],"name":"PartChangeLog","type":"event"}])

// ######### Defining the MotorLedger Instance with his address

MotorLedgerInstance = MotorLedger.at('0x37EB3708b071DE5e873B2918b2157332eAdcEC37')

EventAdded = MotorLedgerInstance.MotorAdded({},{fromBlock: 0, toBlock: 'latest'})
EventChanged = MotorLedgerInstance.MotorChanged({},{fromBlock: 0, toBlock: 'latest'})

// ######### Displaying the MotorLedger past events
 MotorAddress  = MotorLedgerInstance.MotorList("0x1eea5236ea7c0b1bff65e9e1eea1ebd9f89485f49d04cf2e5984027a0d0a60c5")
console.log(MotorAddress)
var routes = require('./routes/index');
var users = require('./routes/users');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 80);

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});




app.listen(80, function () {
  console.log('Ca marche?')
})



io.on('connection', function (socket) {
  socket.emit('message', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);

});
});
