#!/usr/bin/env node

const { Command }= require("commander");
const program= new Command();

program.name("broadcast-server")
        .description("CLI-BASED WEBSOCKET BROADCAST SERVER")
        .version("1.0.0");

program.command("start")
        .description("START THE BROADCAST SERVER")
        .action(()=>{
            require("../src/server");
        });

program
    .command("connect")
    .description("Connect to the broadcast server")
    .action(() => {
        require("../src/websocket/test-client");
    });

program.parse();