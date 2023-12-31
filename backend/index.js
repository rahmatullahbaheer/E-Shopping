const express = require("express");
const env = require("./config/envConfig");
const cors = require("cors");
const connect = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const paymentRoutes = require("./routes/payment");
const orderRoutes = require("./routes/orderRoutes");
const flexRoutes = require("./routes/flexRoutes");
const brandRoutes = require("./routes/brand")
const feedback = require("./routes/feedbackRouting")
const app = express();

// database connection
connect();
app.use(cors());
app.post(
  "/webhook",
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);
// add middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to E-Shopping" });
});
// user routes
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use(paymentRoutes);
app.use("/api", orderRoutes);
app.use("/api", flexRoutes);
app.use("/api", brandRoutes);
app.use("/api", feedback);



const port = env.PORT || 5000;

app.listen(port, () => {
  console.log(`Your server is running at port number: ${port}`);
});
