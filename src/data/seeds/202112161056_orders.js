const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    await knex(tables.order).delete();

    await knex(tables.order).insert([
      {
        id: "7f28c5f9-d711-4cd6-ac15-d13d71abff82",
        items: JSON.stringify([
          {
            itemId: "90e4e8cc-96cf-40cf-a1fb-b0d660f3ed17",
            name: "Beanie (oker)",
            size: "M",
            price: 14.99,
            aantal: 1,
            image_url:
              "https://res.cloudinary.com/frontendimages/image/upload/v1640082878/images/f33uje5rifupf7wbevtw.png",
          },
          {
            itemId: "5ef01d70-8d6c-415d-8c8a-30c1a932fb2a",
            name: "Shirt (grijs)",
            size: "L",
            price: 19.99,
            aantal: 2,
            image_url:
              "https://res.cloudinary.com/frontendimages/image/upload/v1640082716/images/fwf1m089axnj8ugilujz.png",
          },
        ]),
        user_id: "7f28c5f9-d711-4cd6-ac15-d13d71abff80",
        totaalprijs: 60.96,
        adres: JSON.stringify({
          straat: "Buizenleggerslaan 21",
          stad: "Temse",
          postcode: "9140",
        }),
        datum: new Date(2021, 11, 19, 14, 42),
      },
    ]);
  },
};
