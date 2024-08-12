"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function profilePage(params: any) {
  const router = useRouter();

  const handleLogout = async function(){
    try
    {
        const response = await axios.get("/api/logout");
        if (response.status === 200)
        {
          toast.success("Logout successfully")  
          router.push("/login");
        }

    }
    catch(error:any)
    {
        toast.error(error.message);
        
    }
  }

  return (
    <>
      <h1 className="text-white">Welcome to profile Page</h1>
      <button className="bg-blue-400 rounded p-1 shadow" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}
