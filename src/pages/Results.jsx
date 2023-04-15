import react, { useContext } from "react"
import { Context } from "../store/AppContext"

// OPEN AI 
import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function testGPT(input) {
  let box = document.getElementById('gpt-result')
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: input,
    temperature: 0.7,
    max_tokens: 500,
  });
  let clean = response.data.choices[0].text.split('\n\n')
  console.log(clean);
  return clean
  //box.innerHTML = response.data
}

const Results = () => {
  let {results, setResults} = useContext(Context)
  const [response, setResponse] = useState([])

  let resultInfo = results.store.results
  const handleSubmit =  async (e) => {
    e.preventDefault()
    let input = document.getElementById('gpt-input').value
    let res = await testGPT(input)
    setResponse(res)
  }

  const makeDivBlock = (arr, k) => {
    return <div key={k} className="res-block">
      {arr.map((res, i) => {return <p className="res-block-p" key={i}> {res} </p> } ) }
    </div>
  }

  
  // enter on textarea calles btn
  // let userInput = document.getElementById('gpt-input')
  // userInput.addEventListener("keypress", (e) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     document.getElementById("btn-prompt").click();
  //   }
  // })
  
  return (
    <div className="results">
      {resultInfo.length > 0 && 
        <div className="results-left">
        {resultInfo.map((item,idx) => {
          return (  
           <div className="card" key={idx}>
            <p><strong>{item.key ? item.key.content : ""}</strong></p>
            <p>{item.value ? item.value.content : ""}</p>
           </div>
          )
        })}
      </div>
      }
      <div className="results-right">
        <form onSubmit={e => handleSubmit(e)} className="gpt-propmt">
          {/* <input type="textarea" id="gpt-input" placeholder="prompt?..."/> */}
          <textarea 
            name="promp" 
            id="gpt-input" 
            cols="30" rows="3" 
            placeholder="Ex. tell me about ARH1000 from MDC"
          ></textarea>
          {/* <input type="submit" value="Submit" /> */}
          <button id="btn-prompt" type="submit" value='Submit'><i className="fa-regular fa-paper-plane"></i></button>
        </form>
        <div className="gpt-result">
          {response.length > 0 ? 
            response.map((r, i) => {
              let res = r.split('\n')
              return makeDivBlock(res, i)
            }) :
            <p id="empty">Ask about the side results</p>
          }
        </div>
      </div>
    </div>
  )
}

export default Results