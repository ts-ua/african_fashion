import NextAuth, { AuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from 'bcryptjs';
import { Adapter } from "next-auth/adapters";

interface ExtendedUser extends User {
    id: string;
    phone: string | null;
    role: string;
}

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    session: {
        strategy: 'jwt'
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            httpOptions: {
                timeout: 10000,
            },

        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                useremail: {
                    label: 'User Email',
                    type: 'text',
                    placeholder: 'Your User Email',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                },
            },
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: { email: credentials?.useremail },
                });

                if (!user) throw new Error('User email or password is incorrect');

                if (!credentials?.password) {
                    throw new Error('Please provide your password');
                }

                if (!user.password) {
                    throw new Error('User email or password is incorrect');
                }

                const isPasswordCorrect = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isPasswordCorrect) {
                    throw new Error('User email or password is incorrect');
                }

                const { password, ...userWithoutPassword } = user;

                return userWithoutPassword;
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user as User;
            }
            return token;
        },
        async session({ session, token }) {

            if (token) {
                session.user = {
                    ...(session.user as ExtendedUser),
                    id: (token.user as ExtendedUser)?.id,
                } as ExtendedUser;

                const userFromDb = await prisma.user.findUnique({
                    where: { id: (session.user as ExtendedUser).id },
                });

                if (userFromDb) {
                    session.user.name = userFromDb.name;
                    session.user.email = userFromDb.email;
                    session.user.image = userFromDb.image;
                    (session.user as ExtendedUser).phone = userFromDb.phone;
                    (session.user as ExtendedUser).role = userFromDb.role;
                }
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };