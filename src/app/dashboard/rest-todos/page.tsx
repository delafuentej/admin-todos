import prisma from "@/lib/prisma";
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
     {JSON.stringify(todos)}
    </div>
  );
}