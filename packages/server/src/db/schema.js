const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema({
  mustBeSignIn: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  question: [
    {
      type: Object,
      contains: {
        answer: {
          type: Array,
        },
        correctAnswer: String,
        questionName: String,
      },
    },
  ],
  createdBy: {
    type: Schema.Types.ObjectID,
    required: true,
  },
  scores: {
    type: Array,
    default: [],
  },
  category: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: new Date(),
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

exports.Quiz = mongoose.model("Quiz", quizSchema);
