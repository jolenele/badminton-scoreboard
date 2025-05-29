import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  team1: { type: String, required: true },
  team2: { type: String, required: true },
  referee: { type: String, required: true },
  team1Score: { type: Number, required: true },
  team2Score: { type: Number, required: true },
  winner: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  duration: { type: String, required: true },
});

export default mongoose.model("Match", matchSchema);