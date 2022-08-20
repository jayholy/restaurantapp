import React, { useEffect, useState } from "react";
import { categories } from "../utils/data";
import { IoFastFood } from "react-icons/io5";
import { motion } from "framer-motion";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";
const MenuContainer = () => {
  const [filter, setFilter] = useState("rice");
  const [{ foodItems }, dispatch] = useStateValue();
  return (
    <section className="w-full  my-6" id="menu">
      <div className="w-full flex flex-col items-center justify-center ">
        <p
          className="text-2xl font-semibold text-headingColor before:absolute
           before:rounded-lg  transition-all ease-in-out duration-100 before:content
            before:w-16 before:h-1 before:-bottom-2 before:left-0 mr-auto before:bg-gradient-to-tr
             from-orange-400 to-orange-600 capitalize relative"
        >
          our hot dishes
        </p>
        <div className="w-full flex justify-start items-center lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
          {categories &&
            categories.map((category) => (
              <motion.div
                whileTap={{ scale: 0.8 }}
                onClick={() => setFilter(category.urlParamName)}
                key={category.id}
                className={`group ${
                  filter === category.urlParamName ? "bg-cartNumBg" : " bg-card"
                } w-20 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex justify-center items-center
             gap-3 flex-col  hover:bg-red-600 `}
              >
                <div
                  className={`w-10 h-10 rounded-full shadow-lg ${
                    filter === category.urlParamName
                      ? "bg-card"
                      : " bg-cartNumBg"
                  } group-hover:bg-white flex  items-center justify-center`}
                >
                  <IoFastFood
                    className={`${
                      filter === category.urlParamName
                        ? "text-textColor"
                        : " text-white"
                    } group-hover:text-textColor text-lg`}
                  />
                </div>
                <p
                  className={`text-sm ${
                    filter === category.urlParamName
                      ? "text-white"
                      : " text-textColor"
                  } group-hover:text-white`}
                >
                  {category.name}
                </p>
              </motion.div>
            ))}
        </div>
        <div className="w-full ">
          <RowContainer
            flag={false}
            data={foodItems?.filter((n) => n.category === filter)}
          />
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;
