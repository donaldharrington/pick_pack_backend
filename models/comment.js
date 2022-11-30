import mongoose from "mongoose";

const Comment = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  parent_comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  is_read: {
    type: Number,
    default: 0
  },
  created: {
    type: Date,
    default: () => new Date()
  },
});

if (!Comment.options.toObject) {
  Comment.options.toObject = {};
}

Comment.options.toObject.transform = (doc, ret) => {
  return {
    _id: ret._id,
    title: ret.title,
    content: ret.content,
    category: ret.category,
    upvotes: ret.upvotes,
    chats: ret.chats,
    created: ret.created,
  };
};

const CommentModel = mongoose.model('Comment', Comment);

export default CommentModel;