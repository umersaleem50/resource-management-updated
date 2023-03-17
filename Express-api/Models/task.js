const { models, model, Schema, default: mongoose } = require("mongoose");

const taskSchema = new Schema({
  deadline: {
    type: Date,
  },
  heading: {
    type: String,
    required: [true, "Please give a heading to the task."],
  },
  description: {
    type: String,
    required: [true, "Please provide a description of the task."],
  },
  taskType: {
    type: String,
    required: [true, "Please select the type for a task."],
    enum: {
      values: ["important", "critical", "un-important"],
      message:
        "Please provide only valid type. ie. important, critical or un-important.",
    },
    default: "important",
  },
  assignedOn: {
    type: Date,
    default: Date.now(),
  },

  attachments: {
    type: [
      {
        fileName: {
          type: String,
        },
        size: {
          type: Number,
        },
      },
    ],
  },
});

const TasksSchema = new Schema({
  status: {
    type: String,
    enum: {
      values: ["incomplete", "complete"],
      message: "You can only set task to complete or to incomplete.",
    },
    default: "incomplete",
  },

  assignBy: {
    type: mongoose.Schema.ObjectId,
    required: [true, "A task must be assign by a admin."],
    ref: "member",
  },
  assignTo: {
    type: mongoose.Schema.ObjectId,
    required: [true, "A task must be assign to atleast one member."],
  },

  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

const Task = models.task || model("Task", taskSchema);
const Tasks = models.tasks || model("Tasks", TasksSchema);

module.exports = { Task, Tasks };
