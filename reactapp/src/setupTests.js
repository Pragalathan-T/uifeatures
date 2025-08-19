import { RouterProvider } from 'react-router-dom';
import '@testing-library/jest-dom';
// OR a quick global approach (prefer in setupTests.js)
globalThis.__react_router_future__ = {
  v7_startTransition: true,
    v7_relativeSplatPath: true,
    };
