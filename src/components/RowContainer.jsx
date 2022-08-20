import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdShoppingBasket } from "react-icons/md";
import { useEffect } from "react";
import { useRef } from "react";
import NotFound from "../img/NotFound.svg";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();
    const [items, setItems] = useState([]);

    const [{ cartItems }, dispatch] = useStateValue();

    const addtocart = () => {
      dispatch({
        type: actionType.SET_CARTITEMS,
        cartItems: items,
      });
      localStorage.setItem("cartItems", JSON.stringify(items));
    };

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);
  
  useEffect (() =>
  {
    addtocart()
  }, [items])
  return (
    <div
      ref={rowContainer}
      className={`w-full   flex items-center gap-3 scroll-smooth  my-12 ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      } `}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?.id}
            className="md:w-340 min-w-[300px] md:min-w-[340px]
             w-300 h-[220px] drop-shadow-lg bg-cardOverlay  flex flex-col items-center justify-center rounded-lg p-2  my-12  backdrop-blur-lg  "
          >
            <div className="flex items-center justify-between w-full">
              <motion.div
                className="w-40 h-40 drop-shadow-2xl cursor-pointer -mt-7"
                whileHover={{ scale: 1.3 }}
              >
                <img
                  className="w-full object-contain h-full "
                  src={item?.imageURL}
                  alt=""
                />
              </motion.div>

              <motion.div
                whileTap={{ scale: 0.75 }}
                onClick={() => setItems([...cartItems, item])} 
                className="w-8 h-8 rounded-full cursor-pointer 
           hover:shadow-md bg-red-600 flex justify-center items-center "
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>
            <div className="w-full flex items-end  flex-col  justify-end">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item?.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {item?.calories} Calories
              </p>
              <div className="flex items-center gap-8">
                <p className=" text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">₵</span> {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex w-full flex-col items-center justify-center">
          <img src={NotFound} className="h-340" />
          <p className="text-xl font-semibold text-headingColor my-2">
            Not Available
          </p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;
