const fs = require('fs');



document.getElementById('salvar').addEventListener('click', function (event) {
    event.preventDefault(); 
  });
   
   document.addEventListener('DOMContentLoaded', () => {
      const formulario = document.getElementById('articleForm');
    
      formulario.addEventListener('submit', (event) => {
        event.preventDefault();
    
        const titulo = document.getElementById('titulo').value;
        const autor = document.getElementById('autor').value;
        const conteudo = document.getElementById('conteudo').value;
    
        const data = { titulo, autor, conteudo };

        fs.writeFile('dados.json', JSON.stringify(data), (err) => {
          if (err) throw err;
          console.log('Arquivo JSON criado com sucesso!');
        });
      });
    });