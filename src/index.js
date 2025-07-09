const express = require("express");
const { serverConfig, Logger } = require("./config");
const apiRoutes = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);

const _PORT = serverConfig.PORT;

app.listen(_PORT, () => {
  console.log(`Server started at http://localhost:${_PORT}`);

  Logger.info("Successfully started the server", {
    msg: "something went wrong",
  });
});
