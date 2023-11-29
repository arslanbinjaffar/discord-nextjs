// these things all coming from documentation of "clerkjs in next js"
import {currentUser,redirectToSignIn} from "@clerk/nextjs"

// in next js we can use import alias of import like
// import {db} from './db' db means database file
// import alias of next js
import {db} from '@/lib/db';


const initialProfile = async() => {
    // we check user use clerk or not
    const user=await currentUser()
    // in condition we check user sign in or sign up vist home or
    // protected route
    if(!user){
        return redirectToSignIn()
    }
//    profile we get from database in which we acess profile model or schema
//  from prisma and mysql
// find unique just query come from prisma
// these similar to sql commands but now pass object then object into object
    const profile=await db.profile.findUnique({
        where:{
            userId:user.id
        }
    })
    if(profile){
        return profile
    }
    // prisma query create our model or user anything we create into database by prisma
    // pass object then data that also a object all these user model thing e.g. id,name
    const newProfile=await db.profile.create({
       
        data:{
            userId:user.id,
            name:`${user.firstName}${user.lastName}`,
            imageUrl:user.imageUrl,
            email:user.emailAddresses[0].emailAddress
        }
    })
    return newProfile
}
 
export default initialProfile;