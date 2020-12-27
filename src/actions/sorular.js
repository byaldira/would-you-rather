import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { kaydetSoru, kaydetSoruCevap } from '../utils/api';
import { KullaniciSorusunaCevapVer , addSoruToKullanici  } from './kullanicilar'

export const GET_TUM_SORULAR = 'GET_TUM_SORULAR'
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER'
export const YENI_SORU = 'YENI_SORU'

export function addQuestionAnswer(authedUser,qid,answer){
    return{
        type: ADD_QUESTION_ANSWER,
        authedUser,
        qid,
        answer,
    }
}

// For Adding a new question 
export function addYeniSoru (question){
    return{
        type: YENI_SORU,
        question,
    }
  }

export function getTumSorular(sorular)
{
    return {
        type : GET_TUM_SORULAR,
        sorular
    }
}


export function handleAddAnswer(id,cevap){

    return (dispatch, getState) => {
        const { loginUser } = getState();
        const authedUser = loginUser;
        const qid = id;
        const answer = cevap;
        dispatch(showLoading());
        return kaydetSoruCevap({
            authedUser,
            qid,
            answer
        }).then(() => { 
             dispatch(addQuestionAnswer(authedUser, qid, answer))
             dispatch(KullaniciSorusunaCevapVer(authedUser, qid, answer))
             console.log('İşlem sonunda başarılı geldi.')
         })
        .then(() => dispatch(hideLoading()))

    }
}

//To add new question and assing to user 
// export function handleAddYeniSoru (opsiyonBir, opsiyonIki) {
//     return (dispatch, getState) => {
//         const { loginUser } = getState();
      
//         dispatch(showLoading());
    
//         return kaydetSoru({
//             optionOneText: opsiyonBir,
//             optionTwoText: opsiyonIki,
//             author : loginUser,
//         }).then((question) => {
//                // console.log('Soru kaydedildi şimdi state e ekle.')
//                //dispatch(addYeniSoru(question)) 
//                //dispatch(addSoruToKullanici(question)) 
//                 //console.log('Soru başarıyla eklendi yiğidim.')
//             })
//             .then(() => dispatch(hideLoading()))
//   }
// }
export function handleAddQuestion (optionOne, optionTwo) {
    return (dispatch, getState) => {
        const { loginUser } = getState();
      
        dispatch(showLoading());
    
        return kaydetSoru({
          optionOneText: optionOne,
            optionTwoText: optionTwo,
            author : loginUser,
      })
        .then((question) => {
        dispatch(addYeniSoru(question)) 
        dispatch(addSoruToKullanici(question)) })
        .then(() => dispatch(hideLoading()))
  }
}