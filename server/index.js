const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')

//Server initialisation
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

//define route for getting the outfits
const getOutfit = (request, response) => {
  console.log(request.body.data);
  var data = request.body.data.split(" ");

  //Constructing the specific query for the database. It uses LIKE for a similar match. LOWER for case sensitive
  let query = "SELECT * FROM items WHERE "
  for (var i=0; i<data.length-1; i++){
    query += `LOWER(product_title) LIKE LOWER('%${data[i]}%') AND ` // Dealing with multiple keywords
  }
  query += `LOWER(product_title) LIKE LOWER('%${data[data.length - 1]}%')`

  pool.query(query, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

app
  .route('/')
  // GET endpoint
  .post(getOutfit)
  // POST endpoint

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`)
})
