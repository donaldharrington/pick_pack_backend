import mongoose from "mongoose";

const Admin = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  socketId: {
    type: String,
    default: '',
  },
  jwtToken: [String],
});

// if (!Admin.options.toObject) {
//   Admin.options.toObject = {};
// }

// Admin.options.toObject.transform = (doc, ret) => {
//   return {
//     _id: ret._id,
//     first_name: ret.first_name,
//     last_name: ret.last_name,
//     phone_number: ret.phone_number,
//     email: ret.email,
//     city: ret.city,
//     branches: ret.branches,
//     hospitality_groups: ret.hospitality_groups,
//     is_verified: ret.is_verified,
//     role: ret.role,
//   };
// };

const AdminModel = mongoose.model('Admin', Admin);

export default AdminModel;