const express = require("express");
const app = express.Router();
const cameraController = require("../controllers/camera.controller");

app.get("/", cameraController.getCamera);
app.get("/:id", cameraController.getCameraId);
app.get("/ip/:ip", cameraController.getCameraIp);
app.post("/", cameraController.createCamera);
module.exports = app;