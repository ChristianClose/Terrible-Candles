import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    isAdmin: {type: Boolean, default: false}
}, { timestamps: true });

async function encryptPassword(next) {
    const user = this._update || this;
    if (user.password || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            next();
        } catch (error) {
            next(error);
        }
    }
    return next();
}

userSchema.pre("save", encryptPassword);
userSchema.pre("findOneAndUpdate", encryptPassword);


userSchema.methods.comparePassword = async function (plaintext) {
    try {
        return await bcrypt.compare(plaintext, this.password);
    } catch (error) {
        console.log(error);
    }
};

const userModel = mongoose.model("User", userSchema);

export default userModel;