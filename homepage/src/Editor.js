import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import "codemirror/keymap/sublime";
import "codemirror/theme/liquibyte.css";
export default function Editor({ code, editorRef, direction, rtlMoveVisually, readOnly }) {


    return (
        <>
            <CodeMirror
                value={code}
                height={300}
                options={{
                    theme: "liquibyte",
                    keyMap: "sublime",
                    mode: "js",
                    direction,
                    rtlMoveVisually,
                    readOnly

                }}
                
                ref={editorRef}
            />

        </>

    )


}

