const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    await knex(tables.item).delete();

    await knex(tables.item).insert([
      {
        id: "7f28c5f9-d711-4cd6-ac15-d13d71abff83",
        name: "Jeans",
        price: 59.99,
        korting: 0.0,
        image_url:"https://res.cloudinary.com/frontendimages/image/upload/v1640035917/images/e4qbsxyb5bxp0tqw0qft.jpg"
      },
      {
        id: "7f28c5f9-d711-4cd6-ac15-d13d71abff84",
        name: "Pet",
        price: 19.99,
        korting: 0.0,
        image_url:"https://res.cloudinary.com/frontendimages/image/upload/v1640036008/images/ig854dpcmkhupfacjisy.jpg"

      },
      {
        id: "7f28c5f9-d711-4cd6-ac15-d13d71abff85",
        name: "Sokken",
        price: 9.99,
        korting: 0.0,
        image_url:"https://res.cloudinary.com/frontendimages/image/upload/v1640036057/images/dqpvcvx0lub9bamcyxrb.jpg"

      },
    ]);
  },
};
