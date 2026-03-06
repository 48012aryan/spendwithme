import mongoose from "mongoose";
import User from "./src/model/User.js";

async function check() {
  try {
    await mongoose.connect("mongodb://0.0.0.0:27017/Spend_With_Me");
    const user = await User.findOne({ email: "hirparaaryan247@gmail.com" }).select("+password");
    console.log("User:", user);
    const usersCount = await User.countDocuments();
    console.log("Total users:", usersCount);
  } catch (e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
}
check();
