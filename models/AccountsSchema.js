const { Schema, model } = require("mongoose");

const AccountSchema = new Schema({
  id: { type: Number },
  username: { type: String },
  funds: { type: Number },
});

module.exports = model("Account", AccountSchema);
