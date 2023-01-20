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
                // const form = new userModel(newUser)
                // form.save((err, result) => {
                //     if (err) {
                //         console.log(err)
                //         console.log(`error`)
                //         res.send({ message: "user signup failed, please try again later", status: false })
                //     }
                //     else {
                //         res.send({ message: "registration successful", status: true })
                //     }
                // })

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
                            const token = jwt.sign({ email }, SECRET, { expiresIn: '1h' })
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
// const Login = (req, res) => {
//     const logUser = req.body;
//     console.log(req.body)
//     const email = req.body.email
//     const password = req.body.password
//     userModel.findOne({ email: email }, (err, user) => {
//         if (err) {
//             res.send({ message: 'server error', status: false })
//         }
//         else {
//             if (!user) {
//                 res.send({ message: 'unrecognized email', staus: false })
//             }
//             else {
//                 user.validatePassword(password, (err, same) => {
//                     if (err) {
//                         console.log(`an error occured`)
//                     }
//                     else {
//                         if (same) {
//                             const token = jwt.sign({ email }, SECRET, { expiresIn: '12h' })
//                             console.log(token)
//                             res.send({ message: 'correct password', status: true, token })
//                         }
//                         else {
//                             res.send({ message: 'invalid password', status: false })
//                         }

//                         // console.log(same)
//                     }
//                 })
//             }
//         }
//     })
// }
module.exports = { LandingPage, Signup, Login }