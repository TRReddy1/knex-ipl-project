//**_7.Find the strike rate of a batsman for each season. _** \
const knex = require("../index");
const fs = require("fs");

async function main() {
  try {
    const res = await knex
      .select("season", "batsman")
      .select(
        knex.raw(
          "round((sum(total_runs-extra_runs)/sum(case when wide_runs=0 and noball_runs=0 then 1 else 0 end))*100,2) as strike"
        )
      )
      .from("DELIVERIES")
      .leftJoin("MATCHE", "MATCHE.id", "DELIVERIES.match_id")
      .groupBy("season", "batsman");

    fs.writeFile("./output/testProblem7.json", JSON.stringify(res), (err) => {
      if (!err) {
        console.log("file successfully created");
      }
    });

    knex.destroy();
  } catch (err) {
    console.log(err);
  }
}

main();
