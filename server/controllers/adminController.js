import Admin from "../models/adminModel.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const getAdmin = async (req, res, next) => {
    let admins;
    try {
        admins = await Admin.find();
    }
    catch (e) {
        console.log(e);
    }
    if (admins) {
        return res.status(200).json({ admins });
    }
    return res.status(500).json({ message: "Error" });
}

export const getAdminById = async (req, res, next) => {
    let id = req.params.id;
    let admins;
    try {
        admins = await Admin.findById(id).populate("flights");
    }
    catch (e) {
        console.log(e);
    }
    if (admins) {
        return res.status(200).json({ admins });
    }
    return res.status(500).json({ message: "Error" });
}

export const Signup = (req, res, next) => {

    const { Name, Email, Password } = req.body;
    const hashedPAssword = bcrypt.hashSync(Password);
    let admins;
    try {
        admins = new Admin({ Name, Email, Password: hashedPAssword });
        admins = admins.save();
    }
    catch (err) {
        console.log(err);
    }
    if (admins) {
        return res.status(200).json({ admins })
    }
    else {
        return res.status(500).json({ Message: "Couldn't add admin" })
    }
}

export const loginAdmin = async (req, res, next) => {
    const { Email, Password } = req.body;
    if (!Email && !Password) {
        return res.status(422).json({ message: "Invalid data" });
    }
    const new_pass = bcrypt.hashSync(Password);
    let existadmin;
    try {
        existadmin = await Admin.findOne({ Email });
    }
    catch (e) {
        console.log("Admin not found");
    }

    if (existadmin) {

        const isPasswordCorrect = bcrypt.compareSync(Password, existadmin.Password);

        if (isPasswordCorrect) {

            //jwt.sign(payload, secretOrPrivateKey, [options, callback])
            const token = jwt.sign({ id: existadmin._id }, process.env.SECRET_KEY, {
                expiresIn: "7d",
            })

            return res.status(200).json({ message: "Admin exists", token, id: existadmin._id });
        }
        else {
            // Incorrect password
            return res.json({ message: "Incorrect password" });
        }
    }
    return res.json({message: "No Admin Found!"})
}