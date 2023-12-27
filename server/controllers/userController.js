const userModel = require('../models/user');

const bcrypt = require('bcrypt');
const generateToken = require('../config/generateToken');




const signupUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            res.status(400).json("All the fields are required");

        }

        let user = await userModel.findOne({ email });

        // user is already registered
        if (user) return res.status(400).json('User already exist');
        user = new userModel({ username, email, password });

        // Password Encryption with Bcrypt
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        res.status(200).json({ _id: user._id, username: user.username, email: user.email, token: generateToken(user._id) });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);

    }

};



const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await userModel.findOne({ email });
        if (!user) return res.status(400).json("Invalid email");

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return res.status(400).json("Invalid password");

        res.status(200).json({ _id: user._id, username: user.username, email: user.email, token: generateToken(user._id) });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }

};



const findUser = async (req, res) => {
    const userId = req.params.userId;

    try {

        let user = await userModel.findById(userId);
        res.json(user);


    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }

}

module.exports = { signupUser, loginUser, findUser };