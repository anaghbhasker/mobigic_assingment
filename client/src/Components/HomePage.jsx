import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axiosinstance from "../Config/Axiosinstance";
import NavbarNew from "./NavbarNew";
import { toBase64 } from "../Extra/Base64";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Swal from "sweetalert2";

function HomePage() {
  const [token, setToken] = useState("");
  const [username,setUsername]=useState('')
  const navigate = useNavigate();
  useEffect(() => {
    async function invoke() {
      setToken(localStorage.getItem("myToken"));
    }
    invoke();
    if (token === null) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    async function invoke() {
      const response = await Axiosinstance.get("/userDetails",{
        params: {
          token: token,
        },
      })
      setUsername(response.data.username);
    }
    invoke();
  }, [token]);

  const handleSubmit=async(event)=>{
    event.preventDefault();
      const data = new FormData(event.currentTarget);
      const file=await toBase64(data.get("file"))
      let obj={
        file:file,
        token:token
      }
      Axiosinstance.post('/addFiles',obj).then((response)=>{
        if (response.data.status==="success") {
          Swal.fire(
            'Good job!',
            response.data.message,
            'success'
          )
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        }
      }).catch((error)=>{
        toast.error(error.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      })
  }

  return (
    <div>
      <NavbarNew/>
      <ToastContainer />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-medium text-2xl text-gray-900">
            Hi {username}....Welcome to Mobigic® Technologies Private Limited 
            </h1>
            <p className="leading-relaxed mt-4">
            Data is not just information, it's the foundation of the future,,,,In the future, everything will be stored electronically, but it will still be important to preserve our analog history.
            </p>
          </div>
          <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              Files
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="relative mb-4">
                <label
                  for="full-name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Add File
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  required
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <button
                type="submit"
                className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Add file
              </button>
            </form>
            
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
