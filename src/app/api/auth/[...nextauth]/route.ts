import prisma from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';

import GithubProvider from 'next-auth/providers/github';
import  GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import { signInEmailWithPassword } from '@/auth/actions/auth-actions';

// authOptions => to be able to use this reference elsewhere in the application
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID ?? '',
                clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        }),
        GithubProvider({
         
                clientId: process.env.GITHUB_ID ?? '',
                clientSecret: process.env.GITHUB_SECRET ?? '',

        }),
        CredentialsProvider({
                  // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "email", placeholder: "user@google.com" },
                password: { label: "Password", type: "password", placeholder: '************' }
            },
            async authorize(credentials, req) {
            // Add logic here to look up the user from the credentials supplied
            console.log('credentials', credentials)
            const user = await signInEmailWithPassword(credentials!.email, credentials!.password!)

            if (user) {
                // Any object returned will be saved in `user` property of the JWT
                return user;
            } 
            return null;
            }
        }),
    ],
   
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async signIn({user, account, profile, email, credentials}){
           // console.log(user);
            return true;
        },
        async jwt({token, user, profile, account}){
            //console.log('token',{ token});
            const dbUser = await prisma.user.findUnique({where: {email: token.email ?? 'no-email'}});
            if (dbUser?.isActive === false){
                throw Error('User not active')
            }
            token.roles = dbUser?.roles ?? ['no-roles'];
            token.id = dbUser?.id ?? 'no-uuid';
            console.log('token',{ token});
            return token;
        },
        async session({token, user, session}){
            if(session && session.user){
                session.user.roles = token.roles;
                session.user.id = token.id;
            }
            return session;
        } 
    }

}

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};