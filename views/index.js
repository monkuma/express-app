var express = require('express');
var ejs = require('ejs');

var app = express();

app.engine('ejs', ejs.renderFile);
app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

var data = {
    'Taro':'taro@yamada',
    'Hanako':'hanako@flower',
    'Sachiko':'scchiko@happy',
    'Ichiro':'ichiro@baseball',
}
//topページ
app.get('/', (req, res) => {
    var url = '/other?name=taro&pass=yamada';
    var msg = 'This is Express-app Top page!' + 
    '<br>メッセージを書いて送信してください。';
    
    res.render('index.ejs',
        {
            title: 'Index',
            content: msg,
            data:data,
        });
});

//POST送信の処理
app.post('/', (req, res) => {
    var msg = 'This is Posted page.' +
    'あなたは「<b>' + req.body.message +
    '</b>」と送信しました。';
    res.render('index.ejs',
    {
        title: 'Posted',
        content: msg,
    })
})

//Otherページ
app.get("/other", (req, res) => {
    var name = req.query.name;
    var pass = req.query.pass;
    var msg = 'Your name is ' + name  + '.' +
    '<br>Your password is ' + pass + ".";
    
    res.render('index.ejs',
    {
        title:'other',
        content:msg,
        link:{href:'/', text:'トップに戻る'}
    });
});

var server = app.listen(3000, () => {
    console.log("Server is runnning!");
})


