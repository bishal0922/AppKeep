import { useRef, useState } from "react";
import Application from "./Application";
import './styles/table.css'

const ApplicationList = ({applications, setApplications}) => {
    const [editRow, setEditRow] = useState([]);
    const [editStatus, setEditStatus] = useState(false);
    const [editStatusList, setEditStatusList] = useState(Array(applications.length).fill(false));
    const statusRef = useRef();


    const handleStatusSelectDropdown = (e, rowIndex) => {
        const newApplications = [...applications];
        const newStatusReceived = e.target.value; 

        newApplications[rowIndex] = {
            ...newApplications[rowIndex],
            status: newStatusReceived,
            date: new Date().toLocaleDateString('en-US', {month: "long", day: "numeric"}) 
        }

        setApplications(newApplications);

        setEditRow(null);
    }


    const handleCompanyNameChange = (e, rowIndex) => {
        console.log(
          "handleCompanyNameChange: "
        )
        const newApplications = [...applications];
        const newCompanyName = e.target.value;

        newApplications[rowIndex] = {
            ...newApplications[rowIndex],
            companyName: newCompanyName,
            date: new Date().toLocaleDateString('en-US', {month: "long", day: "numeric"})
        }

        setApplications(newApplications);
    }


    const handleSaveButton = (rowIndex) => {
        setEditRow(null);
        setEditStatus(false);
    }


    const renderRow  = (row, rowIndex) => {
        const isRowInEditMode = editStatusList[rowIndex];
        const toggleEditMode = () => {
          const newEditStatusList = [...editStatusList];
          newEditStatusList[rowIndex] = !newEditStatusList[rowIndex];
          setEditStatusList(newEditStatusList);
        };

        return (
          <tr key={rowIndex} className="table-body-row">
            {/* <td>{row?.companyName}</td> */}
            <td className="td-company-name-edit">
              {isRowInEditMode ? (
                <input
                  type="text"
                  value={row?.companyName}
                  className="company-name-input"
                  onChange={(e) => handleCompanyNameChange(e, rowIndex)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSaveButton(rowIndex);
                      toggleEditMode();
                    }
                  }}
                />
              ) : (
                row?.companyName
              )}

              {!isRowInEditMode && (
                <button
                  onClick={toggleEditMode}
                  className="td-company-name-edit-button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    fill="currentColor"
                    className="bi bi-pencil"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                  </svg>
                </button>
              )}

              {isRowInEditMode && (
                <button
                  onClick={() => {
                    handleSaveButton(rowIndex);
                    toggleEditMode();
                  }}
                  className="td-company-name-edit-button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    fill="currentColor"
                    class="bi bi-check-lg"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                  </svg>
                </button>
              )}
            </td>
            <td>
              <select
                ref={statusRef}
                value={row?.status}
                className="status-select-dropdown"
                onChange={(e) => handleStatusSelectDropdown(e, rowIndex)}
              >
                <option value="Applied">Applied</option>
                <option value="OA">OA</option>
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
              <th className="company-name-header">Company</th>
              <th className="status-header">Status</th>
              <th className="date-header">Last Updated</th>
            </tr>
          </thead>

          <tbody className="table-body">


            {applications.map((app, index) =>  renderRow(app, index))}



          </tbody>
        </table>
      </div>
    );
}

export default ApplicationList;