import {PrismaClient} from "@prisma/client";


declare global{
    var prisma:PrismaClient | undefined
};
//  you find in the documentation for next js
// not load prismaClient every time of code changes
export const db=global.prisma || new PrismaClient();
// to hot reload load too many prisma clients
if(process.env.NODE_ENV!=="production"){
    global.prisma=db
}