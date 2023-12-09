//**_6.Find a player who has won the highest number of Player of the Match awards for each season. _** \
const knex = require("../index");
const fs = require("fs");

async function main() {
  try {
    const maxSubquery = knex("MATCHE")
      .select("season", "player_of_match")
      .count("player_of_match as award")
      .groupBy("season", "player_of_match")
      .as("pom");

    const maxSeasonSubquery = knex(maxSubquery)
      .select("pom.season")
      .max("pom.award as max_award")
      .groupBy("pom.season")
      .as("max_season");

    const result = await knex("MATCHE as m")
      .select("m.season", "m.player_of_match", "max_season.max_award")
      .distinct("m.season")
      .join(maxSubquery, function () {
        this.on("pom.season", "=", "m.season").andOn(
          "m.player_of_match",
          "=",
          "pom.player_of_match"
        );
      })
      .join(maxSeasonSubquery, function () {
        this.on("max_season.season", "=", "pom.season").andOn(
          "max_season.max_award",
          "=",
          "pom.award"
        );
      })
      .orderBy("m.season")
      .limit("10");

    fs.writeFile(
      "./output/testProblem6.json",
      JSON.stringify(result),
      (err) => {
        if (!err) {
          console.log("file created successfully");
        }
      }
    );

    knex.destroy();
  } catch (error) {
    console.log(error);
  }
}

main();
