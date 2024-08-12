import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get('token');


  console.log("middlware call .....");
  

  if (!token) {
    const response = NextResponse.json({ message: "Not authorized" }, { status: 401 });
    response.headers.set('Location', '/api/login');
    return response;
  }

  try {
    // Verify the token using your secret key
    jwt.verify(token, process.env.JWT_SECRET || 'mynameisahsanali');
    return NextResponse.next();
  } catch (error) {
    const response = NextResponse.json({ message: "Not authorized" }, { status: 401 });
    response.headers.set('Location', '/api/login');
    return response;
  }
}

// Specify the routes you want to protect
export const config = {
  matcher: [
    '/api/profile',
  ],
};
