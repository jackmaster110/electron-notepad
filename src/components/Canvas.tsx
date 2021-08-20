import React, { useCallback, useEffect, useRef, useState } from "react";

interface CanvasProps {
    width: number;
    height: number;
}

type Coordinate = {
    x: number;
    y: number;
};

function Canvas(props: CanvasProps): JSX.Element {
    const canvasRef = useRef<HTMLCanvasElement>();
    const [isPainting, setIsPainting] = useState<boolean>(false);
    const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(
        undefined
    );

    const startPaint = useCallback((event: MouseEvent) => {
        const coordinates = getCoordinates(event);
        if (coordinates) {
            setIsPainting(true);
            setMousePosition(coordinates);
        }
    }, []);

    const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
        if (!canvasRef.current) {
            return;
        }

        const canvas: HTMLCanvasElement = canvasRef.current;
        return {
            x: event.pageX - canvas.offsetLeft,
            y: event.pageY - canvas.offsetTop,
        };
    };

    const paint = useCallback(
        (event: MouseEvent) => {
            if (isPainting) {
                const newMousePosition = getCoordinates(event);
                if (mousePosition && newMousePosition) {
                    drawLine(mousePosition, newMousePosition);
                    setMousePosition(newMousePosition);
                }
            }
        },
        [isPainting, mousePosition]
    );

    const drawLine = (
        originalMousePosition: Coordinate,
        newMousePosition: Coordinate
    ) => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        const context = canvas.getContext("2d");
        if (context) {
            context.strokeStyle = "black";
            context.lineJoin = "round";
            context.lineWidth = 5;

            context.beginPath();
            context.moveTo(originalMousePosition.x, originalMousePosition.y);
            context.lineTo(newMousePosition.x, newMousePosition.y);
            context.closePath();

            context.stroke();
        }
    };

    const exitPaint = useCallback(() => {
        setIsPainting(false);
    }, []);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.addEventListener("mousedown", startPaint);
        return () => {
            canvas.removeEventListener("mousedown", startPaint);
        };
    }, [startPaint]);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.addEventListener("mousemove", paint);
        return () => {
            canvas.removeEventListener("mousemove", paint);
        };
    }, [paint]);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.addEventListener("mouseup", exitPaint);
        canvas.addEventListener("mouseleave", exitPaint);
        return () => {
            canvas.removeEventListener("mouseup", exitPaint);
            canvas.removeEventListener("mouseleave", exitPaint);
        };
    }, [exitPaint]);

    return (
        <canvas
            ref={canvasRef}
            height={props.height}
            width={props.width}
        ></canvas>
    );
}

Canvas.defaultProps = {
    width: parent.innerWidth,
    height: parent.innerHeight,
}

export default Canvas;
