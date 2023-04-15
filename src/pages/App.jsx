import { useNavigate } from "react-router-dom";
import DragDrop from "../components/DragDrop";
import "../styles/button.css";
import path from "path";

import { AzureKeyCredential } from "@azure/core-auth";
import { DocumentAnalysisClient } from "@azure/ai-form-recognizer";

import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const key = "8e369d92fdb04df3961dafa25fd317cb";
const endpoint = "https://hackathon-ai-miami.cognitiveservices.azure.com/";


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

async function testGPT() {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "tell me two dad jokes",
    temperature: 0,
    max_tokens: 100,
  });
  console.log(response.data.choices);
}

function App() {
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    //let url = document.querySelector('#test-url')
    // let file = document.querySelector('#test-file')
    // let url = URL.createObjectURL(file.files[0]).split(':')[1]

    // console.log(file.files)
    let keyValuePairs = await main(url);

    if (!keyValuePairs || keyValuePairs.length <= 0) {
      console.log("No key-value pairs were extracted from the document.");
    } else {
      console.log("Key-Value Pairs:", keyValuePairs);
      for (const { key, value, confidence } of keyValuePairs) {
        console.log("- Key  :", `"${key.content}"`);
        console.log(
          "  Value:",
          `"${(value && value.content) || "<undefined>"}" (${confidence})`
        );
      }
    }
    //testGPT()
    // let file = document.querySelector('#upload-input')
    // console.log(file.files[0].name)
    //navigate('/results')
  };
  return (
    <div className="app">
      <form>
        <h1 style={{ textDecoration: "underline" }}>Syllabus Dissector</h1>
        <input type="text" id="test-url" placeholder="URL" />
        <input type="file" id="test-file" placeholder="Upload a file" />
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
