import React, { Fragment, useEffect, useState } from "react";
import NavbarNew from "./NavbarNew";
import { useNavigate } from "react-router-dom";
import Axiosinstance from "../Config/Axiosinstance";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Swal from "sweetalert2";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { downloadFile, getBase64Extension } from "../Extra/DownloadFile";

function Myfiles() {
  let [isOpen, setIsOpen] = useState(false);
  const [filename, setFilename] = useState("");
  const [code, SetCode] = useState("");

  const [token, setToken] = useState("");
  const [files, setFiles] = useState([]);
  const [isRender, setIsrender] = useState(true);

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

  useEffect(() => {
    async function invoke() {
      await Axiosinstance.get(`/getFiles/${token}`)
        .then((response) => {
          if (response.data.status === "success") {
            setFiles(response.data.files);
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
    invoke();
  }, [token, isRender]);

  const fileDelete = (fileId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axiosinstance.get(`/fileDelete/${fileId}`).then((response) => {
          if (response.data.status === "success") {
            Swal.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success"
            ).then(() => {
              setIsrender(!isRender);
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        });
      }
    });
  };

  function closeModal() {
    setIsOpen(false);
    setFilename(null);
    SetCode(null);
  }

  function download(fileurl, geneCode) {
    setIsOpen(true);
    setFilename(fileurl);
    SetCode(geneCode);
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let obj = {
      code: data.get("code"),
    };
    if (code===obj.code) {
      const extention= getBase64Extension(filename)
      if (extention === 'pdf') {
        downloadFile(filename, 'application/pdf', 'document.pdf');
      } else  {
        downloadFile(filename, 'image/png', 'image.png');
      }
      closeModal()
    } else {
      toast.error("Your code is not matched", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  };


  

  return (
    <div>
      <NavbarNew />
      <ToastContainer />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-100" onClose={closeModal}>
          <div className="flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 overflow-scroll">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed scroll-m-2 inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className="inline-block align-bottom bg-black rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
                    <div className="flex items-center px-1.5 py-2 border-b border-gray-700">
                      <div
                        className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                        onClick={() => setIsOpen(false)}
                      >
                        <XMarkIcon className="h-[22px] text-white" />
                      </div>
                      <div className="text-white">Download</div>
                    </div>
                    <div className="flex px-4 pt-5 pb-2.5 sm:px-6">
                      <div className="w-full">
                        <div className="text-[#6e767d] flex gap-x-3 relative">
                          <div className="flex flex-col items-center px-4 md:px-12">
                            <img
                              alt="..."
                              src="https://i.ibb.co/QDMrqK5/Saly-10.png"
                            />
                            <p className="text-base sm:text-lg md:text-2xl font-bold md:leading-6 mt-6 text-gray-800 text-center dark:text-gray-100">
                              Please enter generated code :
                            </p>
                            <p className="text-xs sm:text-sm leading-5 mt-2 sm:mt-4 text-center text-gray-600 dark:text-gray-300">
                              The greatest glory in living lies not in never
                              falling, but in rising every time we fall
                            </p>
                            <form onSubmit={handleSubmit}>
                            <input
                              type="text"
                              id="code"
                              name="code"
                              class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                            <div className="flex items-center mt-4 sm:mt-6 w-full">
                              <div className="bg-gray-50 border rounded border-gray-200 dark:border-gray-700 dark:bg-gray-700 w-full">
                                <button
                                  type="submit"
                                  className="w-full focus:outline-none pl-4 py-3 text-base leading-none text-gray-600 dark:text-gray-100 bg-transparent placeholder-gray-600 font-bold dark:placeholder-gray-100"
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                            </form>
                          </div>
                        </div>

                        <div className="mt-7 flex space-x-3 w-full">
                          <div className="flex-grow mt-5"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -mx-4 -mb-10 justify-center text-center">
            {files.map((file, i) => (
              <div key={file?._id} className="sm:w-96 mb-10 px-4">
                <div className="rounded-lg h-64 overflow-hidden">
                  <img
                    alt="content"
                    className="object-cover object-center h-full w-full"
                    src={file?.file}
                  />
                </div>

                <h2 className="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">
                  Generate code: {file?.generatedCode}
                </h2>

                <button
                  onClick={() => {
                    download(file?.file, file?.generatedCode);
                  }}
                  className=" mx-auto  mt-6 text-white bg-indigo-500 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Download
                </button>
                <button
                  onClick={() => {
                    fileDelete(file?._id);
                  }}
                  className=" mx-auto ml-5 mt-6 text-white bg-red-700 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Myfiles;
