import mongoose from 'mongoose'

const CommuinitySchema = new mongoose.Schema({
    id:{type:String, required:true},
    username:{type:String, required:true, unique:true},
    name: {type:String, require:true},
    image:String,
    bio:String,
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Thread'
    },
    threads:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Thread"
    }],
    members:[
        {
            type:mongoose.Schema.Types.ObjectId
        }
    ]
})

const Community = mongoose.models.Community || mongoose.model('User',CommuinitySchema)
export default Community