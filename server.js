// server.js or app.js
const express = require("express");
const bodyParser = require("body-parser");
const { sendEmail } = require("./mailController.js");
const cors = require("cors");

const app = express();
const port = 3000; // or any port you prefer

app.use(bodyParser.json());
app.use(cors());

// Route to handle form submission
app.get("/", (req, res) => {
  console.log("Backend working successfully");
  res.send("Backend connected successfully");
});

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);

  // Send email
  sendEmail(email, message, (error, response) => {
    if (error) {
      console.log("Failed to send email");
      return res.status(500).send("Failed to send email");
    }
    console.log("Email sent successfully");
    res
      .status(200)
      .send("Form submission received and email sent successfully!");
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
