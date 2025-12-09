import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const ChatSchema = new mongoose.Schema({
  reportId: {
    type: ObjectId,
    ref: "Report",
  },

  senderType: {
    type: String,
    enum: ["org", "reporter"],
    required: true,
  },

  senderId: {
    type: ObjectId,
    ref: "Organization",
  },

  messageText: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ChatModel = mongoose.model("Chat", ChatSchema);
export default ChatModel;
