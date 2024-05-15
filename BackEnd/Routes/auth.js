const express = require('express');

const User = require('../Models/User')
const fetchuser = require('../middleware/fetchuser');

const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = "abdul$moidkhan123"

// Route 1 : create a user using: POST "/api/auth/createuser". No login required 

router.post('/createuser', [
    body('email', "Enter a valid email id").isEmail(),
    body('name', "Enter name of length atleast of 3 characters").isLength({ min: 3 }),
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    
    // if there are errors, return bad request and the errors
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    // check whether the user with this email exists already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: "Sorry a user with this email already exists use your credentials to login or use another email"})
        }

        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt)  

        // create a  new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword,
        })

        const data = {
            user: {
                id: user.id
            }
        }
        
        const authToken = jwt.sign(data, JWT_SECRET);
        // console.log(authToken)

        success = true;
        res.json({success, authToken})
    }

    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error");
    }
})



// Route 2 : Authenticate a user using: POST "/api/auth/loginuser". No login required 

router.post('/loginuser', [
    body('email', "Enter a valid email id").isEmail(),
    body('password', "Password can not be blank").exists(),
], async (req, res) => {
    let success = false;

    // if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // descruturing email and password from body
    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});

        if(!user) {
            success = false;
            return res.status(400).json({error: "Please try to login with correct credentials"})
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if(!passwordCompare) {
            success = false;
            return res.status(400).json({
                success,
                error: "Please enter correct credentials"
            })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        
        const authToken = jwt.sign(data, JWT_SECRET);
        // console.log(authToken)
        success = true;

        res.json({success, authToken})

    }

    catch(error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})


// Route 3 : Get logggedIn user details using: POST "/api/auth/getuser". login required 


router.post('/getuser', fetchuser,
 async (req, res) => {

try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
}

catch(error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
}})

module.exports = router