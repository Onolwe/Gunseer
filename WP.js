//loading needed packages
const path = require('path');
const html = require('html');
const express = require('express');
const body_parser = require('body-parser');

//method simplified
const urlencodedParser = body_parser.urlencoded({ extended: false })

//defining hostname and port
const hostname = '127.0.0.1';
const port = 3000;

//create object server
var app = express();
// allow reading of css files
app.use(express.static(__dirname));

//run server with function 'Server'
app.get('/', Server);

//allow to collect data send by the submitted form
app.post('/', urlencodedParser, Form);

//function runned by server which load file 'form.html' located in the current directory
function Server(req, res){
	res.sendFile(path.join(__dirname + '/form.html'));
	console.log('serveur lancé');
}

//the data collection function and answering
function Form(req, res){
	var sended = req.body;
	console.log(sended.NoAnime);
	res.render('Answer.ejs', {test2: 'cool', test1: 'http://images4.fanpop.com/image/photos/20700000/Gundam-00-mobile-suit-gundam-00-20740655-1600-1200.jpg'});
}

//waiting for connection
app.listen(port, hostname);

