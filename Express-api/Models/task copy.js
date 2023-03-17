const { models, model, Schema, default: mongoose } = require("mongoose");

const taskSchema = new Schema({
  assignBy: {
    type: mongoose.Schema.ObjectId,
    required: [true, "A task must be assign by a admin."],
  },
  assignTo: {
    type: [mongoose.Schema.ObjectId],
    required: [true, "A task must be assign to atleast one member."],
  },

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
  status: {
    type: String,
    enum: {
      values: ["incomplete", "complete"],
      message: "You can only set task to complete or to incomplete.",
    },
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

const Task = models.tasks || model("task", taskSchema);

module.exports = Task;
