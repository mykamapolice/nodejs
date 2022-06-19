import {server} from "./index";

describe('POST /users', () => {
  test("should return status 200", () => {
    const resp = request(server).post('/users').send({
      name: "Ilya",
      age: 25,
      hobbies: ["football", "basketball"]
    })
    expect(resp.statusCode).toBe(200)
  })
})