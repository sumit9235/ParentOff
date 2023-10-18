const express=require('express');
const { UserModel } = require('./models/user.model');
const { connection } = require("./database/db");
const cors=require('cors');
const app=express();

app.use(express.json())

app.use(cors())
app.get("/",(req,res)=>{
    res.send("Welcome to webpage")
})


// getting name
app.post("/name/:fname/:lname",async(req,res)=>{
    const fname=req.params.fname;
    const lname=req.params.lname;
    try {
        let name=fname+lname;
        res.status(200).send({"msg":name})
    } catch (error) {
        res.status(400).send({"error":error.message})
    }
})

//reversing in names 
app.post("/reverseName/:fname/:lname",async(req,res)=>{
    const fname=req.params.fname;
    const lname=req.params.lname;
    try {
        let name=lname+" "+fname;
        // let nameArray=name.split(" ").reverse().join();
        res.status(200).send(name)
        
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// reversing in leters
app.post("/reverseLetter/:fname/:lname",async(req,res)=>{
    const fname=req.params.fname;
    const lname=req.params.lname;
    try {
        let name=fname+lname;
        let nameArray="";
        for(let i=name.length-1;i>=0;i--){
            nameArray+=name[i]
        }
        res.status(200).send(nameArray);
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// saving student data
app.post("/studentData",async(req,res)=>{
    const name=req.body.name;
    const std= req.body.std;
    const marks=req.body.marks;
    try {
        const studentData=new UserModel({name,std,marks});
        await studentData.save();
        res.send("Data saved sucessfully")
    } catch (error) {
        res.send(error.message)
    }
})

app.get("/studentsData",async(req,res)=>{
    try {
        const students=await UserModel.find();
        res.status(200).send(students);
    } catch (error) {
        res.send(error.message)
    }
})

app.listen(4500,async()=>{
    try {
        await connection;
        console.log("Connected to server");    
    } catch (error) {
        console.log(error.message)
    }
    console.log("Connected to server")
})