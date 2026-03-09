import Match from "../models/MatchModel.js";
import User from "../models/User.js";

export const createMatch = async (req, res) => {
  try {
    const { team_a, team_b } = req.body;

    if (!team_a || !team_b) {
      return res.status(400).json({
        success: false,
        message: "Both teams are required"
      });
    }

    if (!team_a.name || !team_b.name) {
      return res.status(400).json({
        success: false,
        message: "Team names are required"
      });
    }

    if (!team_a.members?.length || !team_b.members?.length) {
      return res.status(400).json({
        success: false,
        message: "Each team must have at least one player"
      });
    }

    // // Optional: Validate users exist
    // const allPlayerIds = [
    //   ...team_a.members.map(p => p.user_id),
    //   ...team_b.members.map(p => p.user_id)
    // ];

    // const existingUsers = await User.find({
    //   user_id: { $in: allPlayerIds }
    // });

    // if (existingUsers.length !== allPlayerIds.length) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "One or more players are invalid"
    //   });
    // }

    const match = await Match.create({
      created_by: req.user.user_id,
      team_a,
      team_b
    });

    return res.status(201).json({
      success: true,
      message: "Match created successfully",
      match
    });

  } catch (error) {
    console.error("CREATE MATCH ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const getMyMatches = async (req, res) => {
  try {
    const matches = await Match.find({
      created_by: req.user.user_id
    }).sort({ createdAt: -1 });

    return res.json({
      success: true,
      matches
    });

  } catch (error) {
    console.error("GET MATCHES ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
