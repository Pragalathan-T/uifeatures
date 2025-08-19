import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary.jsx';

function RouterSwitcher() {
const [useHash, setUseHash] = useState(true);

useEffect(() => {
if (useHash && (!window.location.hash || !window.location.hash.startsWith('#/'))){
window.location.hash = '#/';
}
}, [useHash]);

const RouterComp = useHash ? HashRouter : BrowserRouter;

return (
<RouterComp>
<ErrorBoundary onError={() => setUseHash(false)}>
<App />
</ErrorBoundary>
</RouterComp>
);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
<AuthProvider>
<RouterSwitcher />
</AuthProvider>
</React.StrictMode>
);