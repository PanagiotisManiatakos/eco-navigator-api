const dotenv = require("dotenv");
const envPath = `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: envPath });
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["POST", "OPTIONS"],
    optionsSuccessStatus: 200,
  })
);

app.post("/ping", async (req, res) => res.json({ success: true, version: "1.0.0" }));

app.use("/api/bin-request", require("./endpoints/binRequest"));

app.use("/api/bin-accepted", require("./endpoints/binAccepted"));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on port : ${PORT}`);
});
