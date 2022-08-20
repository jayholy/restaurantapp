import React, {useState} from "react";
import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { HiShoppingCart } from "react-icons/hi";
import { MdAdd, MdLogout } from "react-icons/md";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false)

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else{setIsMenu(!isMenu); }
  };
  const logout =() => {
    setIsMenu(!isMenu)
    localStorage.clear()
    dispatch({
      type :actionType.SET_USER,
      user :null
    });
  }

  const showCart= () =>{
     dispatch({
       type: actionType.SET_CART_SHOW,
       cartShow: !cartShow,
     });
  }
  return (
    <header className="fixed z-50 bg-primary  p-3 px-4 md:p-6 md:px-16 w-screen">
      {/*desktop */}
      <div className=" hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2 ">
          <img src={Logo} className="w-8 object-cover " alt="" />
          <p className="text-headingColor text-x1 font-bold">City</p>
        </Link>
        <div className="flex items-center gap-20">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className=" flex items-center  gap-10  "
          >
            <li className="text-xl text-textColor cursor-pointer hover:text-headingColor hover:scale-150 duration-100   transition-all ease-in-out">
              Home
            </li>
            <li className="text-xl text-textColor cursor-pointer hover:text-headingColor duration-100 hover:scale-150 transition-all ease-in-out">
              Menu
            </li>
            <li className="text-xl text-textColor cursor-pointer hover:text-headingColor duration-100 hover:scale-150 transition-all ease-in-out">
              Service
            </li>
            <li className="text-xl text-textColor cursor-pointer hover:text-headingColor duration-100 hover:scale-150 transition-all ease-in-out">
              About Us
            </li>
          </motion.ul>
          <div
            className="relative flex items-center justify-center"
            onClick={showCart}
          >
            <HiShoppingCart className="text-textColor ml-8 text-2xl cursor-pointer" />
            {cartItems && cartItems.length > 0 && (
              <div className="w-5 h-5 flex items-center justify-center absolute -top-2.5 -right-3 rounded-full bg-cartNumBg">
                <p className="text-xs  text-white font-semibold">
                  {" "}
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.5 }}
              src={user ? user.photoURL : Avatar}
              className="w-10 min-w-[40px] min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              alt=" userprofile"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1.1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-2 "
              >
                {user && user.email === "twitwiandy@gmail.com" && (
                  <Link to={"/createItem"}>
                    <p
                      onClick={() => setIsMenu(false)}
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base"
                    >
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}
                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={logout}
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/*mobile */}

      <div className="flex items-center justify-between md:hidden w-full h-full ">
        <div
          className="relative flex items-center justify-center "
          onClick={showCart}
        >
          <HiShoppingCart className="text-textColor ml-8 text-2xl cursor-pointer" />
          {cartItems && cartItems.length > 0 && (
            <div className="w-5 h-5 flex items-center justify-center absolute -top-2.5 -right-3 rounded-full bg-cartNumBg">
              <p className="text-xs  text-white font-semibold">
                {" "}
                {cartItems.length}
              </p>
            </div>
          )}
        </div>

        <Link to={"/"} className="flex items-center gap-2 ">
          <img src={Logo} className="w-8 object-cover " alt="" />
          <p className="text-headingColor text-x1 font-bold">City</p>
        </Link>
        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.5 }}
            src={user ? user.photoURL : Avatar}
            className="w-10 min-w-[40px] min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
            alt=" userprofile"
            onClick={login}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1.1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-2 "
            >
              {user && user.email === "twitwiandy@gmail.com" && (
                <Link to={"/createItem"}>
                  <p
                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base"
                    onClick={() => setIsMenu(false)}
                  >
                    New Item <MdAdd />
                  </p>
                </Link>
              )}
              <ul className=" flex  flex-col   ">
                <li
                  onClick={() => setIsMenu(false)}
                  className="text-base  px-4 py-2 hover:bg-slate-100 text-textColor cursor-pointer hover:text-headingColor hover:scale-150 duration-100   transition-all ease-in-out"
                >
                  Home
                </li>
                <li
                  onClick={() => setIsMenu(false)}
                  className="text-base  px-4 py-2 hover:bg-slate-100 text-textColor cursor-pointer hover:text-headingColor duration-100 hover:scale-150 transition-all ease-in-out"
                >
                  Menu
                </li>
                <li
                  onClick={() => setIsMenu(false)}
                  className="text-base  px-4 py-2 hover:bg-slate-100 text-textColor cursor-pointer hover:text-headingColor duration-100 hover:scale-150 transition-all ease-in-out"
                >
                  Service
                </li>
                <li
                  onClick={() => setIsMenu(false)}
                  className="text-base  px-4 py-2 hover:bg-slate-100 text-textColor cursor-pointer hover:text-headingColor duration-100 hover:scale-150 transition-all ease-in-out"
                >
                  About Us
                </li>
              </ul>

              <p
                className="m-1 p-1 rounded-md shadow-md justify-center bg-gray-200 flex items-center gap-3 cursor-pointer hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base"
                onClick={logout}
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
