import React, { useEffect, useState } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";
import { styles } from "../styles";

const tutorialsListComponent = () => {
  const [tutorials, setTutorials] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTutorialTitle, setSearchTutorialTitle] = useState("");

  useEffect(() => {
    retrieveTutorials();
  }, []);

  const onChangeSearchTitle = (e) => {
    const title = e.target.value;
    setSearchTutorialTitle(title);
  };

  const retrieveTutorials = () => {
    TutorialDataService.getAll()
      .then((response) => {
        setTutorials(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTutorials();
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const setActiveTutorial = (tutorial, index) => {
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
  };

  const removeAllTutorials = () => {
    TutorialDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const searchTitle = () => {
    TutorialDataService.findByTitle(searchTutorialTitle)
      .then((response) => {
        setTutorials(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <section className="relative w-full h-screen mx-auto">
      <div className="mx-auto max-w-7xl list row">
        <div className="pt-24 pb-12 flex flex-col gap-y-5 lg:flex-col lg:items-center lg:gap-x-7">
          <div className="flex flex-row gap-x-5 ">
            <input
              className="text-black placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Search by title..."
              type="text"
              value={searchTutorialTitle}
              onChange={onChangeSearchTitle}
            />


            <button
              className="shadow bg-blue-700 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={searchTitle}
            >
              Search
            </button>
          </div>

          <div className="flex flex-row gap-10 mx-auto justify-between pt-10">
            <div className="overflow-x-auto sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      #
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Title
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tutorials &&
                    tutorials.map((tutorial, index) => (
                      <tr
                        key={index}
                        className={`${index === currentIndex ? "active" : ""} bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}
                        onClick={() => setActiveTutorial(tutorial, index)}>
                        <td className="px-6 py-4">
                          {index + 1}
                        </td>
                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap w-[250px] dark:text-white">
                          {tutorial.title}
                        </td>

                      </tr>
                    ))}
                </tbody>
              </table>

              <div className="mt-10 flex justify-center">
                <button
                  className="shadow bg-red-700 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  onClick={removeAllTutorials}
                >
                  Delete All
                </button>
              </div>
            </div>

            <div className="md:col-span-6">
              <h4 className={`${styles.heroSubText}`}>Tutorial</h4>
              <hr></hr>
              {currentTutorial ? (
                <div className="flex flex-1 flex-col">
                  <div className="mt-4">
                    <label className="font-semibold">Title:</label>{" "}
                    <label className="italic text-[#aaa6c3]">{currentTutorial.title}</label>
                  </div>
                  <div className="mt-2">
                    <label className="font-semibold">Description:</label>{" "}
                    <label className="italic text-[#aaa6c3]">{currentTutorial.description}</label>
                  </div>
                  <div className="mt-2">
                    <label className="font-semibold">Status:</label>{" "}
                    <label className="italic text-[#aaa6c3]">{currentTutorial.published ? "Published" : "Pending"}</label>
                  </div>

                  <Link
                    to={"/tutorials/" + currentTutorial.id}
                    className="inline-block w-20 text-center mt-4 px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 text-[15px]"
                  >
                    Edit
                  </Link>
                </div>
              ) : (
                <div className="mt-4">
                  <p>Please click on a Tutorial...</p>
                </div>
              )}
            </div>

          </div>


        </div>
      </div>
    </section>

  );
};

export default tutorialsListComponent;
