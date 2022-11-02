const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    await knex(tables.wedstrijd).delete();

    await knex(tables.wedstrijd).insert([
      {
        id: "772cc00e-4f46-4858-bdb6-6225d960904c",
        datum: "2022-11-19",
        dag: "zaterdag",
        naam: "VSB Beker",
        locatie: "Sint-Niklaas",
        trainer: "Ynte Audenaert",
        functie: "Coach",
        notities: null,
      },
    ]);
  },
};
