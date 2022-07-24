import React from "react";
import { getProviders, signIn } from "next-auth/react";

function Login({ providers }) {
  return (
    <div className="bg-black items-center justify-center w-full min-h-screen flex flex-col">
      <img
        src="https://i.imgur.com/fPuEa9V.png"
        className="w-52 mb-5"
        alt="spotify_logo"
      />

      {Object.values(providers).map((provider) => (
        <div key={provider.id}>
          <button
            className="text-white p-5 bg-green-500 rounded-3xl"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
