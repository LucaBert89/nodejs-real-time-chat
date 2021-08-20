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

const roomSchema = new Schema({
    topic: {
        type: String,
        required: true,
    },
    messages: [{chatSchema}]
})

module.exports = mongoose.model("chatRoom", roomSchema);