const mongoose=require('mongoose')
const bcrypt =require('bcryptjs');
const doctorSchema=mongoose.Schema({
    firstname:String,
    lastname:String,
    username:String,
    email:String,
    profile_picture:String,
    password:String,
})

const saltRound=10
doctorSchema.pre('save',function(next){
    console.log('here')
    bcrypt.hash(this.password,saltRound,(err,hashedPassword)=>{
        if (err) {
            console.log(err)
        }
        else{
            this.password=hashedPassword
            next()
            console.log(hashedPassword)
        }
    })
})
doctorSchema.methods.validatePassword=function(password,callback){
    console.log(this)
    console.log(password)
    bcrypt.compare(password,this.password,(err,same)=>{
        if(!err){
        callback(err,same)
        }
        else{
            next()
        }
    })
}

const doctorModel=mongoose.model('doctor_tb',doctorSchema)

module.exports=doctorModel