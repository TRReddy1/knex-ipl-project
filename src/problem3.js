//**_3.Extra runs conceded per team in the year 2016. _** \

const knex = require("../index");
const fs = require("fs");

async function main() {
  try {
    const result = await knex
      .select("batting_team")
      .sum("extra_runs as extras")
      .from("DELIVERIES")
      .leftJoin("MATCHE", "MATCHE.id", "=", "DELIVERIES.match_id")
      .where("season", "2016")
      .where("extra_runs", ">", "0")
      .groupBy("batting_team");
    fs.writeFile(
      "./output/testProblem3.json",
      JSON.stringify(result),
      (err) => {
        if (!err) {
          console.log("file successfully created");
        }
      }
    );
    knex.destroy();
  } catch (error) {
    console.log(error.messaage);
  }
}

main();
