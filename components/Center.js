import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { shuffle } from "lodash";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import useSpotify from "../hooks/useSpotify";
import Link from "next/link";
import Songs from "./Songs";

const colors = [
  "from-blue-500",
  "from-red-500",
  "from-gray-500",
  "from-green-500",
];

function Center() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.error("Something went wrong!", err));
  }, [spotifyApi, playlistId]);

  console.log(playlist);

  return (
    <div className="flex-grow h-screen overflow-y-scroll">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-black space-x-3 text-white opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
          {!session ? (
            <Link href={"/login"}>
              <h2>Sign In</h2>
            </Link>
          ) : (
            <>
              <img
                onClick={signOut}
                className="rounded-full w-10 h-10"
                src={session?.user.image}
                alt=""
              />

              <h2 onClick={signOut} className="text-white">
                {session?.user.name}
              </h2>
              <ChevronDownIcon onClick={signOut} className="h-5 w-5" />
            </>
          )}
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b ${color} to-transparent h-80 text-white p-8`}
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
