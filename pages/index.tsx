import Head from "next/head";
import router from "next/router";
import React, { useState } from "react";
import Image from "next/image";
import logo from "../public/favicon.svg";
import Signup from "../component/signup";
import Login from "../component/login";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}
function Component({ id }: { id: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section className="snap-center h-screen flex justify-center  items-center">
      <div ref={ref}>
        <div className="">1</div>
      </div>
      <motion.h2 style={{ y }}>{`#00${id}`}</motion.h2>
    </section>
  );
}
function Home() {
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <>
      <Head>
        <title>Chatly</title>
      </Head>
      <nav
        style={{ mask: " linear-gradient(#0000 50%, black 85%);" }}
        className="fixed flex flex-col py-8 px-2 backdrop-blur-lg mask "
      >
        <a>
          <h1>Chatly</h1>
        </a>
      </nav>
      <section className="h-[100dvh]">
        {" "}
        <svg
          className="fixed sm:top-20 top-16 left-5 rotate-90"
          id="progress"
          width="100"
          height="100"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="30"
            pathLength="1"
            className="bg-white  stroke-[15%]"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="30"
            pathLength="1"
            className="fixed top-1/2  bg-white stroke-white stroke-[15%]"
            style={{ pathLength: scaleX }}
          />
        </svg>
        {[1, 2, 3, 4, 5].map((image, index) => (
          <Component key={index} id={image} />
        ))}
        <motion.div className="progress" style={{ scaleX }} />
      </section>
    </>
  );
}

export default Home;
