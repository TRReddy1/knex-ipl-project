//**_9.Find the bowler with the best economy in super overs. _**
const knex = require("../index");
const fs = require("fs");

async function main() {
  try {
    const res = await knex
      .select("bowler")
      .select(
        knex.raw(
          "round(sum(total_runs)/(sum(case when noball_runs=0 and wide_runs=0 then 1 else 0 end)/6),2) as economy"
        )
      )
      .from("DELIVERIES")
      .leftJoin("MATCHE", "MATCHE.id", "DELIVERIES.match_id")
      .where("is_super_over", "!=", "0")
      .groupBy("bowler")
      .orderBy("economy")
      .limit("1");

    fs.writeFile("./output/testProblem9.json", JSON.stringify(res), (err) => {
      if (!err) {
        console.log("file created successfully");
      }
    });

    knex.destroy();
  } catch (error) {
    console.log(error);
  }
}

main();
