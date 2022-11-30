import mongoose from "mongoose";

const User = mongoose.Schema({
  cognito_id: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  city: {
    type: String,
    required: true,
  },
  branches: {
    type: String,
  },
  hospitality_groups: {
    type: String,
  },
  about_you: {
    type: String,
    required: true,
  },
  is_verified: {
    type: Boolean,
    required: true,
  },
  role: {
    type: String,
    required: true
  }, 
  shop_commercial_cirtificate: {
    type: String,
    required: false,
  },
  work_id: {
    type: String,
    required: false,
  },
  company_id: {
    type: String,
    required: false,
  },
  image_url: {
    type: String,
  },
  topics: {
    type: [String],
    default: [
    'عام', 
    'المطابخ السحابية',
    'التسويق',
    'التوريد',
    'المبيعات',
    'تطبيقات التوصيل',
    'هندسة المنيو',
    'المعدّات والأثاث',
    'إجرائات نظامية',
    ]
  },
  created: {
    type: Date,
    default: () => new Date()
  },
});

if (!User.options.toObject) {
    User.options.toObject = {};
}

User.options.toObject.transform = (doc, ret) => {
  return {
    _id: ret._id,
    first_name: ret.first_name,
    last_name: ret.last_name,
    phone_number: ret.phone_number,
    email: ret.email,
    city: ret.city,
    branches: ret.branches,
    hospitality_groups: ret.hospitality_groups,
    is_verified: ret.is_verified,
    role: ret.role,
    shop_commercial_cirtificate: ret.shop_commercial_cirtificate,
    work_id: ret.work_id,
    company_id: ret.company_id,
    topics: ret.topics,
    created: ret.created,
    about_you: ret.about_you,
  };
};

const UserModel = mongoose.model('User', User);

export default UserModel;
