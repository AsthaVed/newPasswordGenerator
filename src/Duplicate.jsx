import { useCallback, useState, useEffect, useRef } from 'react'
import './App.css'
// kisi bhi chij ka reference lena ho toh useRef kaam aata h
// kisi bhi variable me change ho array me se toh vo re-render ho jaye uske kaam aata h useEffect
// kisi bhi value ko optimize krna ho jo array me ho toh useCallback kaam aata h or re-render ko stop krna ho toh it store the cache in the memory

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  // useRef hook
  const passwordRef = useRef(null)
  // jo content hum select krana chate h vo select hokr aaye toh iski help se hoga jisse user ko accha lge
  // jis bhi input se reference lena chate h use likh de ref={passwordRef}
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "1234567890"
    if(charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      console.log(char);
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])  
  // iss array me kuch bhi run ho or change ho toh y uss method ko optimize krega or run ho jaye [y fn ko run krne k sath sath usko memorise krta h means cache rkhta h]

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()  //select the content you copied
    passwordRef.current?.setSelectionRange(0,3)   //select the value but in range
    window.navigator.clipboard.writeText(password)
    // core react me window likh skte h pr yahi next.js me krna chahte h toh vo hoti h server side rendering means saara code server pr execute hoga toh server pr window object nhi hota h 
  }, [password])

    useEffect(() => {
      passwordGenerator()
    }, [length, numberAllowed, charAllowed, passwordGenerator])
    // iss array me kuch bhi change ho toh dobara se run ho jaye [rendering the code] [**jb bhi page load hota h first time y call hota h agr ek bhi dependecies me change ho toh dobara se render ho jaeiga] 

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
            {/* defaultChecked property returns the default value of the checked attribute.  */}
            {/* {setCharAllowed(("yaha prev value ka access milta h humko") => ..)} */}
            <input type="checkbox" defaultChecked={charAllowed} id='charInput' onChange={() => {setCharAllowed((prev) => !prev)}}/>
            <label>Special Chars</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
