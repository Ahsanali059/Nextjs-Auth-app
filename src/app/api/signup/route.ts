import User from '../../../models/User'; 
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connect } from '@/config/dbConfig';

//First Connect the database 
connect();

// sign up API
export async function POST(req: NextRequest, res: NextResponse) {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
        return new NextResponse(JSON.stringify({ message: "Please provide all required fields" }), { status: 400 });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new NextResponse(JSON.stringify({ message: "Email already exists" }), { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        console.log("register user "+user);
        

        return new NextResponse(JSON.stringify({ message: "User registered successfully", user }), { status: 201 });
    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({ message: "Server error" }), { status: 500 });
    }
}
