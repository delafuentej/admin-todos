import { Tabbar } from "@/components";
import { Metadata } from "next";


export const metadata : Metadata= {
 title: 'Cookies Page',
 description: 'SEO Title',
};
export default function Cookies() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="flex flex-col">
        <span className="text-3xl">Tabs</span>
        <Tabbar/>


      </div>
      
    </div>
  );
}