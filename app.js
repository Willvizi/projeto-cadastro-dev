const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => res.send('Teste Will!'));
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}!`));