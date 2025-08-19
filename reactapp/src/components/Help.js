import React from 'react';

export default function Help() {
return (
<div style={{ padding: 24, maxWidth: 720, margin: '0 auto' }}>
<h1>Help / FAQ</h1>
<div className="card" style={{ marginTop: 16 }}>
<h3>How do I register?</h3>
<p>Use the Register link in the top navigation and complete the form.</p>
</div>
<div className="card" style={{ marginTop: 16 }}>
<h3>How do I take an exam?</h3>
<p>Login as a student and go to your Dashboard   Exam List to start an available exam.</p>
</div>
<div className="card" style={{ marginTop: 16 }}>
<h3>Who can create exams?</h3>
<p>Teachers can create and manage exams from the Teacher Dashboard.</p>
</div>
</div>
);
}