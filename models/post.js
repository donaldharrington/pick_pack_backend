import mongoose from "mongoose";

const Post = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  upvotes: {
    type: Number,
    required: true,
  },
  chats: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  created: {
    type: Date,
    default: () => new Date()
  }
});

if (!Post.options.toObject) {
  Post.options.toObject = {};
}

Post.options.toObject.transform = (doc, ret) => {
  return {
    _id: ret._id,
    title: ret.title,
    content: ret.content,
    user: ret.user,
    category: ret.category,
    upvotes: ret.upvotes,
    chats: ret.chats,
    created: ret.created,
  };
};

const PostModel = mongoose.model('Post', Post);

export default PostModel;