import express, { NextFunction, Request, Response } from "express";
import router from "./routes";
import connectDb from "./database";

const app = express();
const PORT = process.env.PORT;

app.use(express.json({}));
app.use("/api/v1/urls", router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    message: err?.message ?? "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

const startApp = async () => {
  const dbConnection = await connectDb();
  if (dbConnection) {
    app.listen(PORT, () => {
      console.log(`App is running on http://localhost:${PORT}`);
    });
  }
};

startApp();
