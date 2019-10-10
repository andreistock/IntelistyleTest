'use strict';

const fs = require('fs');
var pg = require('pg');

//Configuration for accessing the database. Normally, we would want this in a different file with different access permissions
var config = {
    user: 'deployer', // env var: PGUSER
    database: 'garmentdata', // env var: PGDATABASE
    password: 'passworddeploy', // env var: PGPASSWORD
    host: 'localhost', // Server hosting the postgres database
    port: 5432, // env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
}



const pool = new pg.Pool(config)

// Create the table into the database
let queryA = 'CREATE TABLE IF NOT EXISTS items (product_categories_mapped TEXT [],  product_id TEXT,  url TEXT,  gender TEXT, brand TEXT,  product_description TEXT, image_urls TEXT [], source TEXT, product_categories TEXT [], images TEXT [], price TEXT, product_title TEXT);';

pool.query(queryA, (err, res) => {
  console.log(err, res)
})

function insertDataToTable (e){
  let values = [e.product_categories_mapped, e.product_id, e.url, e.gender, e.brand, e.product_description, e.image_urls, e.source, e.product_categories, e.images, e.price, e.product_title];
  let queryA = 'INSERT INTO items (product_categories_mapped,product_id,url,gender,brand,product_description,image_urls,source,product_categories,images,price,product_title) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *';
  console.log(queryA)
  // try {
  //   const res = await pool.query(queryA, values)
  //   console.log(res.rows[0])
  //   // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
  // } catch (err) {
  //   console.log(err.stack)
  // }
  pool.query(queryA,values,(err,res) => {
    if (err) {
    console.log(err.stack)
  } })
}


const processData = data => new Promise((resolve) => {
  for (var i = 0; i < data.length; i++){
    insertDataToTable(data[i])
  }
})

fs.readFile('outputfile.json', 'utf8',function(err,content){
  const data = JSON.parse(content);

  processData(data).then(() => pool.end() )

  // wait(40000).then(() => pool.end());

});
