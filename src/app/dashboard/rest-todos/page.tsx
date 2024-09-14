import prisma from "@/lib/prisma";
import { TodosGrid } from "@/todos";
import { NewTodo } from "@/todos/components/NewTodo";
import { Metadata } from "next";
//'use client';
//import { useEffect } from "react";

export const metadata: Metadata = {
  title : "Todo's List",
  description: "This is Todo's List"
}

  
export default async function RestTodos() {
  const todos = await prisma.todo.findMany({
    orderBy: {description: 'asc'}
  })
  

  // useEffect(()=>{
  //     fetch('/api/todos')
  //     .then( res => res.json())
  //     .then(console.log)
  // }, []);
  
  return (
    <div>
      <div className="w-full px-5 mx-5 mb-5">
        <NewTodo />
      </div>
      
     <TodosGrid todos={todos}/>
    </div>
  );
}