import { ChevronDownIcon } from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react';
import { shuffle } from 'lodash';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState, playlistState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';
import { time } from '../lib/utils';
import Songs from './Songs';

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
];

function Center() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  //const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getPlaylist(playlistId)
        .then((data) => {
          //console.log(time, "🎹 ~ file: Center.jsx ~ line 36 ~ spotifyApi.getPlaylist ~ data", data);
          setPlaylist(data.body);
        })
        .catch((err) =>
          console.error( time, '🟥 ~ file: Center.js ~ line 36 ~ spotifyApi.getPlaylist ~ err: ', err )
        );
    }
  }, [spotifyApi, playlistId]);

  //! The below solution alternative solves the ISSUE [No token provided] but keeps throwing the following ERROR:
  //! client.js?f551:839 GET https://api.spotify.com/v1/playlists/37i9dQZF1DX37bXS7EGI3f 401
  //   useEffect(() => {
  //   spotifyApi.getPlaylist(playlistId).then(
  //     function (data) {
  //       console.log('Some information about this playlist', data.body);
  //       setPlaylist(data.body);
  //     },
  //     function (err) {
  //       console.log('Something went wrong!', err);
  //     }
  //   );
  // }, [spotifyApi, playlistId]);

  //console.log(time, "🎼 ~ file: Center.jsx ~ line 50 ~ Center ~ playlist:", playlist)

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8 ">
        <div
          className="flex item-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white"
          onClick={signOut}
          // onClick={() => {
          //   signOut();
          // }}
        >
          <img
            className="rounded-full w-10 h-10"
            src={session?.user.image}
            alt=""
          />

          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images?.[0]?.url}
          alt=""
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  );
}

export default Center;
