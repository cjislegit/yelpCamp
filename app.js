const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('This is home');
});

app.listen(3000, () => {
  console.log('The YelpCamp Sever has started!');
});
