import Application from "./Application";

const ApplicationList = ({applications}) => {
    return(
        <div>
            {applications.map ( (app) => {
                return <Application key= {app.id} app = {app}/>
            })}
        </div>
    )
}

export default ApplicationList;