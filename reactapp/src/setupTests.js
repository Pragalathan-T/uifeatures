import { RouterProvider } from 'react-router-dom';
import '@testing-library/jest-dom';
// OR a quick global approach (prefer in setupTests.js)
globalThis.__react_router_future__ = {
  v7_startTransition: true,
    v7_relativeSplatPath: true,
    };
// jsdom's window.confirm exists but is not implemented; always mock it
// Ensure confirm returns true so flows that require confirmation proceed
// eslint-disable-next-line no-undef
window.confirm = jest.fn(() => true);

// Stub Canvas API on the DOM prototype so libraries using <canvas> won't crash
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: () => ({
    fillRect: () => {},
    clearRect: () => {},
    getImageData: () => ({ data: [] }),
    putImageData: () => {},
    createImageData: () => [],
    setTransform: () => {},
    drawImage: () => {},
    save: () => {},
    fillText: () => {},
    restore: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    closePath: () => {},
    stroke: () => {},
    translate: () => {},
    scale: () => {},
    rotate: () => {},
    arc: () => {},
    fill: () => {},
    measureText: () => ({ width: 0 }),
    transform: () => {},
    rect: () => {},
    clip: () => {},
  }),
});