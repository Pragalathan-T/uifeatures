// import { RouterProvider } from 'react-router-dom';
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