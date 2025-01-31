const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 📌 ดึงข้อมูลกล้องทั้งหมด
exports.getCamera = async (req, res) => {
  try {
    const cameras = await prisma.camera.findMany();
    res.json(cameras);
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

// 📌 ดึงข้อมูลกล้องตาม ID
exports.getCameraId = async (req, res) => {
  try {
    const { id } = req.params;
    const camera = await prisma.camera.findUnique({
      where: { id },
    });

    if (!camera) return res.status(404).json({ error: "Camera not found" });

    res.json(camera);
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

// 📌 ดึงข้อมูลกล้องตาม IP
exports.getCameraIp = async (req, res) => {
  try {
    const { ip } = req.params;
    const camera = await prisma.camera.findMany({
      where: { ip_address: ip },
    });

    if (!camera.length) return res.status(404).json({ error: "Camera not found" });

    res.json(camera);
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

// 📌 เพิ่มข้อมูลกล้องใหม่
exports.createCamera = async (req, res) => {
  try {
    const { ip_address, name, location } = req.body;

    if (!ip_address || !name || !location) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newCamera = await prisma.camera.create({
      data: { ip_address, name, location },
    });

    res.status(201).json(newCamera);
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};
