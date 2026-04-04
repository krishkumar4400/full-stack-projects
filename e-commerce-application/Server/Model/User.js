import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

});

export const User = mongoose.model.user || mongoose.model('user', userSchema);