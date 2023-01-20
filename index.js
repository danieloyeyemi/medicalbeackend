const express=require('express')
const app =express()
const bodyParser=require('body-parser')
// app.use(express.static(__dirname+'/build'))
app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}))
app.use(bodyParser.json({limit:"50mb"}))
const cors=require('cors')
app.use(cors())
const mongoose=require("mongoose")
const URI= 'mongodb+srv://danoye:dannydo93@cluster0.osdw8.mongodb.net/hospital_tb?retryWrites=true&w=majority'
require('dotenv').config()
const PORT=process.env.PORT||5006
const userRouter=require("./routes/user.route")
app.use('/users',userRouter)
app.get('/',(req,res)=>{
  res.send({name:'fish'})
})
// app.get('/*'),(req,res)=>{
//   res.sendFile(__dirname+"/build/index.html")
// }
mongoose.connect(URI,(err)=>{
      if (err) {
        console.log("mongoose not connected yet")
        console.log(err)    
      }
      else{console.log('mongoose connected successfully')}
})
var connection=app.listen(PORT,()=>{
    console.log(`app is listening on port ${PORT}`)
})

