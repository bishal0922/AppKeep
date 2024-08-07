import { React, useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "../App.css";

import ApplicationList from "./ApplicationList";
import ExportCSV from "./ExportCSV";
import ExportJSON from "./ExportJSON";

import {auth} from '../firebase'
import { db } from "../firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged} from "firebase/auth";

const LOCAL_STORAGE_KEY = "AppKeep";

const AppKeep = () => {
  const [applications, setApplications] = useState([]);
  const [userUID, setUserUID] = useState(null)
  const companyName = useRef();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUID(user.uid);
      } else {
        setUserUID(null);
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);


   async function fetchApplications() {
    const userApplicationsCollection = collection(db, "user", userUID, "applications");
    const querySnapshot = await getDocs(userApplicationsCollection);
    const fetchedApplications = [];
    querySnapshot.forEach(doc => {
      fetchedApplications.push(doc.data());
    });
    setApplications(fetchedApplications);
  }

  async function addApplication(newApplication) {
    const userApplicationsCollection = collection(db, "user", userUID, "applications");
    try {
      await addDoc(userApplicationsCollection, newApplication)
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // useEffect when the program runs first time
  useEffect(() => {
    if (userUID){
      fetchApplications();
    }
  }, [userUID]);


  //useEffect when the program runs first time
  useEffect(() => {
    const storedApplications = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)
    );

    if (storedApplications) {
      setApplications(storedApplications);
    }
  }, []);

  //useEffect changes when there are changes to todos
  useEffect(() => {
    //store locally
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(applications));
  }, [applications]);

  //handle key down
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddApplication();
    }
  };

  const handleAddApplication = () => {
    //get the company name from the input field
    const name = companyName.current.value;

    //verify it's not empty
    if (name === "") {
      return;
    }

    const newApplication = {
      id: uuidv4(), //create a unique id
      companyName: name,
      status: "Applied",
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      }),
    };

    //update state with new application
    setApplications((prevApplications) => {
      return [...prevApplications, newApplication];
    });

    //add here to firebase
    if (userUID){
      addApplication(newApplication);
    }

    //clear the input field
    companyName.current.value = "";
  };

  return (
    <div>
      <div className="application">
        {/* New Application Input */}
        <div className="application-input">
          <input
            type="text"
            ref={companyName}
            placeholder="Company Name (Ex Google...)"
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleAddApplication}> Add Application </button>
          {/*TODO: add a section to show number of active application */}
        </div>

        {/* Application List */}
        <div className="application-list">
          <ApplicationList
            applications={applications}
            setApplications={setApplications}
          />
        </div>

        {/* JSON Export */}
        <div className="export">
          <ExportJSON applications={applications} />
        </div>

        {/* CSV Export #Deprecated# */}
        <div className="export-csv">
          <ExportCSV applications={applications} />
        </div>
      </div>
    </div>
  );
};

export default AppKeep;
