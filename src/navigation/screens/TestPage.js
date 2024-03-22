import { useState } from "react";

function TestPage() {

  const [file, setFile] = useState();

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = () =>{

  }

  return (
    <div>
      <input type="file" onClick={handleFile} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default TestPage;
