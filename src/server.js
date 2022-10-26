const http = require("http");
const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, "./configs/.env"),
});

const PORT = 3000 || process.env.PORT;
const app = require("./app");
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.error(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", (err) => {
  console.error("SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("Process terminated!");
  });
});
