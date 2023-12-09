//**_2.Number of matches won per team per year in IPL. _** \

const knex = require("../index");
const fs = require("fs");

async function main() {
  try {
    const result = await knex
      .select("season", "winner")
      .count("winner as wins")
      .from("MATCHE")
      .where("winner", "!=", "")
      .groupBy("season", "winner")
      .orderBy("season");

    fs.writeFile(
      "./output/testProblem2.json",
      JSON.stringify(result),
      (err) => {
        if (!err) {
          console.log("file created successfully");
        }
      }
    );
    knex.destroy();
  } catch (error) {
    console.log(error.message);
  }
}

main();
