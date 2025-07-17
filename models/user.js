import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profilepic: {
    type: String,
    required: true,
  },
  saved:[{
    type: Number,
  }]
});

// Prevent model overwrite
const User = models.User || model("User", userSchema);
export default User;
