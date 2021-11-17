//import dependencies
import express from 'express'
import jwt from 'jsonwebtoken'
import validator from 'express-validator'

//intialize router
const router = express.Router();
const {check, validationResult} = validator;

//import models
import User from '../models/User.js'

//@POST - /api/users - create new user with name, email, and password - Public
router.post('/', [
    check("name", "Please include a name").not().isEmpty(),
    check("email", "Please use a valid email address").isEmail(),
    check("password", "Please enter a password with more than 6 characters").isLength({min: 6})
], async(req, res)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({msg: errors.array()[0].msg})
    }

    const {name, email, password} = req.body;

    try {
        let user = await User.findOne({email})

        if(user){
            return res.status(400).json({msg:"User already exists."})
        }

        user = new User({
            name,
            email,
            password
        })

        user.password = await user.hash(password);

        await user.save();

        const payload = {
            user: {
                id: user._id
            }
        }

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn: 36000},
            (err, token) =>{
                if(err){
                    throw err
                }
                res.json({token})
            }
        )
    } catch (error) {
        res.status(500).send("Server Error")
    }
})

export default router;