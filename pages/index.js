import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Center from '../components/Center';
import Player from '../components/Player';
import Sidebar from '../components/Sidebar';

export default function Home() {
  return (
    // <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Spotify 2.0</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main className="flex">
        <Sidebar />
        <Center />
      </main>

      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
}

// 0️⃣2️⃣:4️⃣4️⃣:3️⃣8️⃣
export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session
    }
  }
}