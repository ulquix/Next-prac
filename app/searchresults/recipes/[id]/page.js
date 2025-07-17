import { getServerSession } from "next-auth";
import { connectToDB } from "@/lib/db";
import users from "@/models/user";
import Frontend from "./Frontend"

const Page = async ({ params }) => {
  try {
    const { id } = await params;

    // Fetch recipe data
    const res = await fetch(`https://dummyjson.com/recipes/${id}`, { cache: 'no-store' });
    
    if (!res.ok) {
      throw new Error('Recipe not found');
    }
    
    const data = await res.json();

    // Get user session and data
    const session = await getServerSession();
    const user =  session?.user
    if(!user){
      console.log('kuch to hua hai')
    }
    let userData = null;
    if (user?.email) {
      await connectToDB();
      userData = await users.findOne({ email: user.email });
    }

    return (
      <>
        <Frontend 
          data={data} 
          saved={userData?.saved || []} 
          isLoggedIn={!!user}
        />
      </>
    );
  } catch (error) {
    console.error('Error loading recipe:', error);
    return <div>Recipe not found</div>;
  }
}

export default Page;