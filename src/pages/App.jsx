import { useNavigate } from 'react-router-dom'
import DragDrop from '../components/DragDrop'
import '../styles/button.css'

import { AzureKeyCredential } from '@azure/core-auth'
import { DocumentAnalysisClient } from '@azure/ai-form-recognizer'

const key = '8e369d92fdb04df3961dafa25fd317cb'
const endpoint = "https://hackathon-ai-miami.cognitiveservices.azure.com/"

// sample document
const formUrl = "C:\\xampp\\htdocs\\ea-hackathon-23\\public\\files\\ARH1000.pdf"

async function main() {
  const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));

  const poller = await client.beginAnalyzeDocumentFromUrl("syllabus-basic", formUrl);

  const {keyValuePairs} = await poller.pollUntilDone();

  if (!keyValuePairs || keyValuePairs.length <= 0) {
      console.log("No key-value pairs were extracted from the document.");
  } else {
      console.log("Key-Value Pairs:");
      for (const {key, value, confidence} of keyValuePairs) {
          console.log("- Key  :", `"${key.content}"`);
          console.log("  Value:", `"${(value && value.content) || "<undefined>"}" (${confidence})`);
      }
  }

}

function App() {
  const navigate = useNavigate()
  const handleClick = (e) => {
    e.preventDefault()
    main()
    // let file = document.querySelector('#upload-input')
    // console.log(file.files[0].name)
    //navigate('/results')
  }
  return (
    <div className="app">
      <form>
        <h1 style={{textDecoration: 'underline'}}>Syllabus Dissector</h1>
        <DragDrop/>
        {/* <button type='submit' onClick={(e)=> handleClick(e)}>submit</button> */}
        <button onClick={(e) => handleClick(e)} className='btn' style={{"--clr":"#1589FF"}}><span>Button</span><i></i></button>  
      </form>
    </div>
  )
}

export default App
