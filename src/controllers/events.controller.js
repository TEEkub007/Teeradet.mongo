const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 📌 ดึงข้อมูล Event ทั้งหมด
exports.getEvent = async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      include: { camera: true }, // ดึงข้อมูลกล้องที่เกี่ยวข้องมาด้วย
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

// 📌 ดึงข้อมูล Event ตาม ID
exports.getEventId = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await prisma.event.findUnique({
      where: { id },
      include: { camera: true }, // ดึงข้อมูลกล้องที่เกี่ยวข้องมาด้วย
    });

    if (!event) return res.status(404).json({ error: "Event not found" });

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

// 📌 เพิ่มข้อมูล Event ใหม่
exports.createEvent = async (req, res) => {
  try {
    const { camera_id, amount } = req.body;

    if (!camera_id || amount == null) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // ตรวจสอบว่า camera_id มีอยู่จริงหรือไม่
    const cameraExists = await prisma.camera.findUnique({ where: { id: camera_id } });

    if (!cameraExists) {
      return res.status(404).json({ error: "Camera not found" });
    }

    const newEvent = await prisma.event.create({
      data: {
        camera_id,
        amount,
      },
    });

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};
