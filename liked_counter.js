// liked_counter.js

const fs = require('fs');

// Função para obter a quantidade atual de likes de um artigo
function getLikes(articleId) {
  const articlesData = JSON.parse(fs.readFileSync('articles.json'));
  return articlesData[articleId].likes || 0;
}

// Middleware para lidar com a contagem de likes
function likedCounterMiddleware(req, res, next) {
  const articleId = req.params.articleId; // Assumindo que o parâmetro de rota seja usado para identificar o artigo

  if (req.method === 'POST' && req.path === '/like') {
    const articlesData = JSON.parse(fs.readFileSync('articles.json'));
    
    // Incrementar a contagem de likes do artigo
    articlesData[articleId].likes = getLikes(articleId) + 1;

    // Salvar os dados atualizados no arquivo articles.json
    fs.writeFileSync('articles.json', JSON.stringify(articlesData, null, 2));
  }

  // Passar para o próximo middleware
  next();
}

module.exports = likedCounterMiddleware;


