import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';

export const getUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    }
    catch (e) {
        console.log(e);
    }
    console.log(users);
    if (users) {
        return res.status(200).json({ users });
    }
    return res.status(500).json({ message: "Error" });
}

export const getUserByID = async (req, res, next) => {
    let id = req.params.id;
    let users;
    try {
        users = await User.findById(id);
    }
    catch (e) {
        console.log(e);
    }
    if (users) {
        return res.status(200).json({ users });
    }
    return res.status(500).json({ message: "Error" });
}

export const Signup = (req, res, next) => {

    const { Name, Email, Password } = req.body;
    const hashedPAssword = bcrypt.hashSync(Password);
    let users;
    try {
        users = new User({ Name, Email, Password: hashedPAssword });
        users = users.save();
    }
    catch (err) {
        console.log(err);
    }
    if (users) {
        return res.status(200).json({ users })
    }
    else {
        return res.status(500).json({ Message: "Couldn't add user" })
    }
}

export const loginUser = async (req, res, next) => {
    const { Email, Password } = req.body;
    if (!Email && !Password) {
        return res.status(422).json({ message: "Invalid data" });
    }
    const new_pass = bcrypt.hashSync(Password);
    let users;
    try {
        users = await User.findOne({ Email });
    }
    catch (e) {
        console.log("User not found");
    }

    console.log(users);
    if (!users) {
        return res.sendStatus(400).json({ message: "Unable to find user" });
    }

    const isPasswordCorrect = bcrypt.compareSync(Password, users.Password);
    if (isPasswordCorrect)
        return res.status(200).json({ message: "Successfull", id: users._id });
}