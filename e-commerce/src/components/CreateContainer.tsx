import React, { useState, useRef } from "react";
import { MdOutlineTitle, MdCloudUpload } from "react-icons/md";
import { categories } from "../data/data";
import Loader from "./Loader";
import { ImCross } from "react-icons/im";
import { FaRupeeSign } from "react-icons/fa";
import { storage } from "../firebase.config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { saveItem } from "../data/FirebaseFunctions";

const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [tempImgUrl, setTempImgUrl] = useState<string>("");
  const [price, setPrice] = useState(0);
  const [alert, setAlert] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [imgDetails, setImgDetails] = useState<Record<string, any>>({});

  // useRef for choosing file input to access by an area around box
  const fileRef = useRef<HTMLInputElement>(null);
  //manages the onclick on input file choos to the area clicked outside
  const refHandle = () => {
    fileRef.current?.click();
  };

  //uploads image function
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //only image files are valid
    if (e.target.files![0].type.startsWith("image/")) {
      setIsLoading(true);
      setAlert("Uploading, Please Wait!");
      setTimeout(() => setAlert(" "), 2000);
      setImgDetails(e.target.files![0]);
      try {
        const url = URL.createObjectURL(e.target.files![0]);
        setTimeout(() => {
          setTempImgUrl(url);
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        setIsLoading(false);
        setAlert("Error uploading image!");
      }
    } else {
      setAlert("Upload image only!");
    }
  };

  const deleteImage = () => {
    try {
      setTempImgUrl("");
      setAlert("Image deleted successfully!");
    } catch (error) {
      // Handle the deletion error
      setAlert("error");
    }

    setTimeout(() => setAlert(""), 2000);
  };

  const saveDetails = async () => {
    let imageUrl = "";
    try {
      //ref is a firebase storage function which takes storage the one which we created in firebase.config,to create unique id with date
      const storageRef = ref(
        storage,
        `Images/${Date.now()}-${imgDetails.name}`
      );
      //uploadBytesResumable is also a firebase storage function which takes stored reference and there storing the imageFile uploaded by owner
      const uploadTask = uploadBytesResumable(storageRef, imgDetails as Blob);
      //snapshot gives the metadata of the image uploaded
      const snapshot = await uploadTask;
      //getDownloadURL will fetch the url given by the firebase storage from the snapshot ref where info is there
      const downloadURL = await getDownloadURL(snapshot.ref);

      imageUrl = downloadURL;
      setIsLoading(false);
      setAlert("");
    } catch (error) {
      setIsLoading(false);
      setAlert("Error uploading image!");
    }
    try {
      if (title && tempImgUrl && category && price && quantity! > 0) {
        const newItem = {
          id: `${Date.now()}`,
          title: title,
          category: category,
          imageUrl: imageUrl,
          qty: quantity,
          price: price,
        };
        saveItem(newItem);
        setAlert("Data Uploaded Successfully!");
        setTimeout(() => setAlert(""), 2000);

        const clearData = () => {
          setTitle("");
          setCategory("");
          setTempImgUrl("");
          setPrice(0);
          setQuantity(0);
        };
        clearData();
      } else {
        setAlert("Please fill all the fields!");
        setTimeout(() => setAlert(""), 2000);
      }
    } catch (error) {
      setAlert("Error while Uploading!");
    }
  };

  return (
    <div className="h-full flex flex-col justify-center items-center w-full">
      <p className="font-semibold text-2xl text-red-700 mt-4 flext justify-center">
        {alert && alert}
      </p>
      <div className="p-2 border rounded-lg border-gray-500 w-[90%] md:w-[50%]">
        <div className="flex border-b border-gray-500 gap-2 text-lg py-1">
          <MdOutlineTitle className="text-2xl mb-0 text-textColor" />
          <input
            required
            className="bg-primary w-full text-textColor font-semibold outline-none"
            placeholder="Write product name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <select
          required
          value={category}
          className="py-2 px-2 rounded-lg mt-4 bg-white w-full text-textColor"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="no" hidden>
            Select Category
          </option>
          {categories &&
            categories.map((item) => (
              <option
                value={item.alt}
                key={item.id}
                className="text-headingColor text-lg p-2"
              >
                {item.alt}
              </option>
            ))}
        </select>

        <div
          className="border-dotted border-2 rounded-lg border-textColor mt-4 p-10   flex flex-col justify-center items-center text-gray-500"
          onClick={refHandle}
        >
          {!tempImgUrl ? (
            !isLoading ? (
              <>
                {" "}
                <MdCloudUpload className="text-2xl " />
                <p>Click here to Upload</p>
                <input
                  required
                  type="file"
                  accept="image/*"
                  ref={fileRef}
                  hidden
                  onChange={(e) => uploadImage(e)}
                />
              </>
            ) : (
              <Loader />
            )
          ) : (
            <>
              <img
                className="h-[10rem] w-auto"
                src={tempImgUrl}
                alt="product item"
              />
              <div className="mt-2">
                {" "}
                <ImCross onClick={deleteImage} />
              </div>
            </>
          )}
        </div>
        <div className=" flex flex-col">
          <div className="text-textColor bg-primary mt-8 flex border-b border-gray-500">
            <FaRupeeSign className="text-lg" />
            <input
              required
              type="number"
              value={price > 0 ? price : ""}
              placeholder="Enter Price"
              className="bg-primary px-2 font-semibold mb-2 text-md outline-none"
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
          </div>

          <div className="text-textColor bg-primary mt-8 flex border-b border-gray-500">
            <FaRupeeSign className="text-lg" />

            <input
              required
              type="number"
              value={quantity > 0 ? quantity : ""}
              placeholder="Enter Quantity"
              className="bg-primary px-2 font-semibold mb-2 text-md outline-none"
              onChange={(e) => setQuantity(parseFloat(e.target.value))}
            />
          </div>
        </div>

        <div className=" mt-4 flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            onClick={saveDetails}
          >
            Save My Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
