import mongoose from "mongoose";

const Vote = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  created: {
    type: Date,
    default: () => new Date()
  }
});

if (!Vote.options.toObject) {
  Vote.options.toObject = {};
}

Vote.options.toObject.transform = (doc, ret) => {
  return {
    _id: ret._id,
    user: ret.user,
    post: ret.post,
  };
};

const VoteModel = mongoose.model('Vote', Vote);

export default VoteModel;