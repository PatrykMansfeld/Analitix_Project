import app from "../index.js";
import { client } from "../utils/prop.js";
import request from "supertest";
import * as dotenv from "dotenv";
dotenv.config();

const testUser = "Wratw0w";
const testUserId = "1smjIrsaU05VK0FAUolmgJT9GhgMVhDpJUygvTDUMYJt8ZE";
const testRegion = "eun1";
const testApiKey = process.env.RIOT_API_KEY;

const dbClient = client;

describe("RiotAPI connection", () => {
  test("Run '/lol/summoner/v4/summoners/by-name/' request with CORRECT DATA.", async () => {
    const response = await fetch(
      `https://${testRegion}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${testUser}?api_key=${testApiKey}`
    );

    expect(response.status).toBe(200);
  });

  test("Run '/lol/summoner/v4/summoners/by-name/' request with INCORRECT DATA.", async () => {
    const response = await fetch(
      `https://${testRegion}.api.riotgames.com/lol/summoner/v4/summoners/by-name/wrongSummonerName?api_key=${testApiKey}`
    );

    expect(response.status).toBe(404);
  });
});

describe("Database connection", () => {
  let connection;
  let db;

  let testCollectionName = "Test-collection";
  let testSummonerId = "test-summoner-id";
  let testSummonerName = "test-summoner-name";

  beforeAll(async () => {
    connection = await dbClient.connect();
    db = connection.db("Riot_API");
  });

  afterAll(async () => {
    await connection.close();
  });

  test("Create test collection and insert test document", async () => {
    const testCollection = db.collection(testCollectionName);

    const testSummoner = { _id: testSummonerId, name: testSummonerName };
    await testCollection.insertOne(testSummoner);

    const insertedTestSummoner = await testCollection.findOne({
      _id: testSummonerId,
    });
    expect(insertedTestSummoner).toEqual(testSummoner);
  });

  test("Remove test document", async () => {
    const testCollection = db.collection(testCollectionName);

    const testSummoner = { _id: testSummonerId, name: testSummonerName };
    await testCollection.deleteOne(testSummoner);

    const insertedTestSummoner = await testCollection.findOne({
      _id: testSummonerId,
    });

    expect(insertedTestSummoner).toBeNull();
  });

  test("Remove test collection", async () => {
    const testCollection = db.collection(testCollectionName);

    await db.collection(testCollectionName).drop();

    const createdTestCollection = await db
      .listCollections({ name: testCollectionName })
      .hasNext();

    expect(createdTestCollection).toBeFalsy();
  });
});

describe("AnalitixAPI connection", () => {
  test("GET /test endpoint", async () => {
    const response = await request(app).get(`/test`);
    expect(response.type).toBe("application/json");
    expect(response.status).toBe(200);
  });

  test("GET /get/players/:id endpoint content type", async () => {
    const response = await request(app).get(`/get/players/${testUserId}`);
    expect(response.type).toBe("application/json");
  });
});
