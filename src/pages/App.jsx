import { useNavigate } from 'react-router-dom'
import DragDrop from '../components/DragDrop'
import '../styles/button.css'

function App() {
  const navigate = useNavigate()
  const handleClick = (e) => {
    e.preventDefault()
    // let file = document.querySelector('#upload-input')
    // console.log(file.files[0].name)
    navigate('/results')
  }
  return (
    <div className="app">
      <form>
        <h1 style={{textDecoration: 'underline'}}>Syllabus Dissector</h1>
        <DragDrop/>
        {/* <button type='submit' onClick={(e)=> handleClick(e)}>submit</button> */}
        <button className='btn' style={{"--clr":"#1589FF"}}><span>Button</span><i></i></button>  
      </form>
    </div>
  )
}

export default App
