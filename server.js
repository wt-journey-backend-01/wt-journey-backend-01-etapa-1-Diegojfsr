const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Página principal (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Página de sugestão - GET via query string
app.get('/sugestao', (req, res) => {
  const { nome, ingredientes } = req.query;
  res.send(`
    <h1>Obrigado pela sugestão, ${nome}!</h1>
    <p>Ingredientes sugeridos: ${ingredientes}</p>
    <a href="/">Voltar ao início</a>
  `);
});

// Página de contato (GET)
app.get('/contato', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contato.html'));
});

// Recebe formulário de contato (POST)
app.post('/contato', (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;
  res.send(`
    <h1>Mensagem recebida!</h1>
    <p><strong>Nome:</strong> ${nome}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Assunto:</strong> ${assunto}</p>
    <p><strong>Mensagem:</strong> ${mensagem}</p>
    <a href="/">Voltar ao início</a>
  `);
});

// API de lanches - JSON
app.get('/api/lanches', (req, res) => {
  res.json([
    {
      id: 1,
      nome: "DevBurger Clássico",
      ingredientes: "Pão brioche, Carne 150g, Queijo cheddar, Alface americana, Tomate fresco, Molho especial"
    },
    {
      id: 2,
      nome: "Burger de Bacon",
      ingredientes: "Pão australiano, Carne 180g, Queijo prato, Bacon crocante, Cebola caramelizada, Molho barbecue"
    },
    {
      id: 3,
      nome: "Commit Veggie",
      ingredientes: "Pão integral, Burger de grão de bico, Queijo vegano, Rúcula, Tomate seco, Maionese de ervas"
    }
  ]);
});

// Middleware de erro 404 (rota não encontrada)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor da DevBurger rodando em http://localhost:${PORT}`);
});
