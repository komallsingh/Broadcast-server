const errorHandler = require("../src/middleware/error-handler");
const AppError = require("../src/utils/app-error");

describe("Global Error Handler", () => {

    let req;
    let res;
    let next;

    beforeEach(() => {
        req = {};

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        next = jest.fn();
    });

    test("should return AppError status and message", () => {

        const error = new AppError(
            "Message cannot be empty",
            400
        );

        errorHandler(error, req, res, next);

        expect(res.status)
            .toHaveBeenCalledWith(400);

        expect(res.json)
            .toHaveBeenCalledWith({
                success: false,
                message: "Message cannot be empty"
            });
    });

    test("should return 500 for unexpected errors", () => {

        const error = new Error(
            "Database connection failed"
        );

        errorHandler(error, req, res, next);

        expect(res.status)
            .toHaveBeenCalledWith(500);

        expect(res.json)
            .toHaveBeenCalledWith({
                success: false,
                message: "Internal server error"
            });
    });

    test("should not expose unexpected error details", () => {

        const error = new Error(
            "SECRET DATABASE PASSWORD"
        );

        errorHandler(error, req, res, next);

        expect(res.json)
            .toHaveBeenCalledWith({
                success: false,
                message: "Internal server error"
            });

        expect(res.json)
            .not.toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "SECRET DATABASE PASSWORD"
                })
            );
    });

});