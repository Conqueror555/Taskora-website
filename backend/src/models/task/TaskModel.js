import mongoose from 'mongoose';
const  Taskschema = new mongoose.Schema({
    title:{
        type: String,
        required: [true,"Please provide a title"],
        unique:true,
    },
    description:{
        type: String,
        default: "No description",
    },
    dueDate:{
        type: Date,
        default: Date.now(),
    },
    status:{
        type: String,
        enum:["active","inactive"],
        default: "active",
    },
    completed:{
        type: Boolean,
        default:false,
    },
    priority:{
        type: String,
        enum:["low","medium","high"],
        default:"low"
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref:"User",
        required: true,
    },
},
{timestamp: true}
);

const TaskModel = mongoose.model("Task", Taskschema);
export default TaskModel;