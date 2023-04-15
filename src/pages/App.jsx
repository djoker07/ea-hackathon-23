import { useNavigate } from "react-router-dom";
import DragDrop from "../components/DragDrop";
import "../styles/button.css";
import '../styles/loader.css'
import { Context } from "../store/AppContext";
import { useContext, useState } from "react";

import { AzureKeyCredential } from "@azure/core-auth";
import { DocumentAnalysisClient } from "@azure/ai-form-recognizer";

const key = import.meta.env.VITE_AZURE_API_KEY;
const endpoint = import.meta.env.VITE_AZURE_END_POINT;

async function main(url) {
  // sample document
  const formUrl = url;
  const client = new DocumentAnalysisClient(
    endpoint,
    new AzureKeyCredential(key)
  );

  try {
    const poller = await client.beginAnalyzeDocumentFromUrl(
      "prebuilt-document",
      formUrl
    );

    const { keyValuePairs } = await poller.pollUntilDone();
    return keyValuePairs;

  } catch (error) {
    console.log(error)
    return null
  }

}

function App() {
  let {results, setResults} = useContext(Context)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    let url = document.querySelector('#test-url')
    document.getElementById('error-msg').innerHTML = ""
    if (!url.value) {
      document.getElementById('error-msg').innerHTML = "Please enter URL"
      return;
    }

    let loader = document.querySelector('.loader-background')
    loader.classList.remove('off')
    // console.log(file.files)
    let keyValuePairs = await main(url.value);

    if (!keyValuePairs) {
      loader.classList.add('off')
      document.getElementById('error-msg').innerHTML = "Invalid URL"
      return;
    }

    results.actions.setSyllabusResults(keyValuePairs)
    loader.classList.add('off')

    navigate('/results')
  };
  return (
    <div className="app">
        <div className="loader-background off">
          <div className="loader"></div> 
        </div>
      <form className="app-form">
      <p>Sample doc URL (See more in readme) <br/> 
      https://ea-hackathon-23.vercel.app/files/ARH1000.pdf</p>
        <h1 style={{ textDecoration: "underline" }}>Syllabus Dissector</h1>
        <p>Enter the url to your syllabus below (files coming soon)</p>
        <input type="text" id="test-url" placeholder="URL"/>
        <p id="error-msg"></p>

        <button
          onClick={(e) => handleClick(e)}
          className="btn"
          style={{ "--clr": "#1589FF" }}
        >
          <span>Submit</span>
          <i></i>
        </button>
      </form>
    </div>
  );
}

export default App;
