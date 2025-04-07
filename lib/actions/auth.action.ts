'use server';

import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7;

export async function signUp (params: SignUpParams) {
    const {uid, name, email} = params;

    try {
        // check if user exists in db 
        const userRecord = await db.collection("users").doc(uid).get();
        
        if(userRecord.exists) 
            return {
                success: false, 
                message: "User already exists"
            }
        
            // save user to db
        await db.collection("users").doc(uid).set({
            name,
            email,
        });

        return {
            success : true,
            message : "Account created successfully",
        }

    } catch (e: any) {
        console.error("Error creating a user", e);

        if(e.code === "auth/email-alredy-exists") {
            return{
                success: false,
                message: "This Email is already in use"   
            }
        }

        return {
            success: false,
            message: "Failed to create account"
        }
    }
}

export async function signIn (params: SignInParams) {
    const  { email, idToken } = params;


    try {
        const useRecord = await auth.getUserByEmail(email);
        if(!useRecord) {
            return {
                success: false,
                message: "User not found"
            }
        }

        await setSessionCookie(idToken);

    } catch (e: any) {
        console.log(e);
        
        return {
            success: false,
            message: "Failed to Log in"
        }
    }
}


export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies()
  
  const setSessionCookie = await auth.createSessionCookie(idToken, {expiresIn: ONE_WEEK * 1000})

  cookieStore.set("session", setSessionCookie, {
        maxAge : ONE_WEEK,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",

  })
}