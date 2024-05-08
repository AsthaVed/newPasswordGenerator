import { useCallback, useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  // useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "1234567890"
    if(charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])  

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()  //select the content you copied
    passwordRef.current?.setSelectionRange(0,3)   //select the value but in range
    window.navigator.clipboard.writeText(password)
  }, [password])

    useEffect(() => {
      passwordGenerator()
    }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className="text">
        <div>
          <h1>Password Generator</h1>
          <input className='input' type="text" value={password} placeholder='Password' readOnly ref={passwordRef}/>
          <button className='btn' onClick={copyPasswordToClipboard}>copy</button>
        </div>
        <div class="flx">
          <div>
            <input type='range' min={6} max={100} value={length} className='range' onChange={(e) => {setLength(e.target.value)}}/>
            <label>Length: {length}</label>
          </div>
          <div>
            <input type="checkbox" defaultChecked={numberAllowed} id='numberInput' onChange={() => {setNumberAllowed((prev) => !prev)}}/>
            <label>Numbers</label>
          </div>
          <div>
            <input type="checkbox" defaultChecked={charAllowed} id='charInput' onChange={() => {setCharAllowed((prev) => !prev)}}/>
            <label>Special Chars</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
