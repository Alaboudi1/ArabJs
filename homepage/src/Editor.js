import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import "codemirror/keymap/sublime";
import "codemirror/theme/liquibyte.css";
export default function Editor({ code, editorRef }) {


    return (
        <>
            <CodeMirror
                value={code}
                height={300}
                options={{
                    theme: "liquibyte",
                    keyMap: "sublime",
                    mode: "js",
                    direction: "rtl",
                    rtlMoveVisually: true
                }}
                ref={editorRef}
            />

        </>

    )


}

