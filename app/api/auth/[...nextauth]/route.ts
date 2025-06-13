import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import { AuthService } from "@/app/lib/services/auth.service";

const handler = NextAuth({
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER,
      authorization: {
        params: {
          prompt: "login",
          response_type: "code",
          scope: "openid profile email",
        },
      },
    }),
  ],
  pages: {
    signIn: '/(auth)/login',
    error: '/(auth)/login',
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const authService = AuthService.getInstance();
        const role = await authService.getUserRole(token.email as string);
        
        session.user = {
          ...session.user,
          id: token.sub as string,
          role: role,
        };
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };
