//**_5.Find the number of times each team won the toss and also won the match. _** \
const knex = require("../index");
const fs = require("fs");

async function main() {
  try {
    const res = await knex
      .select("toss_winner")
      .count("toss_winner")
      .from("MATCHE")
      .whereRaw("toss_winner = winner")
      .groupBy("toss_winner");

    fs.writeFile("./output/testProblem5.json", JSON.stringify(res), (err) => {
      if (!err) {
        console.log("file successfully created");
      }
    });
    knex.destroy();
  } catch (e) {
    console.log(e);
  }
}

main();
