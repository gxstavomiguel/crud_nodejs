const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs'); 
var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended : true }));

const authenticator = require('../middwares/authenticator');
//const jsonFilePath = path.join(__dirname, '../data/articles.json');


const readFile = () => {
  const content = fs.readFileSync('../data/articles.json', 'utf-8')
  return JSON.parse(content)
}

app.get('/salvar-novo-artigo', (req, res) =>{
  const content = readFile();
  res.send(content)

})

app.post('/salvar-novo-artigo', (req, res) =>{
const { titulo, autor, conteudo } = req.body
const currentContent = readFile()

const id = Math.random().toString(32).substr(2, 9)
currentContent.push({ id, titulo, autor, conteudo })
fs.writeFileSync('../data/articles.json', JSON.stringify(currentContent), 'utf-8')
res.send(currentContent)
})

//atualizar




app.use('/middwares', express.static(__dirname + '/middwares'));
app.get('/middwares/authenticator.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
});


app.get('/artigos.html', (req, res) => {
  const pageArtigos = path.join(__dirname, '../public/artigos.html')
  res.sendFile(pageArtigos);
})

app.get('/artigos.css', (req, res) => {
  res.setHeader('Content-Type', 'text/css');
  const cssPageArtigos = path.join(__dirname, '../public/artigos.css');
  res.sendFile(cssPageArtigos);
});

app.get('/routes/index.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
})

app.get('/app.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
})

app.get('/routes/articles.js', (req
  , res) => {
  res.setHeader('Content-Type', 'application/javascript');
})

app.post('/articleForm', (req, res) => {
  res.redirect('/artigos.html')
})




app.post('/artigos', (req, res) => {
  res.redirect('/artigos');
});

app.get('/artigos', (req, res) => {

});

//tive que fazer 2 rotas diferentes para o mesmo local, estava dando algum erro que não percebi
app.get('/home', (req, res) => { 
  const indexPath = path.join(__dirname, '../public/home.html');
  res.sendFile(indexPath);
});
app.get('/home.html', (req, res) => { 
  const indexPath = path.join(__dirname, '../public/home.html');
  res.sendFile(indexPath);
});

app.get('/login.html', (req, res) => {
  const loginHtmlPath = path.join(__dirname, '../public/login.html');
  res.sendFile(loginHtmlPath);
})

app.get('/home.css', (req, res) => {
  res.setHeader('Content-Type', 'text/css');
  const cssHomePath = path.join(__dirname, '../public/home.css') 
  res.sendFile(cssHomePath);
})

app.get('/login.css', (req, res) => {
  res.setHeader('Content-Type', 'text/css');
  const cssLoginPath = path.join(__dirname, '../public/login.css');
  res.sendFile(cssLoginPath);
});

app.set('view engine', 'ejs');

app.get('/login-page', (req, res) => {
    res.render('login'); 
});
  
  app.post('/login', authenticator, (req, res) => {
    res.redirect('/login');
  });
  
  app.get('/admin', (req, res) => {
    res.send('Página de administração logada');
  });

  app.listen(8080, function () {
    console.log('Aplicação na porta 8080!');
});

