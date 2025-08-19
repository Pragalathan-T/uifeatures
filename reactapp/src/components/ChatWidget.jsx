import React, { useEffect, useRef, useState } from 'react';
import api from '../utils/api';

export default function ChatWidget() {
const [open, setOpen] = useState(false);
const [messages, setMessages] = useState([
 { role: 'assistant', text: 'Hi! I can help with exams, starting tests, and results.' }
]);
const [input, setInput] = useState('');
const listRef = useRef(null);

useEffect(() => {
if (listRef.current) {
listRef.current.scrollTop = listRef.current.scrollHeight;
}
}, [messages]);

const send = async () => {
const text = input.trim();
if (!text) return;
setMessages((m) => [...m, { role: 'user', text }]);
setInput('');
try {
const userId = localStorage.getItem('username') || 'guest';
const res = await api.chatMessage({ message: text, userId });
const reply = res?.data?.reply || 'Sorry, I did not understand that.';
setMessages((m) => [...m, { role: 'assistant', text: reply }]);
} catch {
setMessages((m) => [...m, { role: 'assistant', text: 'Network error. Please try again.' }]);
}
};

return (
<div className="fixed bottom-4 right-4 z-50">
{open && (
<div className="w-80 h-96 bg-white rounded-xl shadow-lg ring-1 ring-gray-200 flex flex-col overflow-hidden">
<div className="px-4 py-2 bg-[#2563eb] text-white font-semibold">Assistant</div>
<div ref={listRef} className="flex-1 overflow-y-auto p-3 space-y-2 bg-[#f9fafb]">
{messages.map((m, idx) => (
<div key={idx} className={m.role === 'user' ? 'text-right' : 'text-left'}>
<span className={
 m.role === 'user'
 ? 'inline-block bg-[#2563eb] text-white px-3 py-2 rounded-2xl'
 : 'inline-block bg-white ring-1 ring-gray-200 text-gray-900 px-3 py-2 rounded-2xl'
}>{m.text}</span>
 </div>
))}
</div>
<div className="p-2 flex items-center gap-2 border-t">
<input
value={input}
onChange={(e) => setInput(e.target.value)}
onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
placeholder="Type your question..."
className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
/>
<button onClick={send} className="rounded-lg bg-[#2563eb] text-white px-3 py-2">Send</button>
</div>
</div>
)}

<button
onClick={() => setOpen((v) => !v)}
className="rounded-full shadow-lg bg-[#2563eb] text-white w-12 h-12 grid place-items-center hover:bg-[#1e40af]"
aria-label="Toggle chat"
>
{open ? '×' : '💬'}
</button>
</div>
);
}

