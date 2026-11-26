  const express = require("express");
  const app = express();
  const port = 3000;
  const database = require('./database.js')
  const db = new database('./messages.db')
  //db.sampleData()
  
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
  app.get('/api/message/:id', (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    const item = db.getMessage(id);
    const data = {};
    data.message = item;
    res.json(data);
  });
  app.post('/api/add', (req, res, next) => {
    const name = req.body.name;
    const message = req.body.message;
    db.addMessage(name, message);
    res.json({"value": "added!"});
  });
  
  // Default response for any other request
  app.use(function(req, res){
    res.status(404);
  });