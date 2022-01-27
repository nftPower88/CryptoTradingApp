const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());

app.use('/api/signin', (req, res) => {
  res.send({
    accessToken: 'cryptotradingapp1234567890'
  });
});

app.listen(8080, () => console.log('API is running on http://localhost:8080/api/signin'));