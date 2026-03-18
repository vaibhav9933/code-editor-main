const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/execute", (req, res) => {
  const { language, code, input } = req.body;

  if (language === "python") {
    exec(`python -c "${code}"`, (error, stdout, stderr) => {
      res.json({
        output: stdout || "",
        errors: stderr || (error ? error.message : "")
      });
    });
  } else if (language === "javascript") {
    exec(`node -e "${code}"`, (error, stdout, stderr) => {
      res.json({
        output: stdout || "",
        errors: stderr || (error ? error.message : "")
      });
    });
  } else {
    res.json({ output: "", errors: "Language not supported yet" });
  }
});

app.listen(5000, () => console.log("Backend running on port 5000"));
