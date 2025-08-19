import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
return (
<div className="min-h-screen flex flex-col bg-gradient-to-br from-[#10b981] to-[#0d9488]">
<header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
<div className="flex items-center gap-2">
<div className="h-8 w-8 rounded bg-[#2563eb] text-white grid place-items-center font-bold">OE</div>
<span className="font-semibold text-gray-900">Online Exam Portal</span>
</div>
<nav className="flex items-center gap-6 text-sm">
<Link to="/" className="text-gray-700 hover:text-[#2563eb]">Home</Link>
<Link to="/student-exams" className="text-gray-700 hover:text-[#2563eb]">Exams</Link>
<Link to="/login" className="text-gray-700 hover:text-[#2563eb]">Login</Link>
<Link to="/register" className="inline-flex items-center rounded-full bg-[#2563eb] px-4 py-2 text-white hover:bg-[#1e40af] transition">Register</Link>
</nav>
</div>
</header>

<section className="relative">
<div className="absolute inset-0 opacity-10" aria-hidden>
<svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 800 400">
<defs>
<linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
<stop stopColor="#fff" offset="0"/>
<stop stopColor="#fff" offset="1"/>
</linearGradient>
</defs>
<circle cx="120" cy="80" r="60" fill="url(#g)" />
<rect x="500" y="40" width="140" height="90" rx="12" fill="url(#g)" />
<path d="M40 320h160l-20 40H20z" fill="url(#g)"/>
</svg>
</div>
<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
<div className="grid lg:grid-cols-2 gap-10 items-center">
<div>
<h1 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight">Smart Online Exam Platform</h1>
<p className="mt-4 text-white/90 text-lg">Create, deliver, and analyze exams effortlessly with a secure, modern, and scalable platform.</p>
<div className="mt-8 flex flex-wrap gap-3">
<Link to="/register" className="inline-flex items-center rounded-full bg-white text-[#2563eb] px-6 py-3 font-semibold shadow hover:shadow-md transition hover:bg-gray-50">Get Started</Link>
<Link to="/about" className="inline-flex items-center rounded-full border border-white/70 text-white px-6 py-3 font-semibold hover:bg-white/10 transition">Learn More</Link>
</div>
</div>
<div className="relative">
<div className="grid grid-cols-3 gap-4 text-white">
<div className="col-span-1 rounded-xl bg-white/10 p-4 shadow-lg backdrop-blur">
<div className="text-3xl">�</div>
<div className="mt-2 font-semibold">Create Exams</div>
<p className="text-sm text-white/80">Design exams with flexible question types.</p>
</div>
<div className="col-span-1 rounded-xl bg-white/10 p-4 shadow-lg backdrop-blur">
<div className="text-3xl">�</div>
<div className="mt-2 font-semibold">Take Exams</div>
<p className="text-sm text-white/80">Secure, distraction-free test experience.</p>
</div>
<div className="col-span-1 rounded-xl bg-white/10 p-4 shadow-lg backdrop-blur">
<div className="text-3xl">📊</div>
<div className="mt-2 font-semibold">View Results</div>
<p className="text-sm text-white/80">Instant insights and analytics.</p>
</div>
</div>
</div>
</div>
</div>
</section>

<section className="bg-white">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
<h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">Why educators choose us</h2>
<div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
{[
{ title: 'Fast setup', desc: 'Get started in minutes with intuitive workflows.', icon: '⚡' },
{ title: 'Secure & fair', desc: 'Built-in measures to keep assessments honest.', icon: '🔒' },
{ title: 'Actionable analytics', desc: 'Understand performance with clear dashboards.', icon: '📈' },
].map((f, idx) => (
<div key={idx} className="group bg-white rounded-xl shadow-sm ring-1 ring-gray-200 p-6 transition hover:shadow-md hover:-translate-y-0.5">
<div className="text-3xl">{f.icon}</div>
<div className="mt-3 font-semibold text-gray-900">{f.title}</div>
<p className="mt-1 text-sm text-gray-600">{f.desc}</p>
<div className="mt-6 opacity-80">
<svg className="w-full h-16" viewBox="0 0 200 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="8" y="18" width="60" height="28" rx="6" fill="#e5edff" />
<circle cx="120" cy="32" r="16" fill="#e5edff" />
<path d="M160 40h28l-4 8h-28z" fill="#e5edff" />
</svg>
</div>
</div>
))}
</div>
</div>
</section>

<footer className="bg-white border-t border-gray-200">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
<div className="text-sm text-gray-600">© Online Exam Portal</div>
<div className="flex items-center gap-6 text-sm">
<Link to="/about" className="text-gray-700 hover:text-[#2563eb]">About Us</Link>
<Link to="/help" className="text-gray-700 hover:text-[#2563eb]">Support</Link>
</div>
</div>
</footer>
</div>
);
}