import { NextRequest,NextResponse } from "next/server";
import cookie from "cookie";
import axios from "axios";




//logout functionality 


export async function GET() {

    //delete a token from cookie and redirect to login 
    const response = new NextResponse(null, {
        status: 302,
        headers: {
            Location: '/login',
        },
    });

    response.headers.set('Set-Cookie', cookie.serialize('token', '', {
        expires: new Date(0),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
    }));

    return response;

}
