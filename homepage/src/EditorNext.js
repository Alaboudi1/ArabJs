import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup"
import { javascript } from "@codemirror/lang-javascript"
import { oneDark } from "@codemirror/theme-one-dark"
import { useEffect, useRef } from "react"
import {StreamLanguage} from "@codemirror/stream-parser"
import { arabJsMode } from "./arabJsMode"



export default function EditorNext({ code, readOnly }) {
    const editorRef = useRef(null);
    useEffect(() => {
        let editor = new EditorView({
            state: EditorState.create({
                doc: code,
                extensions: [oneDark,basicSetup,StreamLanguage.define(arabJsMode)],
                
            }),
            parent: editorRef.current,
            editable: readOnly,
        })
    }, [])


    return (
        <div ref={editorRef} style={{height:"350px"}}></div>
    )
}