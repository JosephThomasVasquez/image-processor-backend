const app = require("./app");

const { PORT = 5000 } = process.env;

const listener = (req, res) => {
  console.log("Server running on port:", PORT);
};

app.listen(PORT, listener);
