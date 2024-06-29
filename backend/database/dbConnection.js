import mongoose from 'mongoose';

export const dbConnection = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connected to MONGODB database`);
    }
    catch (error) {
        console.log(error);
    }
}
