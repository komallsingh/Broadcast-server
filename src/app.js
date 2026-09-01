const express=require("express");
const errorHandler=require("./middleware/error-handler");
const asyncHandler = require("./middleware/async-handler");
const AppError = require("./utils/app-error");
const app=express();
app.use(express.json());

app.get("/health",(req,res)=>{
    res.json({
        success:true,
        message:"ok working"
    });
});

app.get(
    "/test-error",
    asyncHandler(async (req, res) => {
        throw new AppError(
            "Test error",
            400
        );

    })
);

app.use(errorHandler);
module.exports=app;
