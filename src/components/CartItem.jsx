import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TiMinus } from "react-icons/ti";
import { TiPlus } from "react-icons/ti";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { fetchCart } from "../utils/fetchLocalStorageData";
let items = [];

const CartItem = ({ item,setFlag,flag }) => {
  const [qty, setQty] = useState(item.qty);

  const [{ cartItems }, dispatch] = useStateValue();
  const [items, setItems] = useState([]);
  const cartDispatch = () => {
    localStorage.setItem("cartItems", JSON.stringify(items));
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
  };

  const updateQty = (action, id) => {
    if (action == "add") {
      setQty(qty + 1);
      cartItems.map((item) => {
        if (item.id === id) {
          item.qty += 1;
          setFlag(flag +1)
        }
      });
      cartDispatch();
    } else {
      if (qty == 1) {
        items = cartItems.filter((item) => item.id !== id);
        setFlag(flag + 1);
        cartDispatch();
      } else {
        setQty(qty - 1);
        cartItems.map((item) => {
          if (item.id === id) {
            item.qty -= 1;
            setFlag(flag + 1);
          }
        });
        cartDispatch();
      }
    }
  };
  useEffect(() => {
    setItems(cartItems);
  }, [qty]);

  return (
    <div className="w-full px-1 py-2 rounded-lg bg-cartItem flex items-center gap2 ">
      <img
        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
        src={item?.imageURL}
        alt=""
      />
      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50"> {item?.title}</p>

        <p className="text-sm text-gray-300 font-semibold block">
          ₵ {(item?.price * qty).toFixed(2)}
        </p>
      </div>
      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div
          onClick={() => updateQty("remove", item?.id)}
          whileTap={{ scale: 0.75 }}
        >
          <TiMinus className="text-gray-50" />
        </motion.div>
        <p className="w-5 h-5 rounded-sm flex justify-center items-center text-gray-50 bg-cartBg">
          {qty}
        </p>
        <motion.div
          onClick={() => updateQty("add", item?.id)}
          whileTap={{ scale: 0.75 }}
        >
          <TiPlus className="text-gray-50" />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
