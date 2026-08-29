const app= require("./app");
const http=require("http");
const env=require("./config/env");

const server=http.createServer(app);

server.listen(env.PORT,()=>{
    console.log(`Server is running on port ${env.PORT}`);
});