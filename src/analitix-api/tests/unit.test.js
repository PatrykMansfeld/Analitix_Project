import request from "supertest";
import app from "../index.js";
import * as dotenv from "dotenv";
dotenv.config();

const testUser = "Wratw0w";
const testUserId = "1smjIrsaU05VK0FAUolmgJT9GhgMVhDpJUygvTDUMYJt8ZE";
const testRegion = "eun1";
const testMatchId = "EUN1_3193628281";

describe("RiotAPI POST requests", () => {
  test("POST request /upload/player/:name/:region with CORRECT data.", async () => {
    const response = await request(app).post(
      `/upload/player/${testUser}/${testRegion}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
  });
  test("POST request /upload/player/:name/:region with INCORRECT data.", async () => {
    const response = await request(app).post(`/upload/player/123/123`);
    expect(response.statusCode).toBe(404);
    expect(response.type).toBe("application/json");
  });

  test("POST request /upload/matches/:id/:region with CORRECT data.", async () => {
    const response = await request(app).post(
      `/upload/matches/${testUserId}/${testRegion}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
  });
  test("POST request /upload/matches/:id/:region with INCORRECT data.", async () => {
    const response = await request(app).post(`/upload/matches/123/123`);
    expect(response.statusCode).toBe(404);
    expect(response.type).toBe("application/json");
  });

  test("POST request /upload/rankeds/:id/:region with CORRECT data.", async () => {
    const response = await request(app).post(
      `/upload/matches/${testUserId}/${testRegion}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
  });
  test("POST request /upload/rankeds/:id/:region with INCORRECT data.", async () => {
    const response = await request(app).post(`/upload/rankeds/123/123`);
    expect(response.statusCode).toBe(404);
    expect(response.type).toBe("application/json");
  });

  test("POST request /upload/masteries/:id/:region with CORRECT data.", async () => {
    const response = await request(app).post(
      `/upload/masteries/${testUserId}/${testRegion}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
  });
  test("POST request /upload/masteries/:id/:region with INCORRECT data.", async () => {
    const response = await request(app).post(`/upload/masteries/123/123`);
    expect(response.statusCode).toBe(404);
    expect(response.type).toBe("application/json");
  });

  test("POST request /upload/all/:name/:region with CORRECT data.", async () => {
    const response = await request(app).post(
      `/upload/all/${testUser}/${testRegion}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
  });
  test("POST request /upload/all/:name/:region with INCORRECT data.", async () => {
    const response = await request(app).post(`/upload/all/123/123`);
    expect(response.statusCode).toBe(404);
    expect(response.type).toBe("application/json");
  });
});

describe("RiotAPI GET requests", () => {
  test("GET request /get/players/rankeds/:id with CORRECT data.", async () => {
    const response = await request(app).get(
      `/get/players/rankeds/${testUserId}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
  });
  test("GET request /get/players/rankeds/:id with INCORRECT data.", async () => {
    const response = await request(app).get(`/get/players/rankeds/123`);
    expect(response.statusCode).toBe(404);
    expect(response.type).toBe("application/json");
  });

  test("GET request /get/players/:id with CORRECT data.", async () => {
    const response = await request(app).get(`/get/players/${testUserId}`);
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
  });
  test("GET request /get/players/:id with INCORRECT data.", async () => {
    const response = await request(app).get(`/get/players/123`);
    expect(response.statusCode).toBe(404);
    expect(response.type).toBe("application/json");
  });

  test("GET request /get/players/masteries/:id with CORRECT data.", async () => {
    const response = await request(app).get(
      `/get/players/masteries/${testUserId}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
  });
  test("GET request /get/players/masteries/:id with INCORRECT data.", async () => {
    const response = await request(app).get(`/get/players/masteries/123`);
    expect(response.statusCode).toBe(404);
    expect(response.type).toBe("application/json");
  });

  test("GET request /get/matches/:id with CORRECT data.", async () => {
    const response = await request(app).get(`/get/matches/${testMatchId}`);
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
  });
  test("GET request /get/matches/:id with INCORRECT data.", async () => {
    const response = await request(app).get(`/get/matches/123`);
    expect(response.statusCode).toBe(404);
    expect(response.type).toBe("application/json");
  });

  test("GET request /get/players/matches/:id/:number with CORRECT data.", async () => {
    const response = await request(app).get(
      `/get/players/matches/${testUserId}/1`
    );
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
  });
  test("GET request /get/players/matches/:id/:number with INCORRECT player id.", async () => {
    const response = await request(app).get(`/get/players/matches/123/1`);
    expect(response.statusCode).toBe(404);
    expect(response.type).toBe("application/json");
  });
  test("GET request /get/players/matches/:id/:number with INCORRECT number after player id.", async () => {
    const response = await request(app).get(
      `/get/players/matches/${testUserId}/0`
    );
    expect(response.statusCode).toBe(400);
    expect(response.type).toBe("application/json");
  });
});
