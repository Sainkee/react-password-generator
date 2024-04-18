import { useState, useEffect, useCallback, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [passWord, setPassWord] = useState("");
  const [char, setChar] = useState(false);
  const [number, setNumber] = useState(false);
  const [clicked, setClicked] = useState(false);
  const passWordInputRef = useRef(null);

  let passWordGenerator = useCallback(() => {
    let word = "";
    let str = "wertyuiopasdfghjklzxcvbnm";
    if (char) str += "@#$%^&!";
    if (number) str += "1234567890";

    for (let index = 1; index <= length; index++) {
      let idx = Math.floor(Math.random() * str.length + 1);
      word += str.charAt(idx);
    }
    setPassWord(word);
  }, [length, char, number,setPassWord]);

  useEffect(() => {
    passWordGenerator();
  }, [passWordGenerator]);

  let copyPassword = () => {
    window.navigator.clipboard.writeText(passWord);
    passWordInputRef.current.select();
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 500);
  };

  return (
    <div className=" bg-slate-500 mt-16 p-4  w-full max-w-md mx-auto shadow-lg text-orange-500 ">
      <h1 className=" text-2xl py-2 mb-3 text-white text-center sm:text-4xl">
        Password generator
      </h1>
      <div className=" flex my-2">
        <input
          ref={passWordInputRef}
          type="text"
          placeholder="Password"
          className=" outline-none w-full py-1 px-2"
          readOnly="true"
          value={passWord}
        />
        <button
          className={` bg-gradient-to-tr from-purple-600 to-pink-400 px-3 py-1 text-white ${
            clicked ? "animate-ping" : ""
          }`}
          onClick={copyPassword}
        >
          copy
        </button>
      </div>
      <div className="flex md:gap-8 gap-3 justify-start flex-wrap">
        <div>
          <input
            type="range"
            name="passrange"
            id="passRange"
            max={16}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-[5em] mr-2"
          />
          <label htmlFor="passRange">
            {" "}
            length: ({length < 10 ? "0" + length : length}){" "}
          </label>
        </div>

        <div>
          <input
            type="checkbox"
            name="numeric"
            id="numeric"
            className="mr-1"
            onChange={() => setNumber(!number)}
          />
          <label htmlFor="numeric">Numbers</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="character"
            id="character"
            className="mr-1"
            onChange={() => setChar(!char)}
          />
          <label htmlFor="character">Character</label>
        </div>
      </div>
    </div>
  );
}

export default App;
