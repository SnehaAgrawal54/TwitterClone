import { User } from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const Signup = async (req, res) => {
    try {
        const { name, username, email, password } = req.body

        //validate all fields are entered
        if (!name || !username || !email || !password) {
            return res.status(401).json({
                message: "All fields are required.",
                success: false
            })
        }

        //validate user was not previously register
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "User already exist.",
                success: false
            })
        }

        //create new user
        const hashedPassword = await bcryptjs.hash(password, 15);

        await User.create({
            name,
            username,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}



export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //validate all fields are entered
        if (!email || !password) {
            return res.status(401).json({
                message: "All fields are required.",
                success: false
            })
        };

        //validate user was previously register
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false
            })
        }

        //validate user password
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Incorect email or password",
                success: false
            });
        }

        //set token in cookie
        const tokenData = { userId: user._id }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" });

        return res.status(201).cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: "None" }).json({
            message: `Welcome back ${user.name}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}



export const Logout = (req, res) => {
    return res.cookie("token", "", { expires: new Date(Date.now()),httpOnly: true, secure: true, sameSite: "None" }).json({
        message: "user logged out successfully.",
        success: true
    })
}


export const bookmarkTweet = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const tweetId = req.params.id;
        const user = await User.findById(loggedInUserId);

        //validate user previously bookmark the tweet
        if (user.bookmark.includes(tweetId)) {
            // remove bookmark
            await User.findByIdAndUpdate(loggedInUserId, { $pull: { bookmark: tweetId } });
            return res.status(200).json({
                message: "Removed from bookmark."
            });
        } else {
            // add bookmark
            await User.findByIdAndUpdate(loggedInUserId, { $push: { bookmark: tweetId } });
            return res.status(200).json({
                message: "Added to bookmark."
            });
        }
    } catch (error) {
        console.log(error);
    }
};


export const getMyProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select("-password");

        return res.status(200).json({
            user
        })
    } catch (error) {
        console.log(error);
    }
};


export const getOtherUser = async (req, res) => {
    try {
        const { id } = req.params;
        const otherUser = await User.find({ _id: { $ne: id } }).select("-password");

        if (!otherUser) {
            return res.status(401).json({
                message: "Currently do not have any users."
            })
        };
        return res.status(200).json({
            otherUser
        })
    } catch (error) {
        console.log(error);
    }
}

export const follow = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const userId = req.params.id;
        const loggedInUser = await User.findById(loggedInUserId);
        const user = await User.findById(userId);

        //validate loggedInUser previously followed user
        if (!user.followers.includes(loggedInUserId)) {
            await user.updateOne({ $push: { followers: loggedInUserId } });
            await loggedInUser.updateOne({ $push: { following: userId } });
        } else {
            return res.status(400).json({
                message: `User already followed to ${user.name}`
            })
        };

        return res.status(200).json({
            message: `${loggedInUser.name} just follow to ${user.name}`,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


export const unfollow = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const userId = req.params.id;
        const loggedInUser = await User.findById(loggedInUserId);
        const user = await User.findById(userId);

        //validate loggedInUser previously followed user
        if (loggedInUser.following.includes(userId)) {
            await user.updateOne({ $pull: { followers: loggedInUserId } });
            await loggedInUser.updateOne({ $pull: { following: userId } });
        } else {
            return res.status(400).json({
                message: `User has not followed yet`
            })
        };
        return res.status(200).json({
            message: `${loggedInUser.name} unfollow to ${user.name}`,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
