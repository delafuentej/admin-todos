import prisma from '@/lib/prisma';
import { Todo } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import * as yup from 'yup';

interface Args {
    params: {
        id: string;
    }
}

const getTodo = async(id: string): Promise<Todo | null> => {
    const todo = await prisma.todo.findFirst({where: {id}});
    return todo;
}
export async function GET(request: Request, {params}: Args) { 
   // console.log(request.url);
 // const { id }= params;
   const todo = await getTodo(params.id)
   if(!todo) {
    return NextResponse.json({message: `Todo with id: ${params.id} doesn't exists`},{status: 404})
   }
    console.log('id',params.id)
 return NextResponse.json(todo);
}


const putSchema = yup.object({
    description: yup.string().optional(),
    complete: yup.boolean().optional(),
})


export async function PUT(request: Request, {params}: Args) { 
    //const { id }= params;
    const todo = await getTodo(params.id)
    if(!todo) {
     return NextResponse.json({message: `Todo with id: ${params.id} doesn't exists`},{status: 404})
    }

    try{
        const {description, complete} = await putSchema.validate(await request.json());

        const updatedTodo = await prisma.todo.update({
            where: {id: params.id},
            data: {description, complete}
        })
        // console.log('id',params.id)
      return NextResponse.json(updatedTodo);

    }catch(error){
        return NextResponse.json(error, {status: 400})
    }
}

export async function DELETE(request: Request, { params }: Args) {
    // Obtener el id desde los parámetros
    const todo = await getTodo(params.id);

    // Si el todo no existe, retornar un mensaje de error
    if (!todo) {
        return NextResponse.json({ message: `Todo with id: ${params.id} doesn't exist` }, { status: 404 });
    }

    try {
        // Eliminar el todo de la base de datos
        await prisma.todo.delete({
            where: { id: params.id },
        });

        // Retornar una respuesta indicando que el todo fue eliminado
        return NextResponse.json({ message: `Todo with id: ${params.id} was successfully deleted` }, { status: 200 });
    } catch (error) {
        // Manejar cualquier error que ocurra durante la operación de eliminación
        return NextResponse.json({ message: 'Error deleting Todo', error }, { status: 500 });
    }
}