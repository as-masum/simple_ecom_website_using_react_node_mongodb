const User = require("../../models/User");
const { hash, genSalt, compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authCredentials } = require("../../config/index");


const register = async (req, res) => {
  try {
    const {userName, email, password} = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // Create a new hash Password
    const salt = await genSalt(10);
    password = await hash(password, salt);
    console.log("reqData.password :",password);

    let filds = {
      name:userName,
      email,
      password,
      token:password
    }

    // Create a new user
    const user = new User(filds);

    // Save user to the database
    let result = await user.save();
    result = result.toObject();
    result.password = "*****";

    return res.status(201).json({ message: "User account created", result });
  } catch (error) {
    // Handle validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    return res.status(400).json({ error: "error", error:error.message });
  }
};

const login = async (req, res) => { 
    try {
        // Check if both email and password are provided
        const data = req.body;
        if (!data.email || !data.password) {
          return res.status(400).json({ error: 'Please enter a valid email and password' });
        }
    
        // Find user by email
        let user = await User.findOne({ email:data.email });
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        // Compare the provided password with the stored hashed password
        const isMatch = await  compare(data.password, user.password);
        if (!isMatch) {
          return res.status(401).json({ error: 'Invalid password' });
        }
    
        const token = jwt.sign(data, authCredentials.secretKey, {expiresIn:"1h"})
    
        // update a new token
         user.token =token;
    
        // Save user to the database
        let result = await user.save();
    
        return res.status(200).json({mes:"login", userId:user.id, token:result.token});
    
    } catch (error) {
        //   console.log('error :', error);
        return res.status(400).json({  error:error.message });
      }
};

module.exports = {
  register,
  login,
};
