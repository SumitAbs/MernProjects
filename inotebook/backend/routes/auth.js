const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const bcrypt = require('bcryptjs')
var  fetchUser = require('../middleware/fetchUser')
const JWT_Key = "SecureKey";
var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');


//Default Rout
router.get('/',(req, res)=>{
    res.json({'name':"sumit"})
})

// Create Users using POST "/api/auth/createUser" Doesn't require Auth
const { body, validationResult } = require('express-validator');

// body('field name','Custom Error Message')--validation Function--.isEmail(). :  Validation Section of Route
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
            res.status(500).send("Inernal Server Error");
        }
    },
);

// Authenticate a user : Login
router.post('/Login',[
        body('email').isEmail(),
        body('password',"Password can not me empty").exists()
    ],
    async (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // extract email and password from Request Body.
        const {email,password} =  req.body;

        try {
            // Check Email
            let user = await User.findOne({email});
            if(!user){return res.status(400).json({error:"Please try to Login with correct Credentials"}); }

            const passComp = await bcrypt.compare(password, user.password);
            if(!passComp){return res.status(400).json({error:"Please try to Login with correct Credentials"}); }

            const data = {
                user:{
                    id:user.id
                }
            }
            const authToken = jwt.sign(data,JWT_Key);
            console.log("done");
            res.json(authToken)

        }catch (error) {
            console.log(error);
            res.status(500).send("Inernal Server Error");
        }
    }
);

//  get LoggedIn Users Detail : Login required.
router.post('/getUser',fetchUser,async (req, res) => {
        try {
            userId = req.user.id;
            // .select can use to fetch all the data : By using "-password" we cant skip the field to fetch and display
            const user = await User.findById(userId).select("-password");
            res.send(user);
        }catch (error) {
            console.log(error);
            res.status(500).send("Inernal Server Error");
        }
    }
)



module.exports = router;