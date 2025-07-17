import { getToken } from "next-auth/jwt";
import Users from "@/models/user";
import { connectToDB } from "@/lib/db";
import { NextResponse } from "next/server";
export async function POST(request) {
  const token = await getToken({ req: request });
  if (!token || !token.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await request.json();

  try {
    await connectToDB();
    await Users.findOneAndUpdate(
      { email: token.email },
      { $addToSet: { saved: id } }
    );
    return NextResponse.json({ message: "Set successfully" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}

export async function DELETE(request) {
  const token = await getToken({ req: request });
  if (!token || !token.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await request.json();

  try {
    await connectToDB();
    await Users.findOneAndUpdate(
      { email: token.email },
      { $pull: { saved: id } }
    );
    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}
export async function GET(request){
  const token = await getToken({req:request})
  const posts = await Users.findOne({email:token.email}).select("saved")
  const arr = posts.saved
  return NextResponse.json({message:JSON.stringify(arr)})
}