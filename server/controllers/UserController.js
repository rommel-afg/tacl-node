import Users from '../models/Users'
import response from '../utils/response';
import { hash, genSalt } from 'bcryptjs'

const getAll = async (req, res) => {
    try {
        const users = await Users.getAllUsers()

        return response(res, true, `${users.length} User/s Found`, users)
    } catch( err ) {
        return response(res, false, `Error: ${err}`, null)
    }

}

const createUser = async (req, res) => {
    try {
        const body = req.body;

        let tempSalt = await genSalt(10);
        let pass = await hash(body.password, tempSalt)

        let data = {
            post: body,
            salt: tempSalt,
            pass: pass
        }

        const newUser = new Users({
            firstName: body.firstName,
            lastName: body.lastName,
            emailAddress: body.emailAddress,
            password: pass,
            salt: tempSalt,
            isActive: false
        })

        // save new user
        await newUser.save();

        return response(res, true, `Post Data Found`, data)
    }catch(err){
        return response(res, false, err, null)
    }
}

const updateUser = async () => {

}

const deleteUser = async () => {
    // soft delete
    // set isActive to false
}

module.exports = {
    getAll,
    createUser
}