export const dynamic = 'force-dynamic';
export const revalidate = 0;

import prisma from "@/lib/prisma";
import { TodosGrid } from "@/todos";
import { NewTodo } from "@/todos/components/NewTodo";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getUserSessionServer } from '../../../auth/actions/auth-actions';


export const metadata: Metadata = {
  title : "Todo's List",
  description: "This is Todo's List"
}

  
export default async function ServerTodos() {

  const user = await getUserSessionServer();

  if(!user) redirect('/api/auth/signin');

  const todos = await prisma.todo.findMany({
    where: {userId: user.id},
    orderBy: {description: 'asc'}
  })
  
  
  
  return (
    <div>
      <span className="flex justify-center text-3xl w-full text-center mb-10">Server Actions</span>
      <div className="w-full px-5 mx-5 mb-5">
        <NewTodo />
      </div>
      
     <TodosGrid todos={todos}/>
    </div>
  );
}