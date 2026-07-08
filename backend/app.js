const express=require("express");
const cors=require("cors");
require("dotenv").config();

const uploadRoutes=require("./routes/upload");

const app=express();

app.use(cors());

app.use(express.json());

app.use("/upload",uploadRoutes);

app.get("/",(req,res)=>{

    res.send("RAG Backend Running 🚀");

});

const PORT=process.env.PORT||3000;

app.listen(PORT,()=>{

    console.log(`Server running on ${PORT}`);

});