'use client';
import { useSession, signIn, signOut } from "next-auth/react";
import { CiLogin, CiLogout } from "react-icons/ci";
import { GiSandsOfTime } from "react-icons/gi";


export const LogoutButton = () => {
  const { data: session, status } = useSession();
  console.log('session',session)
  console.log('status', status)
  if(status === 'loading'){
    return(
      <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
        <GiSandsOfTime  />
        <span className="group-hover:text-gray-700">Please, wait a moment</span>
    </button>
    )
  }
  if(status === 'unauthenticated'){
    return(
      <button 
      onClick={() =>signIn()}
        className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
        <CiLogin  />
        <span className="group-hover:text-gray-700">Login</span>
    </button>
    )
  }
 


  return (
    <button 
      onClick={() =>signOut()}
      className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
        <CiLogout />
        <span className="group-hover:text-gray-700">Logout</span>
      </button>
  )
}
