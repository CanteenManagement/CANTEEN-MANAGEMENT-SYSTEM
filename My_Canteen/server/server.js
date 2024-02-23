const express = require('express');
const mysql = require('mysql2');

const app =  express();

app.use(express.json());

app.use((request, response,next)=>{
    //Below line allows calls from any domain / site b'coz of *
    response.setHeader("Access-Control-Allow-Origin", "*");
    
    //Below line allows calls with any method GET,PUT,POST, DELETE *
    response.setHeader("Access-Control-Allow-Methods", "*");

    //Below line allows calls with any Headers - even custom so *
    response.setHeader("Access-Control-Allow-Headers", "*");
    next();
})

app.get("/customer",(reqeust,response)=>{
   
    var connection = mysql.createConnection({host: 'localhost', database: 'project', user: 'root', password: 'manager'});

    var statement = `select * from CUSTOMERS`

    console.log(statement)

    connection.query(statement,(error,result)=>{
         if(error== null){
               response.setHeader("Content-type","application/json")
               response.setHeader("Allow-Control-Allow-Origin", "*")
               response.write(JSON.stringify(result))
               connection.end()
               response.end()
         }
         else {
                response.setHeader("Conetent-type","application/json")
                response.write(JSON.stringify(error))
                response.end()
         }
    })
})


app.post("/customer", (request, response)=>{
    var connection = mysql.createConnection({host: 'localhost', database: 'project', user: 'root', password: 'manager'});

    // var CUSTOMER_ID = request.body.CUSTOMERS_ID;
    var EMAIL = request.body.EMAIL;
    var PASSWORD = request.body.PASSWORD;

    console.log(EMAIL)

    var statement = `select * from CUSTOMERS where EMAIL = '${EMAIL}'  and PASSWORD = '${PASSWORD}'`;
    console.log(statement)

    connection.query(statement, (error, result)=>{
        if (error) {
           response.setHeader("Content-Type", "application/json");
             response.write(JSON.stringify(error));
            connection.end();
            response.end();
        } else {
            if (result.length > 0) {
            
            response.setHeader("Content-Type", "application/json");
             response.write(JSON.stringify(result));
             connection.end();
             response.end();
             
            } else {
                // No user found with provided credentials
                response.status(401).json({ error: "Invalid email or password" });
            }
        }
       
    })
});




app.post("/register", (request, response)=>{
    var connection = mysql.createConnection({host: 'localhost', database: 'project', user: 'root', password: 'manager'});

    var NAME = request.body.NAME;
    var MOBILE_NO = request.body.MOBILE_NO;
    var EMAIL = request.body.EMAIL;
    var BIRTHDATE = request.body.BIRTHDATE;

    var BIRTHPLACE = request.body.BIRTHPLACE;
    var PASSWORD = request.body.PASSWORD;


    console.log(NAME)
    

    var statement = `INSERT INTO CUSTOMERS (NAME, MOBILE_NO, EMAIL, BIRTHDATE, BIRTHPLACE, PASSWORD) 
    VALUES ('${NAME}', '${MOBILE_NO}', '${EMAIL}', '${BIRTHDATE}', '${BIRTHPLACE}', '${PASSWORD}')`;
    console.log(statement)

    connection.query(statement, (error, result)=>{
        if(error==null)
        {
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(result));
            connection.end();
            response.end();
        }
        else
        {
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(error));
            connection.end();
            response.end();
        }
    })
});


app.get("/food", (request, response)=>{
    var connection = mysql.createConnection({host: 'localhost', database: 'project', user: 'root', password: 'manager'});


    var statement = `SELECT FOOD_ITEM_ID, FOOD_NAME, FOOD_PRICE, FOOD_TYPE, FOOD_IMAGE FROM food`;
    console.log(statement)

    connection.query(statement, (error, result)=>{
        if(error==null)
        {
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(result));
            connection.end();
            response.end();
        }
        else
        {
            response.setHeader("Content-Type", "application/json");
             response.write(JSON.stringify(error));
            connection.end();
            response.end();
        }
    })
});

app.get("/food/:Food_type", (request, response)=>{
    var connection = mysql.createConnection({host: 'localhost', database: 'project', user: 'root', password: 'manager'});

    var Food_TYPE = request.params.Food_type;
    console.log(Food_TYPE)

    var statement = `SELECT FOOD_ITEM_ID,FOOD_NAME, FOOD_PRICE, FOOD_TYPE, FOOD_IMAGE
    FROM food WHERE Food_TYPE = '${Food_TYPE}'`;
    console.log(statement)

    connection.query(statement, (error, result)=>{
        if(error==null)
        {
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(result));
            connection.end();
            response.end();
        }
        else
        {
            response.setHeader("Content-Type", "application/json");
             response.write(JSON.stringify(error));
            connection.end();
            response.end();
        }
    })
});


app.post("/cart", (request, response)=>{
    var connection = mysql.createConnection({host: 'localhost', database: 'project', user: 'root', password: 'manager'});

    var FOOD_ITEM_ID = request.body.FOOD_ITEM_ID;
    var FOOD_NAME = request.body.FOOD_NAME;
    var FOOD_PRICE = parseFloat(request.body.FOOD_PRICE);
    var FOOD_TYPE = request.body.FOOD_TYPE;

    var FOOD_IMAGE  = request.body.FOOD_IMAGE ;
    
    var statement = `INSERT INTO cart (FOOD_ITEM_ID, FOOD_NAME, FOOD_PRICE, FOOD_TYPE, FOOD_IMAGE) 
    VALUES (${FOOD_ITEM_ID}, '${FOOD_NAME}', ${FOOD_PRICE}, '${FOOD_TYPE}', '${FOOD_IMAGE}')`;
    console.log(statement)

    connection.query(statement, (error, result)=>{
        if(error==null)
        {
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(result));
            connection.end();
            response.end();
        }
        else
        {
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(error));
            connection.end();
            response.end();
        }
    })
});


app.get("/cart",(reqeust,response)=>{
   
    var connection = mysql.createConnection({host: 'localhost', database: 'project', user: 'root', password: 'manager'});

    var statement = `select * from cart`

    console.log(statement)

    connection.query(statement,(error,result)=>{
         if(error== null){
               response.setHeader("Content-type","application/json")
               response.setHeader("Allow-Control-Allow-Origin", "*")
               response.write(JSON.stringify(result))
               connection.end()
               response.end()
         }
         else {
                response.setHeader("Conetent-type","application/json")
                response.write(JSON.stringify(error))
                response.end()
         }
    })
})

app.delete("/cart/:FOOD_ITEM_ID", (request, response)=>{
    var connection = mysql.createConnection({host: 'localhost', database: 'project', user: 'root', password: 'manager'});

    var FOOD_ITEM_ID = request.params.FOOD_ITEM_ID;//This data belongs to header part 
  
    var statement =  `DELETE FROM cart WHERE FOOD_ITEM_ID = ${FOOD_ITEM_ID}`;

    connection.query(statement, (error, result)=>{
        if(error==null)
        {
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(result));
            connection.end();
            response.end();
        }
        else
        {
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(error));
            connection.end();
            response.end();
        }
    })
});

app.post("/orders", (request, response) => {
    var connection = mysql.createConnection({
      host: 'localhost',
      database: 'project',
      user: 'root',
      password: 'manager'
    });
  
    const data = request.body; // Array of items [{ FOOD_NAME, FOOD_PRICE, FOOD_IMAGE, Quantity }, ...]
  
    // Iterate over the array and insert each item into the database
    data.forEach(item => {
      var FOOD_NAME = item.FOOD_NAME;
      var FOOD_PRICE = item.FOOD_PRICE;
      var FOOD_IMAGE = item.FOOD_IMAGE;
      var Quantity = item.Quantity;
  
      var statement = `INSERT INTO Orders (FOOD_NAME, FOOD_PRICE, FOOD_IMAGE, Quantity)  VALUES ('${FOOD_NAME}', ${FOOD_PRICE}, '${FOOD_IMAGE}', ${Quantity})`;
      console.log(statement);
  
      connection.query(statement, (error, result) => {
        if (error == null) {
          console.log('Inserted item:', item);
        } else {
          console.error('Insert error:', error);
        }
      });
    });
  
    // Send response after all items are inserted
    response.setHeader("Content-Type", "application/json");
    response.write(JSON.stringify({ message: 'Orders placed successfully' }));
    response.end();
  
    // Close connection
    connection.end();
  });
  
  app.get("/orders",(reqeust,response)=>{
   
    var connection = mysql.createConnection({host: 'localhost', database: 'project', user: 'root', password: 'manager'});

    var statement = `select * from Orders`

    console.log(statement)

    connection.query(statement,(error,result)=>{
         if(error== null){
               response.setHeader("Content-type","application/json")
               response.setHeader("Allow-Control-Allow-Origin", "*")
               response.write(JSON.stringify(result))
               connection.end()
               response.end()
         }
         else {
                response.setHeader("Conetent-type","application/json")
                response.write(JSON.stringify(error))
                response.end()
         }
    })
})





app.listen(9898, ()=>{console.log("server started listening at port 9898");});
