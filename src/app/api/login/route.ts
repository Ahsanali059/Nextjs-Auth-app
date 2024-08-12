import User from '../../../models/User'; // Ensure this path is correct relative to route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connect } from '@/config/dbConfig';
import cookie from 'cookie';

// First connect to the database
connect();

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return new NextResponse(JSON.stringify({ message: "Please provide all required fields" }), { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return new NextResponse(JSON.stringify({ message: "User not found" }), { status: 404 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return new NextResponse(JSON.stringify({ message: "Invalid credentials" }), { status: 401 });
        }

        // Generate a JWT token for the user
        const token = jwt.sign({ userId: user._id }, "mynameisahsanali", { expiresIn: '1h' });

        // Set token in cookies
        const response = new NextResponse(JSON.stringify({ message: "Logged in successfully", user }), { status: 200 });
        response.headers.set('Set-Cookie', cookie.serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60, // 1 hour
            sameSite: 'strict',
            path: '/'
        }));

        return response;
    } catch (err) {
        console.error("Something went wrong in the login controller: ", err);
        return new NextResponse(JSON.stringify({ message: "Server error" }), { status: 500 });
    }
}
