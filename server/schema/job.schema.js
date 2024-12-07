const mongoose=require('mongoose')

const jobSchmea= new mongoose.Schema({

    companyName:{
        type:String,
        required:true
    },

    logoUrl:{
        type:String,
        required:true
    },

    jobPosition:{
        type:String,
        required:true
    },

    monthlySalary:{
        type:Number,
        required:true
    },

    jobType:{
        type:String,
        required:true,
        enum:['full-time','part-time','contract','internship','freelance']
    },
    jobMode:{
        type:String,
        required:true,
        enum:['office','remote','hybrid']
    },
    location:{
        type:String,
        required:true
    },
    JobDescription:{
        type:String,
        required:true
    },
    aboutCompany:{
        type:String,
        required:true
    },
    skills:{
        type:[String],
        required:true
    },
    Information:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})

const jobSchemaModel= mongoose.model('Job',jobSchmea)
module.exports=jobSchemaModel