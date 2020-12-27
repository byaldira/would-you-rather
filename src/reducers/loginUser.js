import {  LOG_IN_USER } from "../actions/loginUser";

export default function loginUser(state = null , action){
    switch (action.type) {
        case LOG_IN_USER:
            return action.userid;
        default:
            return state;
    }
}