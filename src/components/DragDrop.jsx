import React, { useEffect } from 'react'

const DragDrop = () => {
    //selecting all required elements
    useEffect(()=> { 
      let dropArea = document.querySelector(".drag-area")
      let dragText = document.querySelector(".drag-area-header")
      let button = document.querySelector("#drag-area-btn")
      let input = document.querySelector("#upload-input")
      let file = null
  
      button.onclick = (e)=>{
        e.preventDefault()
        input.click(); //if user click on the button then the input also clicked
      }
  
      input.addEventListener("change", () => {
      file = input.files[0];
      console.log(file.value)
      dropArea.classList.add("active");
      });
  
      //If user Drag File Over DropArea
      dropArea.addEventListener("dragover", (e)=>{
      e.preventDefault(); 
      dropArea.classList.add("active");
      dragText.textContent = "Release to Upload File";
      });
  
      //If user leave dragged File from DropArea
      dropArea.addEventListener("dragleave", ()=>{
      dropArea.classList.remove("active");
      dragText.textContent = "Drag & Drop to Upload File";
      });
  
      //If user drop File on DropArea
      dropArea.addEventListener("drop", (e)=>{
      e.preventDefault()
      file = input.files[0]
      console.log(file)
      });
    },[])

  return (
    <div className="drag-area">
        <div className="icon"><i className="fas fa-cloud-upload-alt"></i></div>
        <header className='drag-area-header'>Drag & Drop to Upload File</header>
        <span>OR</span>
        <button id='drag-area-btn'>Browse File</button>
        <input id='upload-input' type="file" hidden />
    </div>
  )
}

export default DragDrop