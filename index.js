const fastify = require("fastify");
const path = require("path");
const app = fastify();

app.register(require("fastify-static"), {
  root: path.join(__dirname, "dist"),
});

app.get("/", function (req, reply) {
  return reply.sendFile("index.html");
});

app.listen(4000).then(() => {
  console.log("Server running at http://localhost:4000/");
});
