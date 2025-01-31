const express = require("express");
const app = express.Router();
const eventController = require("../controllers/event.controller");

app.get("/",eventController.getEvent)
app.get("/:id",eventController.getEventId)
app.post("/",eventController.createEvent)


module.exports = app;