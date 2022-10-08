const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/copper_playmusic_dev", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect successfully <3");
  } catch (e) {
    console.log("Connect faile!!!");
  }
}

module.exports = { connect };
