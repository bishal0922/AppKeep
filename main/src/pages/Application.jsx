const Application = ({app}) => {
    return (
      <div>
        <label>{app.companyName} - {app.status}
            <select>
                <option value="option1"> 1</option>
                <option value="option2"> 2</option>
                <option value="option3" selected> 3</option>
                <option value="option4"> 4</option>
                <option value="option5"> 5</option>
            </select>
        </label>
      </div>
    );
}

export default Application; 