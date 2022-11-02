const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    await knex(tables.training).delete();

    await knex(tables.training).insert([
      {
        id: "772cc00e-4f46-4858-bdb6-6225d960904c",
        datum: "2022-11-18",
        dag: "vrijdag",
        trainer: "Jasper Van Dyck",
        startuur: "19:30",
        einduur: "21:30",
        notities: null,
      },
      {
        id: "7f28c5f9-d711-4cd6-ac15-d13d71abff84",
        datum: "2022-11-16",
        dag: "woensdag",
        trainer: "Paul Corteyn",
        startuur: "18:00",
        einduur: "21:30",
        notities: "kan pas vanaf 18:30",
      },
      {
        id: "7f28c5f9-d711-4cd6-ac15-d13d71abff85",
        datum: "2022-11-04",
        dag: "vrijdag",
        trainer: "Jolien Corteyn",
        startuur: "19:30",
        einduur: "21:30",
        notities: null,
      },
      {
        id: "7f28c5f9-d711-4cd6-ac15-d13d71abff86",
        datum: "2022-11-25",
        dag: "vrijdag",
        trainer: "Jasper Van Dyck",
        startuur: "19:30",
        einduur: "21:30",
        notities: null,
      },
      {
        id: "7f28c5f9-d711-4cd6-ac15-d13d71abff87",
        datum: "2022-11-07",
        dag: "maandag",
        trainer: null,
        startuur: "18:00",
        einduur: "21:30",
        notities: null,
      },
    ]);
  },
};
