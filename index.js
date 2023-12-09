// const knex = require("knex")({
//   client: "mysql2",
//   connection: {
//     host: "localhost",
//     user: "root",
//     password: "very_strong_password",
//     database: "db",
//   },
// });

const knex = require("knex");

const config = {
  client: "mysql2",
  connection: {
    host: "localhost",
    user: "root",
    password: "very_strong_password",
    database: "db",
  },
};

const connection = knex(config);

module.exports = connection;

// connection
//   .select("id")
//   .from("MATCHE")
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err))
//   .finally(() => connection.destroy());
