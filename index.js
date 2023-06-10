const express = require("express");
const { config } = require("./config");
const cors = require("cors");
const { UserRoutes } = require("./Routes/user");
const { connection } = require("./database");
const { NotesRoutes } = require("./Routes/notes");

const server = express();

server.use(express.json());
server.use(cors());

server.use("/users", UserRoutes);
server.use("/notes", NotesRoutes);

server.listen(config.port, async () => {
  try {
    await connection;
    console.log(
      `server is running on ${config.port} and connected to database`
    );
  } catch (error) {
    console.log(error);
  }
});
