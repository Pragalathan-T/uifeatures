import React from 'react';

export default function Contact() {
return (
<div style={{ padding: 24, maxWidth: 720, margin: '0 auto' }}>
<h1>Contact</h1>
<p style={{ color: '#4b5563' }}>
For any assistance or queries, email us at
{' '}<a href="mailto:support@onlineexam.example">support@onlineexam.example</a>.
</p>
<div className="card" style={{ marginTop: 16 }}>
<h3>Support Hours</h3>
<p>Mon–Fri, 9:00–17:00 (UTC)</p>
<p>Average response time: within 1 business day</p>
</div>
</div>
);
}
