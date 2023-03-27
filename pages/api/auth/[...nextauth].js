import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import query from '../../../lib/db';
import { hashPassword } from '../../../lib/security.js';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name:'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: 'Username' },
                password: { label: 'Password', type: 'password', placeholder: 'Password' }
            },
            async authorize(credentials, req) {
                const u = credentials.username;
                const p = credentials.password;
                
                let user = null;

                if (!u || !p){
                    return null;
                }
            
                try {
                    const sql = "SELECT password FROM users WHERE username = ?";
                    const values = [u];

                    const passRow = await query(sql, values);
                    const pass = passRow[0].password;

                    const bcrypt = require('bcrypt');
                    const comp = await bcrypt.compare(p, pass);

                    if (!comp){
                        return null;
                    }

                    user = {
                        name: u,
                        id: 1,
                    };
            
                } catch (e) {
                    return null;
                }

                return user;
            }
        })
    ],
    pages: {
        signIn: '/login'
    },
    secret: 'ryan',
    callbacks: {
        async session({ session, user, token }) {
            session.accessToken = token.accessToken;
            session.user.id = token.id;

            return session;
        },
        async signIn({ user, account, profile, email, credentials }) {
            const allowed = true;

            return allowed;
        },
        async redirect({ url, baseUrl }){
            if (url.startsWith('/')){
                return `${baseUrl}${url}`;
            } else if (new URL(url).origin === baseUrl){
                return url;
            }
            return baseUrl;
        },
        async jwt({ token, user, account }){
            if (account){
                token.accessToken = account.access_token;
            }
            return token;
        }
    }
}

export default NextAuth(authOptions);