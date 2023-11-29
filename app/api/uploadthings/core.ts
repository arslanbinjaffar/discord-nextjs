// we using clerk
import {auth} from '@clerk/nextjs'
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
// creating Auth handle function
const handleAuth=()=>{
    // id coming from auth of clerk through database
    const {userId}=auth()
    if(!userId) throw Error("unauthorized")
    return {userId:userId}

    
}
 
export const ourFileRouter = {
// first case uploading server image
serverImage:f({image:{maxFileSize:"4MB",maxFileCount:1}})
.middleware(()=>handleAuth())
.onUploadComplete(()=>{}),
// messageFile which we can type of that 
messageFile:f(["image","pdf","video","image/jpeg"])
.middleware(()=>handleAuth())
.onUploadComplete(()=>{})
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;