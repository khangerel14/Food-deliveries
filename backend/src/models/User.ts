import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  useremail: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    select: false,
  },
  avatarImage: Buffer,
  address: String,
  phoneNumber: {
    type: String,
    length: {
      minlength: 8,
      maxlength: 8,
    },
  },
  role: {
    type: String,
    enum: ["Админ", "Хэрэглэгч"],
  },
});

const UserModel = mongoose.model("User", UserSchema);

export { UserModel };
