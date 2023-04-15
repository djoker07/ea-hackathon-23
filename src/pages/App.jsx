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

console.log(key, endpoint)

async function main(url) {
  // sample document
  const formUrl = url;
  const client = new DocumentAnalysisClient(
    endpoint,
    new AzureKeyCredential(key)
  );

  const poller = await client.beginAnalyzeDocumentFromUrl(
    "prebuilt-document",
    formUrl
  );

  const { keyValuePairs } = await poller.pollUntilDone();

  return keyValuePairs;
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
    // let file = document.querySelector('#test-file')
    // let url = URL.createObjectURL(file.files[0]).split(':')[1]
    // setLoading(!loading)
    // console.log(loading)
    let loader = document.querySelector('.loader-background')
    loader.classList.remove('off')
    // console.log(file.files)
    let keyValuePairs = await main(url.value);

    results.actions.setSyllabusResults(keyValuePairs)
    loader.classList.add('off')
    // if (!keyValuePairs || keyValuePairs.length <= 0) {
    //   console.log("No key-value pairs were extracted from the document.");
    // } else {
    //   console.log("Key-Value Pairs:", keyValuePairs);
    //   for (const { key, value, confidence } of keyValuePairs) {
    //     console.log("- Key  :", `"${key.content}"`);
    //     console.log(
    //       "  Value:",
    //       `"${(value && value.content) || "<undefined>"}" (${confidence})`
    //     );
    //   }
    // }


    //testGPT()
    // let file = document.querySelector('#upload-input')
    // console.log(file.files[0].name)
    navigate('/results')
  };
  return (
    <div className="app">
        <div className="loader-background off">
          <div className="loader"></div> 
        </div>
      <form className="app-form">
        <h1 style={{ textDecoration: "underline" }}>Syllabus Dissector</h1>
        <p>Enter the url to your syllabus below</p>
        <input type="text" id="test-url" placeholder="URL"/>
        <p id="error-msg"></p>
        {/* <input type="file" id="test-file" placeholder="Upload a file" /> */}
        {/* <DragDrop /> */}
        {/* <button type='submit' onClick={(e)=> handleClick(e)}>submit</button> */}
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
