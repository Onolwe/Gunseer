//loading needed packages
const path = require('path');
const html = require('html');
const express = require('express');
const body_parser = require('body-parser');

var request = require("request");
var cheerio = require("cheerio");
var wait = require("wait.for");

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
	console.log(sended.arm);
	var tab = getCarac(sended);
	setTimeout(function(){
		res.render('Answer.ejs', {name: tab[0], image: tab[1], url: tab[2]}); 
	}, 200000);
	
}

//waiting for connection
app.listen(port, hostname);

function getUrl(tag)
{
  request(
  {
    uri: "http://gundam.wikia.com/wiki/Concept:Mobile_Weapons_-_Universal_Century_Mobile_Weapons",
  },
  function(error, response, body)
  {
    var gundam ;
    var $ = cheerio.load(body);
    $(".smw-column-responsive li a").each(function(i, elem) {
      var url = 'http://gundam.wikia.com' + $(this).attr('href');
      return searchWords(url, tag, function(t){
        console.log(url);
        if(t)
        {
          console.log(url);
          gundam = url;
          return false;
        }
      });
    });
    return 'http://gundam.wikia.com';
  });
}

function searchWords(url, tag, callback)
{
  var t, nb, b = true, i;
  request(
  {
    uri: url,
  },
  function(error, response, body)
  {
    var $ = cheerio.load(body);
    for(i = 0; i < tag.length && b; ++i)
    {
      t = $("body").filter(function() {
        return $(this).text().indexOf(tag[i]) > -1;
      });
      b = (t.text() != '') && b;
    }
    callback(b);
  });
}

function getCarac(sended)
{
  var url = getUrl(sended.arm);
  setTimeout(function(){
  var r = [];
  request(
  {
    uri: url,
  },
  function(error, response, body)
  {
    var $ = cheerio.load(body);
    r[0] = $(".page-header__title").text();
    r[1] = $(".pi-image-thumbnail").attr('src');
	r[2] = url;
    console.log(r.join(", "));
  });
  return r;
  }, 20000);
}

