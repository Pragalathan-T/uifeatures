import React from 'react';
import { useLocation } from 'react-router-dom';
import './ExamDetails.css';

export default function ExamDetails({ exam: propExam }) {
	const location = useLocation();
	const exam = propExam || location.state?.exam;

	if (!exam) return <div className="exam-details"><p>No exam details available.</p></div>;

	return (
		<div className="exam-details">
			<h2>{exam.title}</h2>
			<p className="exam-details__desc">{exam.description}</p>
			<div className="exam-details__meta">
				<span>Duration: {exam.duration} minutes</span>
				<span>Created By: {exam.createdBy}</span>
				<span>Status: {exam.isActive ? 'Active' : 'Inactive'}</span>
			</div>
			{exam.instructions && (
				<div className="exam-details__box">
					<h3>Instructions</h3>
					<p>{exam.instructions}</p>
				</div>
			)}
		</div>
	);
}
