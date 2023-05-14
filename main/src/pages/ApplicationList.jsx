import Application from "./Application";
import './styles/table.css'

const ApplicationList = ({applications}) => {
    return(
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
            {applications.map ( (app) => {
                return <Application key= {app.id} app = {app}/>
            })}
            </tbody>

            </table>
        </div>
    )
}

export default ApplicationList;