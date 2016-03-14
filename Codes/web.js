var ip = "110.64.90.87";
var port = "8080";

var path = require('path');
var http = require('http');
var express = require('express');
var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3111);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('my secret string'));
    app.use(express.session());
    app.use(app.router);

    app.use(express.static(path.join(__dirname, 'public')));
});
// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}
server=http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

app.get('/getrank',getRank);
app.get('/upload',upload);
app.get('/getallrank',getAllRank);

function getRank(req,res){
    //res.end("redirect...");
    var url = "http://"+ip+":"+port+"/axis2/services/GameService/getRankList"
    console.log("getRank : "+url);
    res.redirect(url);
    return;
}

function getAllRank(req,res){
    //res.end("redirect...");
    var url="http://"+ip+":"+port+"/axis2/services/GameService/getRankListIn2Games";
    console.log("getAllRank : "+url);
    res.redirect(url);
    return;
}

function upload(req,res){
    //res.end("redirect...");
    var url = "http://"+ip+":"+port+
              "/axis2/services/GameService/getRankNum?name="+req.query.name+
              "&staDateString="+req.query.sta+
              "&fshDateString="+req.query.fsh;
    console.log("upload : "+url);
    res.redirect(url);
    return;
}
