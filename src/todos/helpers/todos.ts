import { Todo } from "@prisma/client";

const sleep = (seconds: number = 0) : Promise<boolean>=> {
    return new Promise((resolve) =>{
        setTimeout(()=>{
            resolve(true);
        }, seconds * 1000)
    })
}

export const updateTodo = async(id: string, complete: boolean) :Promise<Todo>=> {

    await sleep(1);
    
    const body = {complete: complete};

    const dbTodo = await fetch(`/api/todos/${id}`,{
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then( resp => resp.json());
    console.log('dbTodo',{dbTodo});
    return dbTodo;
}

export const createTodo = async(description: string) :Promise<Todo>=> {
    const body = {description: description};

    const newTodo = await fetch('/api/todos',{
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then( resp => resp.json());
    console.log('dbTodo',{newTodo});
    return newTodo;
}

export const deleteCompletedTodos = async() :Promise<boolean>=> {
   

    await fetch('/api/todos',{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then( resp => resp.json());
  
    return true;
}


