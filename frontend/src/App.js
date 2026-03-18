import React, { useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import "./App.css";

function App() {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("print('hello')");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [activeTab, setActiveTab] = useState("code");

  const runCode = async () => {
    try {
      const res = await axios.post("http://localhost:5000/execute", {
        language,
        code,
        input
      });
      setOutput(res.data.output || res.data.errors);
      setActiveTab("output");
    } catch (err) {
      setOutput("Error connecting to backend");
      setActiveTab("output");
    }
  };

  return (
    <div className="container">
      <h1 className="title">🌐 Online Code Editor</h1>

      <div className="controls">
        <label>Language:</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
        </select>
      </div>

      <div className="tabs">
        <button onClick={() => setActiveTab("code")}>Code</button>
        <button onClick={() => setActiveTab("input")}>Input</button>
        <button onClick={() => setActiveTab("output")}>Output</button>
      </div>

      {activeTab === "code" && (
        <Editor
          height="400px"
          language={language === "python" ? "python" : "javascript"}
          value={code}
          onChange={(value) => setCode(value)}
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true,
            scrollBeyondLastLine: false,
            wordWrap: "on"
          }}
        />
      )}

      {activeTab === "input" && (
        <textarea
          className="inputBox"
          placeholder="Enter input here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      )}

      {activeTab === "output" && (
        <div className="output">
          <h3>Output:</h3>
          <pre>{output}</pre>
        </div>
      )}

      <button className="runBtn" onClick={runCode}>▶ Run</button>

      <div className="statusBar">
        <span>🕒 {new Date().toLocaleTimeString()}</span>
        <span>🔗 Backend: Connected</span>
        <span>💻 Language: {language}</span>
      </div>
    </div>
  );
}

export default App;
