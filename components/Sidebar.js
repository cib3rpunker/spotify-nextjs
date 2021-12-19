import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  HeartIcon,
  PlusCircleIcon,
  RssIcon,
  LoginIcon,
} from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react';
// import Login from '../pages/login';

//import './log-timestamp'
//import 'log-timestamp';
//import log from 'fancy-log';

function Sidebar() {
  const { data: session, status } = useSession();

  //console.timeStamp('timeStamp');
  console.log(
    '\r\n🚀 ~ file: Sidebar.js ~ line 22 ~ Sidebar ~ session: ',
    session
  );
  console.log(
    '\r\n🚀 ~ file: Sidebar.js ~ line 26 ~ Sidebar ~ status: ',
    status
  );

  //log("\r\n 🚀 ~ file: Sidebar.js ~ line 15 ~ Sidebar ~ session", session)

  return (
    <div className="text-gray-500 p-5 text-sm border-r border-gray-900">
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <LoginIcon
            className="h-5 w-5"
            onClick={() => {
              signOut();
            }}
          />
          <p>Logout</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Your episodes</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900" />

        {/* Playlist */}
        <p className="cursor-pointer hover:text-white">Playlist name...</p>
        <p className="cursor-pointer hover:text-white">Playlist name...</p>
        <p className="cursor-pointer hover:text-white">Playlist name...</p>
      </div>
    </div>
  );
}

export default Sidebar;
