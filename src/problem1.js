//**_1.Number of matches played per year for all the years in IPL._** \

const knex = require("../index");
const fs = require("fs");

knex
  .select("season")
  .count("season as count")
  .from("MATCHE")
  .groupBy("season")
  .then((res) => {
    fs.writeFile("./output/testProblem1.json", JSON.stringify(res), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("file successfully created");
      }
    });
  })
  .catch((err) => console.error(err))
  .finally(() => knex.destroy());
