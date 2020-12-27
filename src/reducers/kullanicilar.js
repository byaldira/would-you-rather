import { GET_TUM_KULLANICILAR  , ANSWER_QUESTION_TO_USER , KULLANICIYA_SORU_EKLE} from "../actions/kullanicilar";

export default function kullanicilar(state = {}, action){
    switch (action.type) {
        case GET_TUM_KULLANICILAR:
            return {
                ...state,
                ...action.kullanicilar
            }
        case ANSWER_QUESTION_TO_USER :
            return {
                ...state,
                [action.authedUser]: { 
                ...state[action.authedUser], 
                answers: {
                    ...state[action.authedUser].answers,
                        [action.qid]: action.answer
                }
                }
            }
        case KULLANICIYA_SORU_EKLE :
            return {
            ...state,
            [action.question.author]: { 
                ...state[action.question.author], 
                questions: state[action.question.author].questions.concat([action.question.id])
            }
            }
        default:
            return state;
    }
}