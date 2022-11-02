const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    await knex(tables.kamp).delete();

    await knex(tables.kamp).insert([
      {
        id: "772cc00e-4f46-4858-bdb6-6225d9609041",
        datum: "2022-12-19",
        dag: "maandag",
        trainer: "Ynte Audenaert",
        lengteDag: "vol",
        notities: null,
      },
      {
        id: "772cc00e-4f46-4858-bdb6-6225d9609042",
        datum: "2022-12-20",
        dag: "dinsdag",
        trainer: "Ynte Audenaert",
        lengteDag: "vol",
        notities: null,
      },
      {
        id: "772cc00e-4f46-4858-bdb6-6225d9609043",
        datum: "2022-12-21",
        dag: "woensdag",
        trainer: "Ynte Audenaert",
        lengteDag: "vol",
        notities: null,
      },
      {
        id: "772cc00e-4f46-4858-bdb6-6225d9609044",
        datum: "2022-12-22",
        dag: "donderdag",
        trainer: "Ynte Audenaert",
        lengteDag: "vol",
        notities: null,
      },
      {
        id: "772cc00e-4f46-4858-bdb6-6225d9609045",
        datum: "2022-12-23",
        dag: "vrijdag",
        trainer: "Ynte Audenaert",
        lengteDag: "vol",
        notities: null,
      },
    ]);
  },
};
