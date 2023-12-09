//**_8.Find the highest number of times one player has been dismissed by another player. _** \

const knex = require("../index");
const fs = require("fs");

async function main() {
  try {
    const res = await knex
      .select("player_dismissed as batsmen", "bowler")
      .count("player_dismissed as count")
      .from("DELIVERIES")
      .leftJoin("MATCHE", "MATCHE.id", "DELIVERIES.match_id")
      .where("player_dismissed", "not like", "")
      .groupBy("bowler", "player_dismissed")
      .orderBy("count", "desc")
      .limit("1");

    fs.writeFile("./output/testproblem8.json", JSON.stringify(res), (err) => {
      if (!err) {
        console.log("file created successfully");
      }
    });
    knex.destroy();
  } catch (e) {
    console.log(e);
  }
}

main();
