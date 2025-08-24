const Message = require("../models/message.model");
const User = require("../models/user.model");

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching messages" });
  }
};

const sendMessage = async (req, res) => {
  try {
    console.log("There");
    const { subject, message } = req.body;

    if (!subject || !message) {
      return res.status(400).json({ message: "Subject and message are required" });
    }

    const newMessage = new Message({
      subject,
      message,
      user: req.user.id,
    });

    await newMessage.save();

    res.status(201).json({ message: "Message sent successfully", data: newMessage });
  } catch (error) {
    res.status(500).json({ message: "Server error while sending message" });
  }
};

const getAdminMessages = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    const messages = await Message.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching admin messages" });
  }
};

module.exports = {
  getMessages,
  sendMessage,
  getAdminMessages,
};
