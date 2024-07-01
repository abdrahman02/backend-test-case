import express from "express";
import sequelize from "./configs/database.js";
import loanRoutes from "./routes/loanRoute.js";
import memberRoutes from "./routes/memberRoute.js";
import setupSwagger from "./configs/swagger.js";

const app = express();
app.use(express.json());

app.use("/api/books", loanRoutes);
app.use("/api/members", memberRoutes);

setupSwagger(app);

await sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error: " + err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
