const express = require("express");
const app = express();
port = 5000;
app.get("/api", (req, res) => {
  res.json({ users: ["teste1", "teste2"] });
});

app.listen(port, () => {
  console.log("Server started at port ", { port });
});
