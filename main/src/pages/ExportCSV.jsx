import React from 'react';
// import { createObjectCsvWriter } from 'csv-writer';

const ExportCSV = ({applications}) => {
    const exportCSV = () => {
        console.log("Exporting applications as CSV")

        alert("Exporting CSV deprecated. Please use Export JSON instead.")
        return;
        // Define the headers for the CSV file
        const headers = [
        { id: "id", title: "ID" },
        { id: "companyName", title: "Company Name" },
        { id: "status", title: "Status" },
        { id: "date", title: "Date" },
        ];

        // Create a new CSV writer object with the specified headers
        const csvWriter = createObjectCsvWriter({
        path: "applications.csv",
        header: headers,
        });

        // Write the application data to the CSV file
        csvWriter
        .writeRecords(applications)
        .then(() => console.log("Applications exported as CSV"))
        .catch((error) => console.error(error));
    }

    return (
      <button onClick={exportCSV} className='export-button'>
        Export CSV
      </button>
    )
}

export default ExportCSV;
