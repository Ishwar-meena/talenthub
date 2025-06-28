'use server';

import connectDb from "@/db/connection";
import User from "@/models/Users";

export const fetchUserData = async ({ email }) => {
    try {
        await connectDb();
        const response = await User.findOne({ email: email }).select('-_id -updatedAt -createdAt').lean();
        
        if (!response) {
            return { success: false, message: "some error occured" };
        }
        return { success: true, data: response };
    } catch (error) {
        console.error(error);
        return { success: false, message: "server error" };
    }
}

// this give user email 
export const userEmail = async (userId) => {
    try {
        await connectDb();
        const result = await User.findOne({ _id: userId }).select('email -_id').lean();
        if (!result) {
            return { success: false, message: 'userid not exist or try again' };
        }
        return { success: true, data: result };
    } catch (error) {
        return { success: false, message: 'Server error try again' };
    }
}

// this function give all the users data 
export const usersData = async () => {
    try {
        await connectDb();
        const result = await User.find({}).select('-_id -createdAt -updatedAt').lean();
        if (!result) {
            return { success: false, message: "no data found" };
        }
        return { success: true, data: result };
    } catch (error) {
        console.error(error);
        return { success: false, message: "server error" };
    }
}

// this function promote user as a admin 
export const PromoteAsAdmin = async (email) => {
    try {
        await connectDb();
        const response = await User.findOneAndUpdate({ email: email }, { $set: { admin: true } });
        if (!response) {
            return { success: false, message: "email id not exist or try again" };
        }
        return { success: true, message: "successfully promoted as admin" };
    } catch (error) {
        return { success: false, message: "Server error" };
    }
}