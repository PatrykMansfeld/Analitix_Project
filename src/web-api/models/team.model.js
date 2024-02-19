import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    players: [
      {
        type: String,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  },
  {
    collection: "teams",
  }
);

teamSchema.path("players").validate(function (value) {
  return value.length <= 5;
}, "Team cannot have more than 5 players");

const model = mongoose.model("Team", teamSchema);

export { model as Team };
