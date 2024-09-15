'use server';

import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";


export const toggleTodo = async(id: string, complete: boolean): Promise<Todo> => {

    const todo = await prisma.todo.findFirst({where: {id}});

    if(!todo){
        throw `It doesn't exists todo with id:${id}`
    }
    const updateTodo = await prisma.todo.update({
        where: {id},
        data: {complete: complete}
    })
    revalidatePath('/dashboard/server-todos');
    return updateTodo;
}

