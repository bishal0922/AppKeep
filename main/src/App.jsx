import { useState } from "react";
import { useRef } from "react"
import ApplicationList from "./pages/ApplicationList";
import Navbar from "./pages/Navbar";
import {v4 as uuidv4} from 'uuid';
import { useEffect } from "react";
import './App.css'
import ExportCSV from "./pages/ExportCSV";
import ExportJSON from "./pages/ExportJSON";

const LOCAL_STORAGE_KEY = "AppKeep"

const App = () => {
  const [applications, setApplications] = useState([
  ]);
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

  //handle key down
  const handleKeyDown = (e) => {
    if (e.key === 'Enter'){
      handleAddApplication();
    }
  }

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
      status: "Applied",
      date: new Date().toLocaleDateString('en-US', {month: "long", day: "numeric"})
    }

    //update state with new application
    setApplications(prevApplications => {
      return [...prevApplications, newApplication]
    })

    //clear the input field
    companyName.current.value = "";
  }



  return (
    <div className="App">
      <Navbar />
      <div className="application">
        {/* Section to Add a new Application */}
        <div className="application-input">
          <input type="text" ref={companyName} placeholder="Company Name" onKeyDown={handleKeyDown}/>
          <button onClick={handleAddApplication}> Add Application </button>
          {/* add a section to show number of active application */}
        </div>

        <div className="application-list">
          
          {/* Section to Display the list of Applications */}
          <ApplicationList applications={applications} setApplications={setApplications}/>
        </div>
        <div className="export">
          <ExportJSON applications={applications}/>
        </div>

        <div className="export-csv">
          <ExportCSV applications={applications}/>
        </div>

      </div>
    </div>
  );
}

export default App;
