import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === 'google') {
        try {
          const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
            name: profile.name,
            email: profile.email,
            googleId: profile.sub,
          });
          user.apiToken = data.token;
          user.id = data._id;
          return true;
        } catch (error) {
          console.error('Sign In Error:', error);
          return false;
        }
      }
      return false;
    },
    async jwt({ token, user }) {
      if (user) {
        token.apiToken = user.apiToken;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.apiToken;
      session.user.id = token.id;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };