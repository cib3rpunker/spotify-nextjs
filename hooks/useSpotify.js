import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

//import spotifyApi from "../lib/spotify";
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET
});

function UseSpotify() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      //* If refresh access token attempt fails, direct user to login...
      if(session.error === 'RefreshAccessTokenError' ) {
        signIn();
      }

      spotifyApi.setAccessToken(session.user.accessToken)
    }


  }, [session]);

  return spotifyApi;
}

export default UseSpotify;
