const express=require('express')
const router= express.Router()

const Job=require("../schema/job.schema")
const authMiddleware=require('../middleware/auth')

// offset,skip,page    limit,size,pageSize,count
// ?offset=0&limit=3

router.get("/",async (req,res)=>{
    const {limit,offset,monthlySalary,name}=req.query
    const query={}

    if(monthlySalary){
        query.monthlySalary={$gte:monthlySalary,$lte:monthlySalary}
    }
    if(name){
        query.companyName={$regex:name,$options:"i"}
    }
    const jobs= await Job.find(query).skip(offset||0).limit(limit||5)
    // const jobs=await Job.find({monthlySalary:{$gte:4000,$lte:10000}}).skip(offset).limit(limit)
    // const jobs=await Job.find({monthlySalary}).skip(offset).limit(limit)
    // const jobs=await Job.find({monthlySalary,companyName:name}).skip(offset).limit(limit) 
    // const jobs= await Job.find({monthlySalary,companyName:{$regex:name,$options:"i"}}).skip(offset).limit(limit)
    res.status(200).json(jobs)
})


router.get("/:id", async (req,res)=>{
    const {id}=req.params

    const job=await Job.findById(id)

    if(!job){
        return res.status(400).json({message:"Job not found"})
    }
    else{
        res.status(200).json(job)
    }
})


router.delete("/:id",authMiddleware, async (req,res)=>{
    const {id}=req.params
    const userId=req.user.id
    const job=await Job.findById(id)

    if(!job){
        return res.status(400).json({message:"Job not found"})
    }
    else if(userId!==job.user.toString()){
        return res.status(401).json({message:"You are not allowed to delete this"})
    }
    else{
        await Job.deleteOne({_id:id})
        res.status(200).json({message:"Job deleted"})
    }
})

router.post("/",authMiddleware,async (req,res)=>{

    const {companyName,logoUrl,jobPosition,monthlySalary,jobType,jobMode,location,JobDescription,aboutCompany,skills,Information}= req.body

    if(!companyName || !logoUrl || !jobPosition || !monthlySalary || !jobType || !jobMode || 
        !location || !JobDescription || !aboutCompany || !skills || !Information){
            res.status(401).json({message:"required field missing"})
    }

    try{
        const user=req.user

        const job=await Job.create({
            companyName,
            logoUrl,
            jobPosition,
            monthlySalary,
            jobType,
            jobMode,
            location,
            JobDescription,
            aboutCompany,
            skills,
            Information,
            user:user.id
        })
    
        res.status(200).json(job)
    }
    catch(err){
        console.log("Error:",err)
        res.status(500).json({message:"Error in creating Job"})
    }

})

router.put("/:id",authMiddleware, async (req,res)=>{
    const {companyName,logoUrl,jobPosition,monthlySalary,jobType,jobMode,location,JobDescription,aboutCompany,skills,Information}= req.body
    const {id}= req.params
    const userId= req.user.id
    const job=await Job.findById(id)
    if(!job){
        res.status(400).json({message:"Job not found"})
    }
    else if(userId!==job.user.toString()){
        res.status(401).json({message:"You are not allowed to update this"})
    }
    else{
        try{
            await Job.findByIdAndUpdate(id,{
                companyName,
                logoUrl,
                jobPosition,
                monthlySalary,
                jobType,
                jobMode,
                location,
                JobDescription,
                aboutCompany,
                skills
            })
            res.status(200).json({message:"Job updated"})
        }
        catch(err){
            res.json(500).json({message:"Some error occured not able to update"})
        }
    }
})

module.exports=router