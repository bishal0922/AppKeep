const ExportJSON = ({applications}) => {

  const exportJSON = () => {
    const data = JSON.stringify(applications);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "applications.json");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <button onClick={exportJSON} className="export-button">
      Export JSON
    </button>
  );
}

export default ExportJSON;
