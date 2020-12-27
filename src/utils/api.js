import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer
  } from './_DATA';

  export function getBaslangicData() {
    return Promise.all([_getUsers(), _getQuestions()]).then(
      ([users, questions]) => ({
        users,
        questions
      })
    );
  }

  export function kaydetSoru(info) {
    return _saveQuestion(info);
  }
  
  export function kaydetSoruCevap(info) {
    return _saveQuestionAnswer(info);
  }