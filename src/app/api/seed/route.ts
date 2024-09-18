import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcryptjs';

export async function GET(request: Request) { 

    //purging db
     // 1. Delete all the toods
     await prisma.todo.deleteMany(); // delete from todo
    // 2. Delete all the users
    await prisma.user.deleteMany();
   
    const user = await prisma.user.create({
        data: {
            email: 'test1@gmail.com',
            password: bcrypt.hashSync('Qwe123'),
            roles: ['admin', 'client', 'super-user'],
            todos: {
                create: [
                    {description: 'soul stone', complete: true},
                    {description: 'power stone'},
                    {description: 'time stone'},
                ]
            }
        }
    })

    // await prisma.todo.createMany({
    //     data: [
    //         {description: 'soul stone', complete: true},
    //         {description: 'power stone'},
    //         {description: 'time stone'},
    //         {description: 'space stone'},
    //         {description: 'reality stone'},
    //     ]
    // })
   
  return NextResponse.json({ message: 'Seed Executed'})
}