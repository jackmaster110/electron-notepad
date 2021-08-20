import React, { useEffect, useRef, useState } from "react";
import Canvas from "./Canvas";
import $ from "jquery";

function Sketchpad(): JSX.Element {
    const sketchPadRef = useRef<HTMLDivElement>();
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);

    useEffect(() => {
        setHeight(sketchPadRef.current.offsetHeight);
        setWidth(sketchPadRef.current.offsetWidth);
    }, [sketchPadRef])

    return (
        <div ref={sketchPadRef} className="sketchpad">
            <Canvas
                width={width}
                height={height}
            />
        </div>
    );
}

export default Sketchpad;
