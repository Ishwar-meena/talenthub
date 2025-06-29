'use server';
import connectDb from "@/db/connection";
import Document from "@/models/Documents";


export const saveStudentData = async (formData) => {
    try {
        await connectDb();
        const result = await Document.create(formData);
        if (!result) {
            return { success: false, message: "failed to save data try again" };
        }
        return { success: true, message: "Data saved successfully" };
    } catch (error) {
        console.error(error);
        return { success: false, message: "server error try again" };
    }
}

export const fetchStudentData = async ({ userId }) => {
    try {
        await connectDb();
        const result = await Document.find({ userId: userId })
            .select('-_id -createdAt -updatedAt')
            .sort({ createdAt: -1 })
            .lean();
            

if (!result) {
    return { success: false, message: "Data is not exist or try again" };
}
return { success: true, data: result };
    } catch (error) {
    console.error(error);
    return { success: false, message: "Server error try again" };
}
}

export const studentsAllData = async () => {
    try {
        await connectDb();
        const result = await Document.find()
            .select(' -createdAt -updatedAt')
            .sort({ verified: 1 })
            .lean();

        const data = result.map((item) => {
            const { _id, ...rest } = item;
            return {
                ...rest,
                id: _id.toString(),
            };
        });

        if (!result) {
            return { success: false, message: 'failed to fetch data' };
        }
        return { success: true, data: data }
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Server error failed to fetch data' };
    }
}


// this function verify a document
export const verifyDocument = async (id) => {
    try {
        await connectDb();
        const result = await Document.findOneAndUpdate({ _id: id }, { $set: { verified: true } });
        if (!result) {
            return { success: false, message: 'failed to update document' };
        }
        return { success: true, message: 'Document successfully verified' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Server error failed to update document' };
    }
}

// this function reject a document with reason
export const rejectDocument = async (id, reason) => {
    try {
        await connectDb();
        const result = await Document.findOneAndUpdate({ _id: id }, { $set: { rejected: true, reason: reason } });
        if (!result) {
            return { success: false, message: 'failed to reject document' };
        }
        return { success: true, message: 'Document successfully rejected' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Server error failed to reject document' };
    }
}