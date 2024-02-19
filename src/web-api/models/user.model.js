import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    accountType: {
      type: String,
      required: true,
      enum: ["player", "coach"],
    },
    name: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: function () {
        return this.accountType === "player";
      },
      enum: [
        "EUN1",
        "EUW1",
        "NA1",
        "JP1",
        "KR",
        "BR1",
        "LA1",
        "LA2",
        "OC1",
        "TR1",
        "RU",
      ],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    analitixId: {
      type: String,
      required: function () {
        return this.accountType === "player";
      },
    },
    teamId: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
  {
    collection: "users",
  }
);

userSchema.index({ name: 1, region: 1 }, { unique: true });
userSchema.index({ email: 1, name: 1 }, { unique: true });

const model = mongoose.model("User", userSchema);

export { model as User };
