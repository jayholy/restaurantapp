import React, { useRef, useState } from "react";
import HomeContainer from "./HomeContainer";
import { motion } from "framer-motion";
import { MdChevronLeft ,MdChevronRight} from 'react-icons/md'
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";
import { useEffect } from "react";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";


const MainContainer = () => {
const [{ foodItems , cartShow}, dispatch] = useStateValue();
const [scrollValue, setScrollValue] = useState(0)
useEffect(() => {},[scrollValue,cartShow])

  return (
    <div className="flex w-full h-auto flex-col items-center justify-center ">
      <HomeContainer />
      <section className="w-full  my-6">
        <div className="w-full flex items-center justify-between ">
          <p
            className="text-2xl font-semibold text-headingColor before:absolute
           before:rounded-lg  transition-all ease-in-out duration-100 before:content
            before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 capitalize relative"
          >
            our fresh & healthy fruits
          </p>
          <div className="hidden md:flex gap-3 items-center">
            <motion.div
              onClick={() => setScrollValue(-1300)}
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500
             cursor-pointer  hover:shadow-lg flex items-center justify-center"
            >
              <MdChevronLeft className=" text-lg text-white" />
            </motion.div>
            <motion.div
              onClick={() => setScrollValue(1300)}
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500
             cursor-pointer  hover:shadow-lg flex items-center justify-center"
            >
              <MdChevronRight className=" text-lg text-white" />
            </motion.div>
          </div>
        </div>
        <RowContainer
        scrollValue ={scrollValue}
          flag={true}
          data={foodItems?.filter((n) => n.category === "chicken")}
        />
      </section>
<MenuContainer/>
{cartShow &&(
  <CartContainer/>
)}
      
    </div>
  );
};

export default MainContainer;
