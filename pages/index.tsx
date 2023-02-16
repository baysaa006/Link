import Head from "next/head";
import router from "next/router";
import React, { useState } from "react";
import Image from "next/image";
import logo from "../public/favicon.svg";
import Login from "../component/registerPages/signin";
import { useRef } from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import AddLink from "../component/profile/links/addLink";
import Hero from "../component/landingPage/hero";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}
function ChildrenComponent(id: any) {
  const sectionName = [""];
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 400);
  return (
    <section
      id={``}
      className="snap-center h-screen flex justify-center  items-center"
    >
      <div className="w-full px-10" ref={ref}>
        {id.id > 1 && <motion.h2 style={{ y }}>{2}</motion.h2>}
        {id.id === 1 && (
          <section className="flex flex-col w-full items-center  h-screen justify-around ">
            <div className="flex justify-center flex-col  gap-5 w-full items-center">
              <h1 className="text-6xl text-slate-100  font-semibold">
                Emprove your Community
              </h1>
              <h3 className="text-xl text-slate-400  ">
                Community success together through collaboration
              </h3>
              <button onClick={()=>router.push("/singup")} className="bg-slate-700 px-5 rounded-lg py-2">
                Create Link
              </button>
            </div>

            <div>11</div>
          </section>
        )}
        {id.id === 2 && 1}
        {id.id === 3 && 2}
        {id.id === 4 && 3}
        {id.id === 5 && 4}
      </div>
    </section>
  );
}
function Home() {
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
      <section className="h-screen">
        {[1, 2, 3, 4, 5].map((image, index) => (
          <ChildrenComponent key={index} id={image} />
        ))}
        <div />
        <motion.div
          className="fixed left-0 bottom-3 right-0 h-2 rounded-full bg-white"
          style={{ scaleX }}
        />
      </section>
    </>
  );
}

export default Home;
