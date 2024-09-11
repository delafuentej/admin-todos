import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'

interface Args {
    params: {
        id: string;
    }
}
export async function GET(request: Request, {params}: Args) { 
   // console.log(request.url);
   const { id }= params;
   const todo = await prisma.todo.findFirst({where: {id}})
   if(!todo) {
    return NextResponse.json({message: `Todo with id: ${id} doesn't exists`},{status: 404})
   }
    console.log('id',params.id)
 return NextResponse.json(todo);
}