import {GET_TUM_SORULAR , ADD_QUESTION_ANSWER , YENI_SORU} from '../actions/sorular'

export default function sorular(state = {}, action)
{
    switch (action.type) {
        case GET_TUM_SORULAR:
            return {
                ...state,
                ...action.sorular
            }
        case ADD_QUESTION_ANSWER :
            return {
                ...state,
                [action.qid]: {
                ...state[action.qid], 
                    [action.answer]: { 
                    ...state[action.qid][action.answer], 
                    votes: state[action.qid][action.answer].votes.concat([action.authedUser]) 
                    }}
            }
        case YENI_SORU :
            return {
                ...state,
                [action.question.id]: action.question,
            }
        default:
            return state;
    }    
}