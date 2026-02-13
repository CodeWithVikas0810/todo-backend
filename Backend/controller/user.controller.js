import Users from "../models/user.models.js";

export const loginUser = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        const user = await Users.findOne({
            email
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No user found"
            })
        }
        if (user.password !== password) {
            return res.status(401)
                .json({
                    success: false,
                    message: "Incorrect password"
                })
        } else {
            res.status(200).json({
                success: true,
                message: "Login successful",
                userId: user._id
            })
        }

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}

export const SignupUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body;
        const existingUser = await Users.findOne({
            email
        });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            })
        }
        const user = await Users.create(req.body);
        res.status(201).json({
            success: true,
            message: "User created successfully",
            userId: user._id
        })
    } catch (error) {

        res.status(400).json({
            error: error.message
        })
    }
}