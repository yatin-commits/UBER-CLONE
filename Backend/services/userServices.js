// userServices.js
import userModel from "../models/user.model.js";  // Import the user model

const createUser = async ({ firstname, lastname, email, password }) => {
    // console.log(firstname, lastname, email, password);
    
    if (!firstname || !lastname || !email || !password) {
        throw new Error('All Fields Are Required');
    }
    // Create a new user in the database
    const user = await userModel.create({
        fullname: {
            firstname: firstname,
            lastname: lastname
        },
        email,
        password
    });
    return user;
};

// Export createUser function
export default createUser;
