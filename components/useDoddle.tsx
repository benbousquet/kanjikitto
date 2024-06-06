import { useEffect, useState } from "react";

export default function useDoodle(): [() => void, () => void, () => string] {
  const [lines, setLines] = useState([]);

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

    const dim = Math.min(400, window.innerWidth);
    const canvasSide = dim - 4;

    canvas.width = canvasSide;
    canvas.height = canvasSide;

    const lineWidth = 8;

    ctx!.beginPath();
    ctx!.rect(-5, -5, canvasSide + 10, canvasSide + 10);
    ctx!.fillStyle = "white";
    ctx!.fill();
    ctx!.closePath();

    function getCoords(e: TouchEvent) {
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
      const { x, y } = getCoords(e);
      ctx?.beginPath;
      ctx?.moveTo(x, y);
    });

    canvas.addEventListener("touchmove", (e) => {
      ctx!.lineWidth = lineWidth;
      ctx!.lineCap = "round";
      const { x, y } = getCoords(e);
      ctx?.lineTo(x, y);
      ctx?.stroke();
    });

    canvas.addEventListener("touchend", (e) => {
      // ctx?.closePath();
    });

    return () => {
      // canvas.removeEventListener()
    };
  }, []);

  return [undo, clear, getImg];
}
