import InitialModal from "@/components/modals/initial-model";
import { db } from "@/lib/db";
import initialProfile from "@/lib/initial-profile";
import { redirect } from "next/navigation";

// now we our initialprofile in our main setup file
const ServerPage = async() => {
    const profile=await initialProfile();
    // we server to find profile in server like 
    // we prisma query findFirst from db 
    const server=await db.server.findFirst({
        where:{
            // memebers is also model of mysql relation with profile and server
            members:{
                // some same where to find something on condition id or name something
                // take object because this javascript not sql 
                some:{
                    profileId:profile.id 
                }
            }
        }
    })
    if(server){
        return redirect(`/servers/${server.id}`)
    }
    return ( <InitialModal/> );
}
 
export default ServerPage;