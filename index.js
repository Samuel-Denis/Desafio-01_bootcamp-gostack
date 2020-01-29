const express = require('express');

const server = express();

server.use(express.json());

const projetos = [];

let contador = 0 ;

function idexistente (req, res, next) {
  const { id } = req.params;
  
  const projeto = projetos.find(p => p.id == id );

  if(!projeto){
  return res.status(400).json({ erro: "Projeto não encontrado"})
  }
  next();
}
server.use((req, res, next) => {
  contador +=1;
  console.log(`Numero de Solicitação até o momento ${contador}`)
next();
});

server.post('/projetos', (req, res) => {
  const { id, nome } = req.body;

  const projeto = {
    id, 
    nome,
    tarefas: []
   };

   projetos.push(projeto);

   return res.json(projetos);
});

server.put('/projetos/:id', idexistente, (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  const projeto = projetos.find(p => p.id == id);

  projeto.nome = nome;

  return res.json(projeto);
});

server.delete('/projetos/:id', idexistente, (req, res) =>{
  const { id } = req.params;

  const index = projetos.findIndex(p => p.id == id);

  projetos.splice(index, 1);

  return res.json();
});

server.post('/projetos/:id/tarefas', idexistente, (req, res) =>{
  const { id } = req.params;
  const { novatarefa } = req.body;

  const projeto = projetos.find(p => p.id == id );

  projeto.tarefas.push(novatarefa);

  return res.json(projeto);


})

server.get('/projetos', (req, res) => {
  return res.json(projetos);
});

server.listen(3333);