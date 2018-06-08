var request = require("request");
var cheerio = require("cheerio");
var http = require("http");
var wait = require("wait.for");

http.createServer(function (req, res)
{
  var g = [];
  var tag = ["Vulcan gun", "Saber", "Nuclear Missile"];
  console.log("Recherche lancée");
  wait.launchFiber(get, tag);
  //getCarac("http://gundam.wikia.com/wiki/XXXG-01W_Wing_Gundam");
}).listen(8080);

function get(tag)
{
  var g = wait.for(getUrl, tag);
  var r = wait.for(getCarac, g);
  console.log(r.join(", "));
  return r;
}

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
    return gundam;
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

function getCarac(url)
{
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
    console.log(r.join(", "));
  });
  return r;
}
