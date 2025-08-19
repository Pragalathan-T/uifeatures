import React from 'react';

export default class ErrorBoundary extends React.Component {
constructor(props) {
super(props);
this.state = { hasError: false, error: null };
}
static getDerivedStateFromError(error) {
return { hasError: true, error };
}
componentDidCatch(error, info) {
console.error('App error:', error, info);
}
render() {
if (this.state.hasError) {
return (
<div style={{ padding: 24 }}>
<h1>Something went wrong</h1>
<pre style={{ whiteSpace: 'pre-wrap', color: '#b91c1c', background: '#fee2e2', padding: 12, borderRadius: 8 }}>
{String(this.state.error)}
</pre>
</div>
);
}
return this.props.children;
}
}