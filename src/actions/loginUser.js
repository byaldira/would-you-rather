export const LOG_IN_USER ='LOG_IN_USER'

export function setLoginUser( userid ){
    return {
        type:LOG_IN_USER,
        userid
    }
}