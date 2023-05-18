import React, { useEffect, useState } from "react";
import NavbarNew from "./NavbarNew";
import { useNavigate } from "react-router-dom";

function Myfiles() {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    async function invoke() {
      setToken(localStorage.getItem("myToken"));
    }
    invoke();
    if (token === null) {
      navigate("/login");
    } else {
    }
  }, [navigate, token]);
  return (
    <div>
      <NavbarNew />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -mx-4 -mb-10 justify-center text-center">

            



            <div className="sm:w-96 mb-10 px-4">
              <div className="rounded-lg h-64 overflow-hidden">
                <img
                  alt="content"
                  className="object-cover object-center h-full w-full"
                  src="https://dummyimage.com/1201x501"
                />
              </div>
              <h2 className="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">
                Buy YouTube Videos
              </h2>
              <p className="leading-relaxed text-base">
                Williamsburg occupy sustainable snackwave gochujang. Pinterest
                cornhole brunch, slow-carb neutra irony.
              </p>
              <button className=" mx-auto  mt-6 text-white bg-indigo-500 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded">
                Download
              </button>
              <button className=" mx-auto ml-5 mt-6 text-white bg-red-700 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded">
                Delete
              </button>
            </div>

            
          



          </div>
        </div>
      </section>
    </div>
  );
}

export default Myfiles;
