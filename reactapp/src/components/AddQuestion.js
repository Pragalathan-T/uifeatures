import React, { useState } from 'react';

export default function AddQuestion({ onSave }) {
const [question, setQuestion] = useState('');
const [options, setOptions] = useState({ A: '', B: '', C: '', D: '' });
const [correct, setCorrect] = useState('A');
const [difficulty, setDifficulty] = useState('Easy');
const [image, setImage] = useState(null);

const handleSave = () => {
onSave && onSave({ question, options, correct, difficulty, image });
};

return (
<div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-white flex items-center justify-center p-4">
<div className="w-full max-w-3xl bg-white rounded-xl shadow p-6 relative overflow-hidden">
<div className="absolute right-0 top-0 opacity-10" aria-hidden>
<svg className="w-40 h-40" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="40" width="70" height="40" rx="8" fill="#2563eb" />
<circle cx="140" cy="80" r="24" fill="#2563eb" />
</svg>
</div>
<h2 className="text-2xl font-bold text-gray-900 mb-6">Add Question</h2>
<div className="grid gap-4">
<div>
<label className="block text-sm text-gray-600 mb-1">Question text</label>
<textarea className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2563eb]" rows={4} value={question} onChange={(e)=>setQuestion(e.target.value)} />
</div>
<div className="grid md:grid-cols-2 gap-4">
{(['A','B','C','D']).map(key => (
<div key={key}>
<label className="block text-sm text-gray-600 mb-1">Option {key}</label>
<input className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2563eb]" value={options[key]} onChange={(e)=>setOptions(prev=>({...prev, [key]: e.target.value}))} />
</div>
))}
</div>
<div className="grid md:grid-cols-3 gap-4">
<div>
<label className="block text-sm text-gray-600 mb-1">Correct Answer</label>
<select className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2563eb]" value={correct} onChange={(e)=>setCorrect(e.target.value)}>
<option value="A">A</option>
<option value="B">B</option>
<option value="C">C</option>
<option value="D">D</option>
</select>
</div>
<div>
<label className="block text-sm text-gray-600 mb-1">Difficulty</label>
<select className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2563eb]" value={difficulty} onChange={(e)=>setDifficulty(e.target.value)}>
<option>Easy</option>
<option>Medium</option>
<option>Hard</option>
</select>
</div>
<div>
<label className="block text-sm text-gray-600 mb-1">Optional Image</label>
<input type="file" accept="image/*" onChange={(e)=>setImage(e.target.files?.[0] || null)} className="block w-full text-sm text-gray-700" />
</div>
</div>
<div className="pt-2">
<button onClick={handleSave} className="inline-flex items-center rounded-full bg-[#2563eb] text-white px-6 py-2 hover:bg-[#1e40af] transition">
<span className="mr-2">💾</span> Save
</button>
</div>
</div>
</div>
</div>
);
}