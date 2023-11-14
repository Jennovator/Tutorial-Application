import React, { useState } from "react";
import { styles } from '../styles';
import TutorialDataService from "../services/tutorial.service";

const AddTutorial = () => {
  const [tutorial, setTutorial] = useState({
    id: null,
    title: "",
    description: "",
    published: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const onChangeTitle = (e) => {
    setTutorial({ ...tutorial, title: e.target.value });
  };

  const onChangeDescription = (e) => {
    setTutorial({ ...tutorial, description: e.target.value });
  };

  const saveTutorial = () => {
    var data = {
      title: tutorial.title,
      description: tutorial.description,
    };

    TutorialDataService.create(data)
      .then((response) => {
        setTutorial({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    setTutorial({
      id: null,
      title: "",
      description: "",
      published: false,
    });
    setSubmitted(false);
  };

  return (
    <div className="relative w-full h-screen mx-auto">
    <div className="mx-auto max-w-7xl list row">
      <div className="pt-24 pb-12 flex flex-col gap-y-5 lg:flex-col lg:items-center lg:gap-x-7">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button
            onClick={newTutorial}
            type="submit" 
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Add another
          </button>
        </div>
      ) : (
        <div className="text-black ">
          <div className="mb-6">
            <h2 className={`${styles.sectionHeadText} text-[#aaa6c3]`}>Create Tutorial</h2>
            <hr></hr>
            <label htmlFor="title" className="mt-10 block mb-2 text-md font-medium text-gray-900 dark:text-white">Title</label>
            <input
              type="text"
              className="w-[500px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="title"
              required
              value={tutorial.title}
              onChange={onChangeTitle}
              name="title"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Description</label>
            <textarea
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="description"
              required
              value={tutorial.description}
              onChange={onChangeDescription}
              name="description"
              rows={5}
            />
          </div>

          <button
            onClick={saveTutorial}
            type="submit" 
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Submit
          </button>
        </div>
      )}
      </div>
      </div>
    </div>
  );
};

export default AddTutorial;
