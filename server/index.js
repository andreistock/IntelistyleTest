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
  //Constructing the specific query for the database. It uses LIKE for a similar match. Futher improvement can deal with issues such as capitalisation.
  let query = "SELECT * FROM items WHERE "
  for (var i=0; i<data.length-1; i++){
    query += `product_title LIKE '%${data[i]}%' AND `
  }
  query += `product_title LIKE '%${data[data.length - 1]}%'`


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
