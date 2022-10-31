const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    await knex(tables.item).delete();

    await knex(tables.item).insert([
      {
        id: "90e4e8cc-96cf-40cf-a1fb-b0d660f3ed17",
        name: "Beanie (oker)",
        price: 14.99,
        korting: 0,
        image_url:
          "https://res.cloudinary.com/frontendimages/image/upload/v1640082878/images/f33uje5rifupf7wbevtw.png",
      },
      {
        id: "5ef01d70-8d6c-415d-8c8a-30c1a932fb2a",
        name: "Shirt (grijs)",
        price: 19.99,
        korting: 0,
        image_url:
          "https://res.cloudinary.com/frontendimages/image/upload/v1640082716/images/fwf1m089axnj8ugilujz.png",
      },
      {
        id: "912220bb-64c3-4d25-b5c7-66442ece864f",
        name: "Shirt (lichtbruin)",
        price: 19.99,
        korting: 0,
        image_url:
          "https://res.cloudinary.com/frontendimages/image/upload/v1640082645/images/atjacj5g3xpontyeodk5.png",
      },
      {
        id: "93e58b96-2f0a-4f38-888c-10adb337ab44",
        name: "Shirt (roos)",
        price: 19.99,
        korting: 0,
        image_url:
          "https://res.cloudinary.com/frontendimages/image/upload/v1640082659/images/ns7kuliqw9beryzxiiae.png",
      },
      {
        id: "bb1a0ea2-b5c8-4645-a506-70d0a21f9656",
        name: "Shirt (wit)",
        price: 19.99,
        korting: 0,
        image_url:
          "https://res.cloudinary.com/frontendimages/image/upload/v1640082675/images/pymnaaifojm6cfj9pgwm.png",
      },
      {
        id: "dfd1597d-217c-4931-8355-8852947d9b06",
        name: "Shirt (zwart)",
        price: 19.99,
        korting: 0,
        image_url:
          "https://res.cloudinary.com/frontendimages/image/upload/v1640082696/images/lv9ppbuc6a9bhycyjlp7.png",
      },
    ]);
  },
};
