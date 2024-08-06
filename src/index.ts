import express from "express";

const app = express();
const port = 3000;

app.get("/", (_req, res) => {
  let edad: number = 20;
  let users: string[] = ["Juan", "Pedro", "Luis"];
  console.log(edad);
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
