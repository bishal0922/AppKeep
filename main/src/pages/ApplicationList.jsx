import { useRef, useState } from "react";
import Application from "./Application";
import './styles/table.css'

const ApplicationList = ({applications, setApplications}) => {
    const [editRow, setEditRow] = useState([]);
    const statusRef = useRef();


    const handleStatusSelectDropdown = (e, rowIndex) => {
        const newApplications = [...applications];
        const newStatusReceived = e.target.value; 

        newApplications[rowIndex] = {
            ...newApplications[rowIndex],
            status: newStatusReceived,
        }

        console.log("newApplications: ", newApplications);

        setApplications(newApplications);

        setEditRow(null);

    }

    const renderRow  = (row, rowIndex) => {

        return (
          //        <tr className='table-body-row'>
          //     <td>{app.companyName}</td>
          //     <td>{app.status}</td>
          //     <td>{app.date}</td>
          //   </tr>

          <tr key={rowIndex} className="table-body-row">
            <td>{row?.companyName}</td>
            <td>
                <select ref={statusRef} value={row?.status} className="status-select-dropdown" onChange={(e) => handleStatusSelectDropdown(e, rowIndex)}>
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                </select>       
            </td>
            <td>{row?.date}</td>
          </tr>
        );

    }

    return (
      <div>
        <table className="table-main">
          <thead className="table-head">
            <tr>
              <th className="company-name-header">Company Name</th>
              <th className="status-header">Status</th>
              <th className="date-header">Date</th>
            </tr>
          </thead>

          <tbody className="table-body">
            {/* <tr> as table row and <td> as table data 
                <tr>
                    <td>Google</td>
                    <td>Applied</td>
                    <td>10/10/2021</td>
                </tr>
             */}

            {applications.map((app, index) =>  renderRow(app, index))}


{/* 
            {applications.map((app) => {
              return <Application key={app.id} app={app} />;
            })} */}
          </tbody>
        </table>
      </div>
    );
}

export default ApplicationList;