  const express = require("express");
  const app = express();
  const port = 3000;
  const database = require('./database.js')
  const db = new database('./messages.db')
  db.sampleData()
  
  // Mit diesem Kommando starten wir den Webserver.
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });

  // Root endpoint
  app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
  });

  // Insert here other API endpoints
  app.get('/api/messages', (req, res, next) => {
    const items = db.getMessages()
    const data = {}
    data.messages = items
    res.json(data)
  })

  // Default response for any other request
  app.use(function(req, res){
    res.status(404);
  });