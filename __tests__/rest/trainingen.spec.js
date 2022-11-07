const supertest = require("supertest");
const createServer = require("../../src/createServer");
const { getKnex, tables } = require("../../src/data");

const data = {
  trainingen: [
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
  ],
};

const dataToDelete = {
  trainingen: [
    "772cc00e-4f46-4858-bdb6-6225d960904c",
    "7f28c5f9-d711-4cd6-ac15-d13d71abff84",
    "7f28c5f9-d711-4cd6-ac15-d13d71abff85",
  ],
};

describe("trainingen", () => {
  let server;
  let request;
  let knex;

  beforeAll(async () => {
    server = await createServer();
    request = supertest(server.getApp().callback());
    knex = getKnex();
  });

  afterAll(async () => {
    await server.stop();
  });

  const url = "/api/trainingen";

  describe("GET /api/trainingen", () => {
    beforeAll(async () => {
      await knex(tables.training).insert(data.trainingen);
    });

    afterAll(async () => {
      await knex(tables.training)
        .whereIn("id", dataToDelete.trainingen)
        .delete();
    });

    it("should 200 and return all trainingen", async () => {
      const response = await request.get(url);
      expect(response.status).toBe(200);
      expect(response.body.limit).toBe(100);
      expect(response.body.offset).toBe(0);
      expect(response.body.data.length).toBe(3);
    });

    it("should 200 and paginate the list of trainingen", async () => {
      const response = await request.get(`${url}?limit=2&offset=1`);
      expect(response.status).toBe(200);
      expect(response.body.limit).toBe(2);
      expect(response.body.offset).toBe(1);
      expect(response.body.data.length).toBe(2);
      expect(response.body.data[0]).toEqual({
        id: "7f28c5f9-d711-4cd6-ac15-d13d71abff84",
        datum: "2022-11-16",
        dag: "woensdag",
        trainer: "Paul Corteyn",
        startuur: "18:00",
        einduur: "21:30",
        notities: "kan pas vanaf 18:30",
      });
    });
  });
});
