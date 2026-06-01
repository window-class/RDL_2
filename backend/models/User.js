import mongoose from "mongoose";  
const userSchema = new mongoose.Schema({  
username: {  
type: String,  
required: true,  
    unique: true,  
    trim: true,  
  }, 
  password: {  
    type: String,  
    required: true,  
    minlength: 6,  
  },  
  resetPasswordToken: {  
    type: String,  
  },  
  resetPasswordExpires: {  
    type: Date,  
  },  
  createdAt: {  
    type: Date,  
    default: Date.now,  
  },  
});  
  
const User = mongoose.model('User', userSchema); 
export default User;