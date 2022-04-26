import mongoose from "mongoose";
import { isEmail } from 'validator';
const { Schema, Model } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    emailAddress: {
        type: String,
        required: true,
        validate: [ isEmail, 'Invalid Email' ],
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
}, { timestamps: true })

class Users extends Model {
    static getAllUsers() {
        return this.aggregate([
            {
                $project: {
                    firstName: 1,
                    lastName: 1,
                    emailAddress: 1,
                    isActive: 1,
                    fullName: {
                        $concat: ["$firstName", " ", "$lastName"]
                    }
                }
            }
        ]);
    }
}

module.exports = mongoose.model(Users, userSchema, 'users')