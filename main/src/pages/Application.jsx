import './styles/table.css'

const Application = ({app}) => {
    return (
      <tr className='table-body-row'>
        <td>{app.companyName}</td>
        <td>{app.status}</td>
        <td>{app.date}</td>
      </tr>
    );
}

export default Application; 