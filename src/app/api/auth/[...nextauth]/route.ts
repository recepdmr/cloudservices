import NextAuth, { NextAuthOptions, Profile } from 'next-auth';
import Google from 'next-auth/providers/google';

const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_APP_CLIENT_SECRET as string,
        })
    ],
    callbacks: {
        async signIn({ account, profile }) {
            if (account && profile && account.provider === Google.name.toLowerCase()) {
                const googleProfile: Profile & { email_verified: boolean } = (profile as never)
                return (googleProfile.email_verified && googleProfile.email && googleProfile.email.endsWith("@gmail.com")) ?? true
            }
            return true
        },
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.id_token
            }
            return token
        },
        async session({ session, token }) {
            const newSession = {
                ...session,
                accessToken: token.accessToken,
                tenantId: process.env.NEXT_PUBLIC_TENANT_ID
            }
            return newSession;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

