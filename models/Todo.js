import mongoose from 'mongoose'

const TodoSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    text:{
        type: String,
        required: true,
    },
    completed:{
        type: Boolean,
        default: false,
    },
    important:{
        type: Boolean,
        default: false
    },
    date:{
        type: Date,
        default: Date.now
    }
}, {timestamps: true})

export default mongoose.model("Todo", TodoSchema)