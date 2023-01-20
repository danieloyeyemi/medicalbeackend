const mongoose=require('mongoose')
const bcrypt =require('bcryptjs');
const userSchema=mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    profile_picture:String,
    password:String,
})

const saltRound=10
userSchema.pre('save',function(next){
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
userSchema.methods.validatePassword=function(password,callback){
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

const userModel=mongoose.model('user_tb',userSchema)

module.exports=userModel