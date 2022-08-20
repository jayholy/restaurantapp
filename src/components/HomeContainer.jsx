import React from "react";
import Delivery from "../img/delivery.png";
import HeroBg from "../img/heroBg.png";
import { heroData } from "../utils/data";


const HomeContainer = () => {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full  "
      id="home"
    >
      <div className=" py-2  gap-6 flex items-start justify-center flex-col md:items-start flex-1">
        <div className="flex items-center justify-center gap-2 bg-orange-100 py-1 px-4 rounded-full ">
          <p className="text-base text-orange-400 font-semibold">
            Bike Delivery
          </p>
          <div className="w-6 h-6 drop-shadow-xl rounded-full bg-white overflow-hidden">
            <img className="w-full h-full " src={Delivery} alt="delivery" />
          </div>
        </div>
        <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
          The Fastest Delivery in{" "}
          <span className="text-[3rem] text-orange-600 lg:text-[5rem]">
            Your City
          </span>
        </p>
        <p className="text-base text-textColor text-center  md:text-left md:w-[80%]">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
          doloribus dolorem soluta, corrupti repellat reprehenderit? Rerum optio
          nostrum quae, sed tenetur, assumenda perspiciatis, vero sapiente
          eveniet consectetur animi veritatis blanditiis.
        </p>
        <button
          type="button"
          className="bg-gradient-to-br from-orange-400 to-orange-500 md:w-auto w-full px-4 py-2 rounded-lg hover:shadow-lg ease-in-out duration-100 transition-all"
        >
          Order Now
        </button>
      </div>
      <div className="py-2 flex-1 flex items-center relative ">
        <img
          className="lg:h-685 h-420  w-full lg:w-auto ml-auto "
          src={HeroBg}
          alt=""
        />
        <div className="w-full lg:px-32 gap-3 flex-wrap h-full absolute top-0 left-0  py-4 flex items-center justify-center ">
          {heroData &&
            heroData.map((n) => (
              <div key={n.id} className=" lg:w-190  drop-shadow-lg bg-cardOverlay flex-col backdrop-blur-md rounded-3xl items-center justify-center flex p-4">
                <img src={n.imageSrc} alt="" className="lg:w-40 w-20 -mt-10 lg:-mt-20 " />
                <p className="lg:text-xl text-base mt-2 lg:mt-4 text-textColor font-semibold">
                 {n.name}
                </p>
                <p className="lg:text-sm text-[12px]  text-lighttextGray lg:my-3 my-1">
                  {n.decp}
                </p>
                <p className="lg:text-sm text-[10px] font-semibold text-headingColor">
                  <span className="text-xs text-red-500">$</span> {n.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
