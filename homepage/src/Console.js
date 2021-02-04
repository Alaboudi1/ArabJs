import React, { useEffect, useState } from React;
import { Console, Hook, Unhook } from 'console-feed'




export default function Console() {
    const [logs, setLogs] = useState([])

    useEffect(() => {
        Hook(window.console, log => setLogs(currLogs => [...currLogs, log]), false);
        return () => Unhook(window.console)
    }, []);


    return (
        <div style={{ backgroundColor: "#242424" }}>
            <Console filter={["log", "error", "table"]} logs={logs} variant="dark" />
        </div>
    )


}

