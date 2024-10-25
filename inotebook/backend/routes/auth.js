const express = require('express');
const router = express.Router();
const User = require('../Models/User');

// Create Users using POST "/api/auth/createUser" Doesn't require Auth

// ...rest of the initial code omitted for simplicity.
const { body, validationResult } = require('express-validator');

// body('field name','Custom Error Message')--validation Function--.isEmail(),
router.post('/createUser',

    body('email').isEmail(),
    body('name').isLength({min:3}),
    body('password').isLength({ min: 5 }),

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
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });
            // .then(user => res.json(user));
            res.json(user)
        }catch (e) {
            console.log(e.message());
            return res.status(500).json({error:"Some Error Occure."})

        }
    },
);


//Default Rout
router.get('/',(req, res)=>{
    res.json({'name':"sumit"})
})

module.exports = router;