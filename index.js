import express from 'express'
import mongoose from 'mongoose'
import {User} from './model/user.js'

const app=express()

const MONGODB_URI="mongodb+srv://demo:demo@cluster0.vqmhxwm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

app.listen(8080,()=>{
    console.log("Server is running..");
})

mongoose.connect(MONGODB_URI).then(
    ()=>{
        console.log('DB is Connected');
    }
)

app.use(express.json())

var data=[
{
    "name":"User"
},
{
    "name":"User2"
},
]

app.get("/get",async(req,res)=>{
const Users=await User.find()
    res.json(Users)
})

app.post('/add',async(req,res)=>{

    const payload=req.body
    await User.create(payload)

    res.json('success')
})

app.put("/update/:index",async(req,res)=>{
    const payload=req.body
    const api_index=req.params.index

await User.findByIdAndUpdate(api_index,payload)

    res.json({message:'success',api_index})
})

app.delete("/delete/:index",async(req,res)=>{
        const api_index=req.params.index
        try {
            await User.findByIdAndDelete(api_index)
        } catch (error) {
            return res.json({status:"error",message:"Invalid ID"})
        }
 res.json({message:'success',api_index}) 
})