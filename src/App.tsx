import React, { useState } from "react";
import Notepad from "./components/Notepad";
import Sketchpad from "./components/Sketchpad";

function App(): JSX.Element {
    const [toggled, setToggled] = useState<boolean>(false);

    const toggleDrawing = (event: React.MouseEvent) => {
        setToggled(!toggled);
    };

    return (
        <div className="app-container">
            <main>{toggled ? <Sketchpad /> : <Notepad />}</main>
            <div className="pen">
                {toggled ? (
                    <div
                        className="button clicked"
                        onClick={toggleDrawing}
                    ></div>
                ) : (
                    <div className="button" onClick={toggleDrawing}></div>
                )}
                <div className="button-thing"></div>
                <div className="line"></div>
                <div className="cone">
                    <div className="triangle"></div>
                </div>
                <div className="point"></div>
            </div>
        </div>
    );
}

export default App;
