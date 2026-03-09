import mongoose from "mongoose";

const playerSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    name: { type: String, required: true }
  },
  { _id: false }
);

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    members: {
      type: [playerSchema],
      validate: v => v.length > 0
    },
    score: { type: Number, default: 0 }
  },
  { _id: false }
);

const matchSchema = new mongoose.Schema(
  {
    created_by: { type: String, required: true },

    team_a: { type: teamSchema, required: true },
    team_b: { type: teamSchema, required: true },

    winner: {
      type: String,
      enum: ["team_a", "team_b", null],
      default: null
    },

    status: {
      type: String,
      enum: ["scheduled", "ongoing", "completed"],
      default: "scheduled"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Match", matchSchema);
