const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// interface IUser extends Document {
//   username: string;
//   password: string;
// }

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  console.log("Salt:", salt);
  this.password = await bcrypt.hash(this.password, salt);
  console.log("Hashed correcctPassword", this.password);
  next();
});

export default mongoose.model("User", UserSchema);
