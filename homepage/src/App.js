import React, { useState, useRef } from 'react';
import arabJs from "./arabJs/index";
import CodeSnippets from "./CodeSnippets";
import Editor from "./Editor";
import PlayArrow from '@material-ui/icons/PlayArrow';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import JsConsole from "./JsConsole"
// import "./styles.css";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: "green",
    color: "white",
    '&:hover': {
      color: "black",
      backgroundColor: "green",
    },
  },

}));
export default function App() {

  const classes = useStyles();

  const [code, setCode] = useState(`اطبع.نص("اهلاً بالعالم")`);
  const [target, setTarget] = useState("console");
  const editorRef = useRef(null);
  const execute = (code) => {
    if (target === "console") {
      console.log(arabJs.run(code));
    }
    else if (target === "DOM") {
      arabJs.run(code);
    }
  }
  const runCode = () => {
    const finalCode = editorRef.current.editor.getValue();
    execute(finalCode);
  }
  const targetRender = () => {
    const dom = target === "console" ? <JsConsole> </JsConsole> :
      <div className="myChart" width="400" height="400"></div>;
    return dom;
  }
  return (
    <div className="App">
      <h1>عرب.جس</h1>
      <h2>برمج جافا سكربت باللغة العربية</h2>
      <CodeSnippets onCodeChange={(code, target) => { setCode(code); setTarget(target) }}></CodeSnippets>
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<PlayArrow />}
        onClick={runCode}
      >
        نفذ البرنامج
      </Button>
      <Editor code={code} editorRef={editorRef}></Editor>
      <br/>
      {targetRender()}

    </div>

  );
}
