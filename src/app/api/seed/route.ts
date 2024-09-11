import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) { 

    //purging db
    await prisma.todo.deleteMany(); // delete from todo

    await prisma.todo.createMany({
        data: [
            {description: 'soul stone', complete: true},
            {description: 'power stone'},
            {description: 'time stone'},
            {description: 'space stone'},
            {description: 'reality stone'},
        ]
    })
   
  return NextResponse.json({ message: 'Seed Executed'})
}