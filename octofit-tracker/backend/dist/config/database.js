import mongoose from 'mongoose';
export async function connectDatabase() {
    const databaseUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
    await mongoose.connect(databaseUri);
}
