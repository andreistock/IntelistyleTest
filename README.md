# IntelistyleTest

This repository represents the solution to the coding question proposed by Intelistyle.

First we setup the environment by installing node, postgress, and apache. Apache is used to serve the static files, node is used to run the api and postgres is used for the database.

The solution comprises of multiple steps. First the data was prepared using processData.js (add , after every object, and enclose everything in an array [] to be able to convert it properly to json). Afterwards, the data is loaded into the postgres library using procesData.js. The server folder holds the api that makes the queries to the database and send the results. The static folder has the files that serve the webpage and that are copied to /var/www/html folder to be served by the apache folder. Both the static server and the api are hosted on the same EC2 instance.

The rules on the security group which is in front of the ec2 instance where this allow for all traffic on ports 80(http), 443(https), 5432(postgres), 3002(api) and 22 (ssh).

I have chosen to display only the brand, title, price, and product_id. Further styling will of course make it possible to display all of them. Previously I had considered displaying only 10 results, but after choosing to show only the aforementioned attributes, I chose to display all results.  
