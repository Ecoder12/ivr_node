const express = require('express');
const mysql = require('mysql');



const app = express();


// Use CORS middleware

const connection = mysql.createConnection({
  host: 'nanoshel.cuzlniri5zxa.ap-south-1.rds.amazonaws.com',
  user: 'root',
  password: 'poiuytrewq',
  database: 'ivr_node'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.use(express.json());

app.get('/insert-data', (req, res) => {
  const data = req.body;

  connection.query('INSERT INTO ivr_response SET ?', data, (error, results, fields) => {
    if (error) {
      console.error('Error inserting data into MySQL: ', error);
      res.status(500).send('Error inserting data into MySQL');
      return;
    }

    res.send('Data inserted into MySQL');
  });
});

const port = process.env.PORT || 4500;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
