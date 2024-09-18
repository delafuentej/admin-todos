'use client';


import { useSession } from "next-auth/react";
import Image from "next/image";




export default function Profile() {

    const {data: session} = useSession();
    
  
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <h1 className="text-5xl text-center">Profile  Page</h1>
      <hr/>
      <div className="flex flex-col">
       <Image 
       className="rounded-full mb-4 m-auto"
       src={session?.user?.image ?? ''}
       width={150}
       height={150}
       alt='Foto user'
       />
        <span className="text-3xl  text-gray-500">{session?.user?.name ?? 'No Name'}</span>
        <span className="text-2xl text-center">{session?.user?.email ?? 'No Email'}</span>

      </div>
    </div>
  );
}