import { useEffect } from "react";
import { isDataView } from "util/types";

export default function useDoodle(): [() => void, () => void, () => string] {
  let isDrawing = false;
  function undo() {
    console.log("undo");
  }

  function clear() {
    const canvas: HTMLCanvasElement = document.getElementById(
      "doodleCanvas"
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    ctx!.beginPath();
    ctx!.clearRect(0, 0, canvas.width, canvas.height);
    ctx!.beginPath();
    const dim = Math.min(500, window.innerWidth);
    const canvasSide = dim - 4;
    ctx!.rect(-5, -5, canvasSide + 10, canvasSide + 10);
    ctx!.fillStyle = "white";
    ctx!.fill();
    ctx!.closePath();
  }

  function getImg() {
    const canvas: HTMLCanvasElement = document.getElementById(
      "doodleCanvas"
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    return canvas.toDataURL("image/jpeg", 1.0);
  }

  useEffect(() => {
    const canvas: HTMLCanvasElement = document.getElementById(
      "doodleCanvas"
    ) as HTMLCanvasElement;

    const ctx = canvas.getContext("2d");

    // bit odd but 20 is for the border
    const dim = Math.min(400, window.innerWidth - 20);
    const canvasSide = dim - 4;

    canvas.width = canvasSide;
    canvas.height = canvasSide;

    const lineWidth = 8;

    ctx!.beginPath();
    ctx!.rect(-5, -5, canvasSide + 10, canvasSide + 10);
    ctx!.fillStyle = "white";
    ctx!.fill();
    ctx!.closePath();

    function getTouchCoords(e: TouchEvent) {
      // get offset
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY - rect.y,
      };
    }

    // touch events
    canvas.addEventListener("touchstart", (e) => {
      e.preventDefault();
      const { x, y } = getTouchCoords(e);
      ctx?.beginPath();
      ctx?.moveTo(x, y);
    });

    canvas.addEventListener("touchmove", (e) => {
      ctx!.lineWidth = lineWidth;
      ctx!.lineCap = "round";
      const { x, y } = getTouchCoords(e);
      ctx?.lineTo(x, y);
      ctx?.stroke();
    });

    canvas.addEventListener("touchend", (e) => {
      // ctx?.closePath();
    });

    // mouse events
    canvas.addEventListener("mousedown", (e) => {
      ctx?.beginPath();
      ctx?.moveTo(e.offsetX, e.offsetY)

      isDrawing = true;
    })

    canvas.addEventListener("mouseup", (e) => {
      ctx?.closePath();
      isDrawing = false;
    })

    canvas.addEventListener("mousemove", (e) => {
      if(!isDrawing) {
        return
      }
      ctx?.lineTo(e.offsetX, e.offsetY);
      ctx?.stroke();
      ctx!.lineWidth = lineWidth;
      ctx!.lineCap = "round";

    })

    return () => {
      // canvas.removeEventListener()
    };
  }, []);

  return [undo, clear, getImg];
}
