const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const bcrypt = require('bcryptjs')
const JWT_Key = "SecureKey";
var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');


//Default Rout
router.get('/',(req, res)=>{
    res.json({'name':"sumit"})
})

// Create Users using POST "/api/auth/createUser" Doesn't require Auth
const { body, validationResult } = require('express-validator');

// body('field name','Custom Error Message')--validation Function--.isEmail(),
router.post('/createUser',[
    body('email').isEmail(),
    body('name').isLength({min:3}),
    body('password').isLength({ min: 5 })
    ],
    async (req, res) => {

        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            //  Check if the user with this email already exist
            let user = await User.findOne({email:req.body.email});

            if(user){
                return res.status(400).json({error:"This email is already Exist. Please enter diffrent email."})
            }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt );
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            });
            // .then(user => res.json(user));

            const data = {
                user:{
                    id:user.id
                }
            }
            
            const authToken = jwt.sign(data,JWT_Key);
            // res.json(user)
            res.json(authToken)
        }catch (error) {
            console.log(error);
        }
    },
);





// body('field name','Custom Error Message')--validation Function--.isEmail(),





module.exports = router;