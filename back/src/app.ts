import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Oii");
});

app.listen(port, () => {
  console.log("Funcionando");
});
