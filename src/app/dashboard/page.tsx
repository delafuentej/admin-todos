import { WidgetItem } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if(!session){
      redirect('api/auth/signin');
    }

  return (
    
    <div className="grid gap-6 grid-cols-1">
            
      <WidgetItem
        title='Logged-in User (Server Side)'
      >
        <div className="flex flex-col text-center w-full items-center justify-center">
          <Image 
          className="rounded-full"
          src={session.user?.image ?? ''}
          width={50}
          height={50}
          alt='foto user'
          
          />
          <span>{session.user?.name}</span>
          <span>{session.user?.email}</span>
          <div>
            {JSON.stringify(session)}
          </div>
        </div>
      </WidgetItem>
     
      
    {/* TODO: Fin <WidgetItem /> */}

  </div>  
       
  );
}