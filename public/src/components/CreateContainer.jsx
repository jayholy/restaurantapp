import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import { categories } from "../utils/data";
import Loader from "./Loader";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase.config";
import { getAllFoodItems, saveItem } from "../utils/firbaseFuntions";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [imageAsset, setImageAsset] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [{}, dispatch] = useStateValue();

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref (storage , `Images/${Date.now()}-${imageFile.name}`)
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on('state_changed', (snapshot) => {
const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
    }, (error) => {
      console.log(error);
      setFields(true)
      setMsg("error : try again ⚠️");
      setAlertStatus('danger')
      setTimeout(() =>{
        setFields(false)
        setIsLoading(false)
      },4000)
    } ,() =>{
      getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
        setImageAsset(downloadURL)
        setIsLoading(false)
        setFields(true)
        setMsg("Image Uploaded succesfully ✔️");
        setAlertStatus('success')
        setTimeout(() =>{
          setFields(false)
        },4000)
      })
    })
  };
  const deleteImage = () => {
    setIsLoading(true)
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() =>{
      setImageAsset(null)
      setIsLoading(false)
      setFields(true)
      setMsg("Image deleted succesfully ✔️");
      setAlertStatus('success')
      setTimeout(() =>{
        setFields(false)
      }, 4000)
      
    })
  };
  const saveDetails = () => {
    setIsLoading(true)
    try{
        if(!title || !calories || !imageAsset || !price ||!category){
           setFields(true);
           setMsg("Required fields cannot be empty ⚠️");
           setAlertStatus("danger");
           setTimeout(() => {
             setFields(false);
             setIsLoading(false);
           }, 4000);


        }else{
          const data = {
            id: `${Date.now()}`,
            title : title,
            imageURL :imageAsset,
            category : category,
            calories : calories,
            qty : 1,
            price :price
          }
          saveItem(data)
          setIsLoading(false)
           setFields(true);
           setMsg("Data uploaded succesfully ✔️");
             clearData();

           setAlertStatus("success");
           setTimeout(() => {
             setFields(false);
           }, 4000);
        }
    } catch (error){
      console.log(error)
      setFields(true);
      setMsg("error : try again ⚠️");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);

    }

    fetchData();
  };
  const clearData = () => {
    setTitle("");
      setImageAsset(null);
      setCalories("");
      setPrice("");
      setCalories("");
    
  };
    const fetchData = async () => {
      await getAllFoodItems().then((data) => {
        dispatch({
          type: actionType.SET_FOOD_ITEMS,
          foodItems: data,
        });
      });
    };

  return (
    <div className="w-full flex min-h-screen  items-center justify-center ">
      <div className="w-[90%] md:w-[75%] border border-gray-400 gap-4 flex flex-col items-center justify-center rounded-lg p-4">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-lg font-semibold text-center ${
              alertStatus === "danger"
                ? "bg-red-800 text-red-900"
                : "bg-emerald-400 text-emerald-800"
            } `}
          >
            {" "}
            {msg}
          </motion.p>
        )}
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give me a title..."
            className="w-full h-full outline-none border-none placeholder:text-gray-300 text-textColor  text-lg font-semibold bg-transparent"
            type="text"
          />
        </div>
        <div className="w-full">
          <select
            className="outline-none w-full text-base border-b-2 border-gray-200 cursor-pointer rounded-md p2"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="other" className="bg-white">
              Select Category
            </option>
            {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  value={item.urlParamName}
                  className="border-0 outline-none capitalize text-headingColor bg-white text-base"
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        <div className="w-full group flex items-center justify-center flex-col border-2 border-dotted border-gray-300 h-225 md:h-240 cursor-pointer rounded-lg">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex-col flex items-center cursor-pointer justify-center">
                    <div className="w-full h-full flex-col flex items-center gap-2 justify-center">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500  hover:text-gray-700 ">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      className="w-0 h-0"
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      onChange={uploadImage}
                    />
                  </label>
                </>
              ) : (
                <>
                  {" "}
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt=" uploaded image"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={deleteImage}
                      className="absolute hover:shadow-md duration-500 transition-all ease-in-out
                       bottom-3 p-3 right-3 rounded-full bg-red-500 text-xl outline-none cursor-pointer"
                      type="button"
                    >
                      <MdDelete className="bg-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="w-full flex flex-col md:flex-row gap-2 items-center">
          <div className="w-full py-2 border-b flex border-gray-300 items-center">
            <MdFoodBank className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="Calories"
              className="w-full h-full text-lg bg-transparent outline-none boder-none text-textColor placeholder:text-gray-400"
            />
          </div>

          <div className="w-full py-2 border-b flex border-gray-300 items-center">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full h-full text-lg bg-transparent outline-none boder-none text-textColor placeholder:text-gray-400"
            />
          </div>
        </div>
        <div className="flex items-center w-full">
          <button
            type="button"
            onClick={saveDetails}
            className="ml-0 w-full md:w-auto border-none outline-none font-semibold bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white md:ml-auto"
          >Save</button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
