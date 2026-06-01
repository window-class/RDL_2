import jwt from 'jsonwebtoken';  
export default function (req, res, next) {  
// Get token from header  
const token = req.header('x-auth-token');  

if (!token) {  
return res.status(401).json({ msg: 'No token, authorization denied' });  
}  
 
try {  
const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token with secret  
req.user = decoded.user; // Attach user payload to request  
next(); 
} catch (err) {  
res.status(401).json({ msg: 'Token is not valid' });  
}  
}; 