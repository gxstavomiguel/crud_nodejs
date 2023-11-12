const buscaKey = document.getElementById('buscar_artigo').value;
console.log(buscaKey);

fetch('./data/articles.json')
.then(response => response.json())
.then(data => {
    const encontrada = data.some(item => item.titulo.includes(palavra));

    if (encontrada) {
        document.getElementById('resultado').innerText = `A palavra "${palavra}" foi encontrada no JSON.`;
    } else {
        document.getElementById('resultado').innerText = `A palavra "${palavra}" não foi encontrada no JSON.`;
    }
})
.catch(error => {
    console.error('Erro ao carregar o arquivo JSON:', error);
});


document.getElementById('buscarForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Evita o comportamento padrão do formulário, que recarregaria a página
    const palavra = document.getElementById('buscar_artigo').value;
  
    fetch('./data/articles.json')
      .then(response => response.json())
      .then(data => {
        const encontrada = data.some(item => item.titulo.includes(palavra));
  
        if (encontrada) {
          document.getElementById('resultado').innerText = `A palavra "${palavra}" foi encontrada no JSON.`;
        } else {
          document.getElementById('resultado').innerText = `A palavra "${palavra}" não foi encontrada no JSON.`;
        }
      })
      .catch(error => {
        console.error('Erro ao carregar o arquivo JSON:', error);
      });
  });
