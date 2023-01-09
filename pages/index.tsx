import Head from "next/head";
import router from "next/router";
import React, { useState } from "react";
import Image from "next/image";
import logo from "../public/favicon.svg";
import Signup from "../component/signup";
import Login from "../component/login";

function Home() {
  const [active, setActive] = useState(0);
  return (
    <>
      <Head>
        <title>Chatly</title>
      </Head>
      <div className="h-screen">
        <div className="h-screen  flex flex-col items-center bg-opacity-5 mix-blend-hard-light rounded-2xl border-2 w-full p-4">
          <div className="w-full text-xl font-extrabold rounded-2xl border-2 h-max  items-center flex flex-row justify-around p-3">
            <a
              className={`font-extrabold  flex  cursor-pointer  rounded-2xl p-2 ${
                active === 0
                  ? "text-lime-200  animate-pulse opacity-100 shadow-md shadow-lime-200 "
                  : ""
              }`}
              onClick={() => setActive(0)}
            >
              {" "}
              <Image height={25} src={logo} alt="logo" />
              <h1>Chatly</h1>
            </a>
            <ul className="flex flex-row gap-[2vw]">
              <li
                className={`font-extrabold  cursor-pointer  rounded-2xl p-2 ${
                  active === 1
                    ? "text-lime-200  animate-pulse opacity-100 shadow-md shadow-lime-200"
                    : ""
                }`}
                onClick={() => setActive(1)}
              >
                <a>What is Chatly ?</a>
              </li>
              <li
                className={`font-extrabold  cursor-pointer   rounded-2xl p-2  ${
                  active === 2
                    ? "text-lime-200 animate-pulse opacity-100 shadow-md shadow-lime-200 "
                    : ""
                }`}
                onClick={() => setActive(2)}
              >
                <a>How to ?</a>
              </li>
              <li
                className={`font-extrabold  cursor-pointer   rounded-2xl p-2  ${
                  active === 3
                    ? "text-lime-200  animate-pulse opacity-100 shadow-md shadow-lime-200 "
                    : ""
                }`}
                onClick={() => setActive(3)}
              >
                <a>How much?</a>
              </li>
              <li
                className={`font-extrabold  text-xl cursor-pointer   rounded-2xl p-2  ${
                  active === 4
                    ? "text-lime-200  animate-pulse opacity-100 shadow-md shadow-lime-200 "
                    : ""
                }`}
                onClick={() => setActive(4)}
              >
                <a>?</a>
              </li>
            </ul>
            <div className="flex flex-row gap-[1vw] ">
              <button
                onClick={() => setActive(5)}
                className="px-4 py-1 border-2 hover:text-lime-200 rounded-2xl "
              >
                Log in
              </button>{" "}
              <button
                onClick={() => setActive(6)}
                className="px-4 py-1 text-center  hover:text-lime-200 border-2 rounded-2xl "
              >
                Sign up
              </button>{" "}
            </div>
          </div>
          {active === 0 && (
            <div className="w-full rounded-2xl border-2 h-screen  shadow-lg shadow-lime-200 p-4 mt-4">
              0
            </div>
          )}
          {active === 1 && (
            <div className="w-full rounded-2xl  border-2 shadow-lg shadow-lime-200  h-screen p-4 mt-4">
              1
            </div>
          )}
          {active === 2 && (
            <div className="w-full rounded-2xl  border-2 shadow-lg shadow-lime-200  h-screen p-4 mt-4">
              2
            </div>
          )}
          {active === 3 && (
            <div className="w-full rounded-2xl border-2 shadow-lg shadow-lime-200  h-screen p-4 mt-4">
              3
            </div>
          )}
          {active === 4 && (
            <div className="w-full rounded-2xl border-2  items-center justify-center shadow-lg shadow-lime-200  h-screen p-4 mt-4">
              4
            </div>
          )}
          {active === 5 && (
            <div className="w-full rounded-2xl border-2 shadow-lg shadow-lime-200  h-screen p-4 mt-4">
              <Login />
            </div>
          )}
          {active === 6 && (
            <div className="w-full rounded-2xl border-2 shadow-lg shadow-lime-200  h-screen p-4 mt-4">
              <Signup />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
