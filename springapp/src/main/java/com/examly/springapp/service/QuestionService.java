package com.examly.springapp.service;

import com.examly.springapp.model.Question;
import com.examly.springapp.model.Exam;
import com.examly.springapp.repository.QuestionRepository;
import com.examly.springapp.repository.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.examly.springapp.dto.QuestionDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Service
public class QuestionService {

@Autowired
private QuestionRepository questionRepository;

@Autowired
private ExamRepository examRepository;

public List<Question> getQuestionsByExamId(Long examId) {
return questionRepository.findByExam_ExamId(examId);
}

public Question addQuestion(QuestionDTO questionDTO) {
Exam exam = examRepository.findById(questionDTO.getExamId())
.orElseThrow(() -> new RuntimeException("Exam not found"));

Question question = new Question();
question.setQuestionText(questionDTO.getQuestionText());
question.setOptionA(questionDTO.getOptionA());
question.setOptionB(questionDTO.getOptionB());
question.setOptionC(questionDTO.getOptionC());
question.setOptionD(questionDTO.getOptionD());
question.setCorrectAnswer(questionDTO.getCorrectAnswer());
question.setTopic(questionDTO.getTopic());
question.setDifficulty(questionDTO.getDifficulty());
question.setImageUrl(questionDTO.getImageUrl());
question.setExam(exam);

return questionRepository.save(question);
}

public Page<Question> getAllQuestions(Pageable pageable) {
return questionRepository.findAll(pageable);
}

public Question getQuestionById(Long id) {
return questionRepository.findById(id)
.orElseThrow(() -> new RuntimeException("Question not found with ID: " + id));
}

public void deleteQuestion(Long id) {
if (!questionRepository.existsById(id)) {
throw new RuntimeException("Question not found with ID: " + id);
}
questionRepository.deleteById(id);
}
}
