const express = require('express');
const path = require('path');
const dotenv = require('dotenv')
const app = express();

dotenv.config({ path: '.env' });

const host = process.env.FRONT_PROD_HOST
const port = process.env.FRONT_PROD_PORT;


app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});