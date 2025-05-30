import { useState, useRef } from "react";
import { AddTest, GetTests } from "../wailsjs/go/backend/App";

function App() {
  const [err, setErr] = useState(false);
  const [tests, setTests] = useState([]);
  const txtRef = useRef(null);
  const [msg, setMsg] = useState("");

  const addTest = () => {
    AddTest(txtRef.current.value).then((errored) => setErr(errored));
  };

  return (
    <div id="App">
      <br />
      <input type="text" ref={txtRef} />
      <br />
      <button onClick={addTest}>Add test</button>
      <br />
      <div>Errored: {err ? "added" : "failed"}</div>
      <br />
      <br />
      <button
        onClick={() =>
          GetTests().then((tests) => {
            setTests(tests);
            setMsg(tests);
          })
        }
      >
        Get Tests
      </button>
      <div>
        Tests:{" "}
        {tests.map((test, idx) => (
          <div key={idx}>
            {idx}: {test}
          </div>
        ))}
      </div>
      <br />
      <br />
      <br />
      <div>Message {msg}</div>
    </div>
  );
}

export default App;
