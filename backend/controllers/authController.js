import User from '../models/User.js'; 
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken'; 
import nodemailer from 'nodemailer';
import crypto from 'crypto'; 
  
 
 const register = async (req, res) => {  
  const { username, password } = req.body;  
  
  try {  
    let user = await User.findOne({ username });  
    if (user) {  
      return res.status(400).json({ msg: 'User already exists' });  
}  
  
user = new User({  
username,  
password,  
});  

const salt = await bcrypt.genSalt(10); 
user.password = await bcrypt.hash(password, salt); 
 
await user.save();  
const payload = {  
user: {  
id: user.id,  
},  
};  
jwt.sign(  
payload,  
process.env.JWT_SECRET,  
{ expiresIn: '1h' },  
(err, token) => {  
if (err) throw err;  
res.status(201).json({ token, msg: 'User registered successfully!' });  
}  
);  
} catch (err) {  
console.error(err.message);  
res.status(500).send('Server Error');  
}  
};  
 
const login = async (req, res) => {  
const { username, password } = req.body;  
try {  
 
let user = await User.findOne({ username });  
if (!user) {  
return res.status(400).json({ msg: 'Invalid credentials' });  
}  
 
const isMatch = await bcrypt.compare(password, user.password);  
if (!isMatch) {  
return res.status(400).json({ msg: 'Invalid credentials' });  
}  

const payload = {  
user: {  
id: user.id,  
},  
};  
jwt.sign(  
payload,  
process.env.JWT_SECRET,  
{ expiresIn: '1h' },  
(err, token) => {  
if (err) throw err;  
res.json({ token, msg: 'Logged in successfully!' });  
}  
);  
} catch (err) {  
console.error(err.message);  
res.status(500).send('Server Error');  
}  
}; 

 const getAuthenticatedUser = async (req, res) => {  
  try {  
 
    const user = await User.findById(req.user.id).select('-password'); // Exclude password  
    res.json(user);  
  } catch (err) {  
    console.error(err.message);  
    res.status(500).send('Server Error');  
  }  
}; 
 
const forgetPassword = async (req, res) => {  
  const { username } = req.body;  
  try {  
    const user = await User.findOne({ username });  
    if (!user) {  
      return res.status(400).json({ msg: 'User with this username does not exist' });  
    }  
    const token = crypto.randomBytes(32).toString('hex');  
    user.resetPasswordToken = token;  
    user.resetPasswordExpires = Date.now() + 3600000;  
    await user.save();  
    res.json({ msg: 'Password reset token generated', token });  
  } catch (err) {  
    console.error(err.message);  
    res.status(500).send('Server Error');  
  }  
}; 
 
const resetPassword = async (req, res) => {  
  const { token, password } = req.body;  
  try {  
    const user = await User.findOne({  
      resetPasswordToken: token,  
      resetPasswordExpires: { $gt: Date.now() },  
    });  
    if (!user) {  
      return res.status(400).json({ msg: 'Password reset token is invalid or has expired' });  
    }  
    const salt = await bcrypt.genSalt(10);  
    user.password = await bcrypt.hash(password, salt);  
    user.resetPasswordToken = undefined;  
    user.resetPasswordExpires = undefined;  
    await user.save();  
    res.json({ msg: 'Password has been reset' });  
  } catch (err) {  
    console.error(err.message);  
    res.status(500).send('Server Error');  
  }  
}; 
 
export default {register, login, getAuthenticatedUser, forgetPassword, resetPassword};