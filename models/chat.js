const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({

        message: {
        type: String,
        required: true
        },
        sender: {
        type: Schema.Types.ObjectId,
        ref: "User"
        }
        },
            {
        timestamps: true

})

module.exports = mongoose.model("Chat", chatSchema);