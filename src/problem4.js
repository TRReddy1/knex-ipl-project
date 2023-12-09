//**_4.Top 10 economical bowlers in the year 2015. _** \

const knex = require("../index");
const fs = require("fs");

async function main() {
  try {
    const res = await knex
      .select("bowler")
      .select(
        knex.raw(
          "round((sum(total_runs)/(sum(case when wide_runs=0 and noball_runs=0 then 1 else 0 end)/6)),2) as economy"
        )
      )
      .from("DELIVERIES")
      .leftJoin("MATCHE", "MATCHE.id", "=", "DELIVERIES.match_id")
      .where("season", "2015")
      .groupBy("bowler")
      .orderBy("economy")
      .limit("10");

    fs.writeFile("./output/testProblem4.json", JSON.stringify(res), (err) => {
      if (!err) {
        console.log("file successfully created");
      }
    });

    knex.destroy();
  } catch (e) {
    console.error(e);
  }
}

main();
