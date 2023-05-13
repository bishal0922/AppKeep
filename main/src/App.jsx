import { useState } from "react";
import { useRef } from "react"
import ApplicationList from "./pages/ApplicationList";
import {v4 as uuidv4} from 'uuid';
import { useEffect } from "react";

const LOCAL_STORAGE_KEY = "AppKeep"

const App = () => {
  const [applications, setApplications] = useState([]);
  const companyName = useRef();

  //useEffect when the program runs first time
  useEffect( () => {
    const storedApplications = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))

    if (storedApplications){
      setApplications(storedApplications);
    }
  }, [])

  //useEffect changes when there are changes to todos
  useEffect( () => {
    //store locally
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(applications))
  }, [applications])

  const handleAddApplication = () => {
    //get the company name from the input field
    const name = companyName.current.value;

    //verify it's not empty
    if (name === ''){
      return 
    }

    const newApplication = {
      id: uuidv4(), //create a unique id
      companyName:  name,
      status: "Applied" 
    }

    console.log(newApplication);

    //update state with new application
    setApplications(prevApplications => {
      return [...prevApplications, newApplication]
    })

    //clear the input field
    companyName.current.value = "";
  }

  return (
    <div className="App">

      <input type="text" ref={companyName} placeholder="Company Name"/>
      <button onClick={handleAddApplication}> Add Application </button>
      {/* add a section to show number of active application */}

      {/* Section to Display the list of Applications */}
      <ApplicationList applications={applications} />

    </div>
  )
}

export default App;
