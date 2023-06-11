import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import axios from "axios";
import jwt from "jsonwebtoken";
export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {},
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const credits = {
          email: credentials.email,
          password: credentials.password,
        };

        try {
          const user = await axios({
            url: process.env.API_ROUTE + "/auth/login",
            method: "post",
            data: credits,
          });

          if (user.status === 200 && user) {
            // Any object returned will be saved in `user` property of the JWT

            return {
              token: user.data.token,
              user: user.data.data,
            };
          }
        } catch (error) {
          throw new Error(
            "Invalid credientials. Please check email & password."
          );
        }
      },
    }),
  ],
  session: {
    jwt: true,
    // maxAge: process.env.SESSION_EXPIRES_IN * 1,
    maxAge: process.env.SESSION_EXPIRES_IN * 24 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, user }) {
      // return { ...token, token: token.user.token };
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      // actually the user data is coming in as token so we have to modify it

      session.token = token.token;
      session.user = token.user;

      session.token_detail = jwt.decode(token.token);

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
