const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', async (req, res) => {
  const query = 'SELECT * FROM GENRES;';
  try {
    const response = await pool.query(query);
    res.send(response.rows);
  } catch (err) {
    console.error('Error GETting genres', err);
    res.sendStatus(500);
  }
});

module.exports = router;