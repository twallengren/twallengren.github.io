/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useRef, useEffect } from 'react';

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const AnimatedCanvas = () => {
  const canvasRef = useRef(null);
  const gridRef = useRef(new Map());

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvasSize();

    const N = 150;
    const M = 100;
    const T = 150;
    const borderWidth = 0.1; // The border width used in clearRect

    let xSquare = canvas.width / N;
    let ySquare = canvas.height / M;

    const drawSquare = (x, y) => {
      context.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      context.strokeRect(x, y, xSquare, ySquare);
    };

    const clearSquare = (x, y) => {
      context.clearRect(x - borderWidth, y - borderWidth, xSquare + 2 * borderWidth, ySquare + 2 * borderWidth);
    };

    const handleMouseMove = (event) => {
      handleInteraction(event.clientX, event.clientY);
    };

    const handleTouchMove = (event) => {
      const touch = event.touches[0];
      handleInteraction(touch.clientX, touch.clientY);
    };

    const handleInteraction = (clientX, clientY) => {
      const adjustedX = clientX + window.scrollX;
      const adjustedY = clientY + window.scrollY;

      const gridX = Math.floor(adjustedX / xSquare);
      const gridY = Math.floor(adjustedY / ySquare);

      const mapKey = `${gridX},${gridY}`;

      if (gridX >= 0 && gridX < N && gridY >= 0 && gridY < M) {
        let cell = gridRef.current.get(mapKey) || {
          position: { x: gridX * xSquare, y: gridY * ySquare },
          state: 'off',
          time: 0
        };
        cell.state = 'on';
        cell.time = Date.now();
        gridRef.current.set(mapKey, cell);

        drawSquare(cell.position.x, cell.position.y);
      }
    };

    const updateGrid = () => {
      const now = Date.now();
      const keysToDelete = new Set();
      const keysToCreate = new Set();

      gridRef.current.forEach((cell, key) => {
        if (now - cell.time > T) {
          keysToDelete.add(key);
          return;
        }

        const [x, y] = key.split(',').map(Number);
        let neighborCount = 0;

        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const neighborKey = `${x + i},${y + j}`;
            if (gridRef.current.has(neighborKey)) {
              if (gridRef.current.get(neighborKey).state === 'on') neighborCount++;
            } else if (x + i >= 0 && x + i < N && y + j >= 0 && y + j < M) {
              keysToCreate.add(neighborKey);
            }
          }
        }

        const liveCellShouldLive = cell.state === 'on' && (neighborCount === 2 || neighborCount === 3);
        const deadCellShouldLive = cell.state === 'off' && neighborCount === 3;

        if (!liveCellShouldLive && !deadCellShouldLive) keysToDelete.add(key);
        if (deadCellShouldLive) cell.state = 'on';

        if (cell.state === 'on') drawSquare(cell.position.x, cell.position.y);
      });

      keysToCreate.forEach(key => {
        const [x, y] = key.split(',').map(Number);
        let neighborCount = 0;

        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const neighborKey = `${x + i},${y + j}`;
            if (gridRef.current.has(neighborKey)) {
              if (gridRef.current.get(neighborKey).state === 'on') neighborCount++;
            }
          }
        }

        const shouldLive = neighborCount === 3;
        const cell = {
          position: { x: x * xSquare, y: y * ySquare },
          state: shouldLive ? 'on' : 'off',
          time: now
        };

        if (shouldLive) drawSquare(cell.position.x, cell.position.y);

        gridRef.current.set(key, cell);
      });

      keysToDelete.forEach(key => {
        const cell = gridRef.current.get(key);
        clearSquare(cell.position.x, cell.position.y);
        gridRef.current.delete(key);
      });
    };

    const handleResize = () => {
      updateCanvasSize();
      xSquare = canvas.width / N;
      ySquare = canvas.height / M;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('resize', handleResize);

    const intervalId = setInterval(updateGrid, 100);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <Canvas ref={canvasRef} />;
};

export default AnimatedCanvas;
