import express from "express";
import { authRouter } from "./routes/auth.router";
import { usersRouter } from "./routes/users.router";

const app = express();
app.use(express.json());
const port = 3000;

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
