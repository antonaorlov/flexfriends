"use server"
import { connectToDB } from "../mongoose"
import User from "../models/user.model";
import Thread from "../models/threads.model";
import { revalidatePath } from "next/cache";
interface params{
    
    userId :string,
    username:string,
    name:string,
    bio:string,
    image:string,
    path:string

}
export async function updateUser({userId,username,name,bio,image,path}:params):Promise<void>{
    connectToDB();
    try{
        await User.findOneAndUpdate(
            {id:userId},
            {
                username:username.toLowerCase(),
                name,
                bio,
                image,
                onboarded:true,
            },
            {upsert:true}
            )
            if (path==='/profile/edit'){
                revalidatePath(path)
            }

    }
    catch(error:any){
        throw new Error(`Failed to create/update user: ${error.message}`)
        
    }
}
export async function fetchUser(userId:string) {
    try{
        connectToDB();
        return await User.findOne({id:userId})
    }
    catch(err:any){
        throw new Error(`Failed to fetch user: ${err.message}`)
    }
    
}

export async function fetchUserThread(userId:string){
    try{
        connectToDB()
        const threads = await User.findOne({id:userId})
            .populate({
                path:'threads',
                model:Thread,
                populate:{
                    path:'children',
                    model:Thread,
                    populate:{
                        path:'author',
                        model:User,
                        select:"name image id"
                    }

                }
            })
        return threads
    }
    catch(err:any){
        throw new Error(`Failed to fetch user posts: ${err.message}`)
    }
}
