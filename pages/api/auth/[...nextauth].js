import log from 'fancy-log';
import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import spotifyApi, { LOGIN_URL } from '../../../lib/spotify';

async function refreshAccessToken(token) {
  try {
    console.timeStamp('timeStamp');

    log(
      '\r\n🚀 ~ file: [...nextauth].js ~ line 8 ~ refreshAccessToken ~ token: ',
      token
    );

    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    log(
      '\r\n🚀 REFRESHED TOKEN IS ~ file: [...nextauth].js ~ line 11 ~ refreshedToken ',
      refreshedToken
    );

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now + refreshedToken.expires_in * 1000, //* = 1 hour as 3600 returns from spotify API
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    log('\r\n🚀 ', error);

    return {
      ...token,
      error: '🚀 RegreshAccessTokenError',
    };
  }
}

export default NextAuth({
  //* Configure one or more auth providesrs
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    //* nextauth token rotation
    //* https://next-auth.js.org/tutorials/refresh-token-rotation
    //* Authentication function, we created the JWT token
    async jwt({ token, account, user }) {
      log(
        '\r\n🚀 ~ file: [...nextauth].js ~ line 54 ~ callbacks ~ jwt ~ token: ',
        token
      );

      //* initial sign in were we get our first token
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000, //* we are handling expiry times in Milliseconds hence * 1000
        };
      }

      //* If your token is still valid
      //* Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpiress) {
        log(
          '\r\n🚀 EXISTING ACCESS TOKEN IS VALID ~ file: [...nextauth].js ~ line 71 ~ callbacks ~ jwt ~ token.accessTokenExpiress: ',
          token.accessTokenExpiress
        );

        return token;
      }

      //* Access token has expired, so we need to refresh it.
      log(
        '\r\n🚀 ACCES TOKEN HAS EXPIRED, REFRESHING... ~ file: [...nextauth].js ~ line 85 ~ callbacks ~ jwt ~ '
      );
      return await refreshAccessToken(token);
    },

    //* we connected it to what the client can see in the session
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    },
  },
});
