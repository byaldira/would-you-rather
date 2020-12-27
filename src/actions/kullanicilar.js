export const GET_TUM_KULLANICILAR = 'GET_TUM_KULLANICILAR'
export const ANSWER_QUESTION_TO_USER = 'ANSWER_QUESTION_TO_USER'
export const KULLANICIYA_SORU_EKLE = 'KULLANICIYA_SORU_EKLE'

export function getTumKullanicilar(kullanicilar){
    return {
        type : GET_TUM_KULLANICILAR,
        kullanicilar
    }
} 

export function KullaniciSorusunaCevapVer (authedUser, qid, answer) {
	return {
    	type: ANSWER_QUESTION_TO_USER,
      	authedUser,
      	qid,
      	answer
    }
}

export function addSoruToKullanici(question) {
    return {
    	type: KULLANICIYA_SORU_EKLE,
      	question,
    }
}