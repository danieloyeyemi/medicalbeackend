const userModel = require('../models/user.model')
const cloudinary = require('cloudinary');
const SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken')
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const LandingPage = (res, req) => {
    res.send("I am here o")
}
const Signup = (req, res) => {
    const newUser = req.body;
    console.log(req.body)
    const email = req.body.email;
    const username = req.body.firstname;
    userModel.findOne({ email: email }, (err, result) => {
        if (err) {
            res.status(501).send({ message: 'Internal server error', status: false })
        }
        else {
            if (result) {
                res.send({ message: 'email already exist', status: false })
            }
            else {

                const form = new userModel(newUser)
                form.save((err) => {
                    if (err) {
                        console.log(`an error occured`)
                        res.status(501).send({ message: 'user sign up failed,please try again later', status: false })
                    } else {
                        res.send({ message: 'SiginUp Successful', status: true })
                    }

                })
                

            }


        }



    })

}

const Login = (req, res) => {
    const email = req.body.email
    const password = req.body.password
    console.log(req.body);
    userModel.findOne({ email: email }, (err, user) => {
        if (err) {
            res.status(501).send({ message: 'server error', status: false })
        } else {
            if (!user) {
                res.send({ message: 'Depart from me', status: false })
            } else {
                user.validatePassword(password, (err, same) => {
                    if (err) {
                        console.log(`error dey`)
                    } else {
                        if (same) {
                            const token = jwt.sign({ email }, SECRET, { expiresIn: 3600 })
                            console.log(token)
                            res.send({ message: 'correct password', status: true, token })
                        } else {
                            res.send({ message: 'invalid password', status: false })
                        }
                    }
                })
            }
        }
    })
}


const userDetails = (req,res) => {
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token,SECRET, async(err,result) => {
        if (err) {
            console.log(err);
        }else{
            const user = await userModel.findOne({email:result.email})
           res.send({status:true, user})
        }
    })
}
module.exports = { LandingPage, Signup, Login, userDetails }