const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    await knex(tables.event).delete();

    await knex(tables.event).insert([
      {
        id: "7f28c5f9-d711-4cd6-ac15-d13d71abff83",
        soort: "Training",
        trainer: "Jasper Van Dyck",
        datum: "vrijdag 28/10/2022",
        startuur: "19:30",
        einduur: "21:30",
        notities: "",
      },
      {
        id: "7f28c5f9-d711-4cd6-ac15-d13d71abff84",
        soort: "Training",
        trainer: "Paul Corteyn",
        datum: "woensdag 26/10/2022",
        startuur: "18:00",
        einduur: "21:30",
        notities: "kan pas vanaf 18:30",
      },
      {
        id: "7f28c5f9-d711-4cd6-ac15-d13d71abff85",
        soort: "Training",
        trainer: "Jolien Corteyn",
        datum: "vrijdag 16/9/2022",
        startuur: "19:30",
        einduur: "21:30",
        notities: "",
      },
      {
        id: "7f28c5f9-d711-4cd6-ac15-d13d71abff86",
        soort: "Training",
        trainer: "Jasper Van Dyck",
        datum: "vrijdag 21/10/2022",
        startuur: "19:30",
        einduur: "21:30",
        notities: "",
      },
      {
        id: "7f28c5f9-d711-4cd6-ac15-d13d71abff87",
        soort: "Wedstrijd",
        trainer: "Ynte Audenaert",
        datum: "zaterdag 5/11/2022",
        startuur: "",
        einduur: "",
        notities: "VSB Beker Sint-Niklaas",
      },
      {
        id: "7f28c5f9-d711-4cd6-ac15-d13d71abff88",
        soort: "Training",
        trainer: "",
        datum: "zaterdag 10/10/2022",
        startuur: "18:00",
        einduur: "19:30",
        notities: "",
      },
    ]);
  },
};
