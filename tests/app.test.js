const request = require("supertest");

const app = require("../src/app");

describe("Application", () => {

    test("GET /health should return 200", async () => {

        const response = await request(app)
            .get("/health");

        expect(response.statusCode)
            .toBe(200);

        expect(response.body)
            .toEqual({
                success: true,
                message: "ok working"
            });
    });


    test("should handle AppError through global error handler", async () => {

        const response = await request(app)
            .get("/test-error");

        expect(response.statusCode)
            .toBe(400);

        expect(response.body)
            .toEqual({
                success: false,
                message: "Test error"
            });
    });

});