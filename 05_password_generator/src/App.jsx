import { useState, useCallback, useEffect ,useRef} from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

//useCallback hook in react is thst lets you cache a function definition between re-renders
//useCallback(fxn,dependencies)

function App() {
  const [length, setLengt] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef=useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    for (let index = 0; index < length; index++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);



  //passwordGenerator()->can't call here rerenders issue

  //so we have to use useEffect hook -> it helps to synchronize a componenet with an external system


  const copyPasswordToClipboard= useCallback(()=>{

    passwordRef.current?.select()

    passwordRef.current?.setSelectionRange(0,15)

    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-3xl text-center text-white my-3">
          Password Generator
        </h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">

        {/* //useRef Hook: used to take reference  */}


          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 bg-white"
            placeholder="password"
            readOnly
            ref={passwordRef}
          ></input>
          <button 
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 ">
            copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1 ">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLengt(e.target.value);
              }}
            />
            <label>length:{length}</label>
          </div>

          <div className="flex items-center gap-x-1 ">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onClick={(e) => {
                setNumberAllowed((prev) => !prev);
              }}
            ></input>
            <label>Numbers</label>
          </div>

          <div className="flex items-center gap-x-1 ">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onClick={(e) => {
                setCharAllowed((prev) => !prev);
              }}
            ></input>
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
