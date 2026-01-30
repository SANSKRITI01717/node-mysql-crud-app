const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require("path");
const methodoverride = require("method-override");
app.use(methodoverride("_method"));
app.use(express.urlencoded({ extended: true }));
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'app',
  password: 'XXXXX',
});
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// let getRandomUser = () => {
//   return [
//     faker.string.uuid(),
//     faker.internet.username(),
//     faker.internet.email(),
//     faker.internet.password({ length: 12 })
//   ];
// };

// let q = "INSERT INTO user (id, username, email, `password`) VALUES ?";
// let data = [];

// for (let i = 0; i < 100; i++) {
//   data.push(getRandomUser());
// }
app.get('/', (req, res) => {
  try {
    let q = `select count(*) from user`;
    connection.query(q, (err, result) => {
      if (err) {
        throw err;
      }
      let count = result[0]["count(*)"];

      res.render("home.ejs", { count });

    });
  }

  catch (err) {
    console.log(err);
    res.send("some error in db")
  }
})

app.get('/user', (req, res) => {

  try {
    let q = `select * from user`;
    connection.query(q, (err, result) => {
      if (err) {
        throw err;
      }

      res.render("showuser.ejs", { result });

    });
  }

  catch (err) {
    console.log(err);
    res.send("some error in db")
  }
})
//edit
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;


  try {
    let q = `select * from user where id='${id}'`;

    connection.query(q, (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result);
      res.render("edit.ejs", { user: result[0] });

    });
  }

  catch (err) {
    console.log(err);
    res.send("some error in db")
  }
})
//delete 
app.get("/user/:id/del", (req, res) => {
  let { id } = req.params;


  try {
    let q = `select * from user where id='${id}'`;

    connection.query(q, (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result);
      res.render("del.ejs", { user: result[0] });

    });
  }

  catch (err) {
    console.log(err);
    res.send("some error in db")
  }
})
//---------------------------------------------
app.delete("/user/:id", (req, res) => {

  let { id } = req.params;
  let { password: pw, email: e } = req.body;

  try {
    let q = `select * from user where id='${id}'`;

    connection.query(q, (err, result) => {
      if (err) {
        throw err;
      }

      let user = result[0];

      if (pw != user.password || e != user.email) {
        res.send("wrong pss or email");
      } else {
        let q2 = `delete from user where id='${id}' `;

        connection.query(q2, (err, result) => {
          if (err) {
            throw err;
          }

          res.redirect("/user");
        });
      }
    });

  } catch (err) {
    console.log(err);
    res.send("some error in db");
  }
});
//-----------------------------------------------------------
//add
app.get("/user/add",(req,res)=>{
  res.render("add.ejs");
})
app.post("/user",(req,res)=>{
  let id= faker.string.uuid();
    let { password : pw, username:un ,email:e } = req.body;
  let q = `insert into user (id,username,email,password) values ('${id}', '${un}','${e}','${pw}')`;

        connection.query(q, (err, result) =>{
           if (err) {
              throw err;
            }
            res.redirect('/user');
        })
})

      //update
      app.patch("/user/:id", (req, res) => {

        let { id } = req.params;
        let { password: pw, username: un } = req.body;
        try {
          let q = `select * from user where id='${id}'`;
          connection.query(q, (err, result) => {
            if (err) {
              throw err;
            }
            let user = result[0];
            if (pw != user.password) {
              res.send("wrong pss");
            } else {
              let q2 = `update user set username = '${un}' where id='${id}' `;
              connection.query(q2, (err, result) => {
                if (err) {
                  throw err;
                }
                res.redirect("/user");
              })
            }
            // res.send(user);
            //     console.log(user)

          });
        }

        catch (err) {
          console.log(err);
          res.send("some error in db")
        }

      })
      app.listen("3000", () => {
        console.log("app is listing");
      })

// connection.query(q, [data], (err, res) => {
//   if (err) {
//     console.error("Insert error:", err);
//     return;
//   }
//   console.log("Rows inserted:", res.affectedRows);
//   connection.end();
// });
