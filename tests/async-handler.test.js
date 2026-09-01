const asyncHandler = require("../src/middleware/async-handler");

describe("Async Handler", () => {

    test("should execute the handler", async () => {

        const handler = jest.fn(
            async (req, res, next) => {
                return "success";
            }
        );

        const wrappedHandler = asyncHandler(handler);

        const req = {};
        const res = {};
        const next = jest.fn();

        await wrappedHandler(req, res, next);

        expect(handler)
            .toHaveBeenCalledWith(req, res, next);

        expect(next)
            .not.toHaveBeenCalled();
    });


    test("should pass rejected error to next", async () => {

        const error = new Error("Something failed");

        const handler = jest.fn(
            async () => {
                throw error;
            }
        );

        const wrappedHandler = asyncHandler(handler);

        const req = {};
        const res = {};
        const next = jest.fn();

        await wrappedHandler(req, res, next);

        expect(next)
            .toHaveBeenCalledWith(error);
    });

});