import React, { useEffect, useState } from "react";
import TutorialDataService from "../services/tutorial.service";
import { useParams, useNavigate } from 'react-router-dom';
import { styles } from "../styles";

const tutorialComponent = () => {
  const [currentTutorial, setCurrentTutorial] = useState({
    id: null,
    title: "",
    description: "",
    published: false,
  });
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getTutorial(id);
  }, [id]);

  const onChangeTitle = (e) => {
    const title = e.target.value;
    setCurrentTutorial((prevState) => ({
      ...prevState,
      title: title,
    }));
  };

  const onChangeDescription = (e) => {
    const description = e.target.value;
    setCurrentTutorial((prevState) => ({
      ...prevState,
      description: description,
    }));
  };

  const getTutorial = (id) => {
    TutorialDataService.get(id)
      .then((response) => {
        setCurrentTutorial(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updatePublished = (status) => {
    var data = {
      id: currentTutorial.id,
      title: currentTutorial.title,
      description: currentTutorial.description,
      published: status,
    };

    TutorialDataService.update(currentTutorial.id, data)
      .then((response) => {
        setCurrentTutorial((prevState) => ({
          ...prevState,
          published: status,
        }));
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateTutorial = () => {
    TutorialDataService.update(currentTutorial.id, currentTutorial)
      .then((response) => {
        console.log(response.data);
        setMessage("The tutorial was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteTutorial = () => {
    TutorialDataService.delete(currentTutorial.id)
      .then((response) => {
        console.log(response.data);
        navigate('/tutorials');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="relative w-full h-screen mx-auto">
      <div className="mx-auto max-w-7xl list row">
        <div className="pt-24 pb-12 flex flex-col gap-y-5 lg:flex-col lg:items-center lg:gap-x-7">
          {currentTutorial ? (
            <div className="edit-form">
              <h4 className={`${styles.sectionHeadText}`}>Tutorial</h4>
              <form className="w-full max-w-sm">
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="title">
                      Title
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="title" type="text" value={currentTutorial.title} onChange={onChangeTitle} />
                  </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="description">
                      Description
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="description" type="text" onChange={onChangeDescription} value={currentTutorial.description} />
                  </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="status">
                      Status
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="status" type="text" value={currentTutorial.published ? " Published" : " Pending"} readOnly />
                  </div>
                </div>


              </form>


              <div className="md:flex md:items-center flex flex-row">
                <div className="mx-auto space-x-10">
                  {currentTutorial.published ? (
                    <button className="shadow bg-blue-700 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                      onClick={() => updatePublished(false)}
                    >
                      Unpublish
                    </button>
                  ) : (
                    <button
                      className="shadow bg-blue-700 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                      onClick={() => updatePublished(true)}
                    >
                      Publish
                    </button>
                  )}

                  <button
                    className="shadow bg-red-700 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    onClick={deleteTutorial}
                  >
                    Delete
                  </button>

                  <button
                    type="submit"
                    className="shadow bg-green-700 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    onClick={updateTutorial}
                  >
                    Update
                  </button>
                </div>
              </div>
              <div className="mt-10 items-center text-center mx-auto">
                    <p>{message}</p>
                  </div>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Tutorial...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default tutorialComponent;
