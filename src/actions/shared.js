import { getBaslangicData } from '../utils/api';
import { setLoginUser } from './loginUser'
import { getTumSorular } from './sorular'
import { getTumKullanicilar } from './kullanicilar'
import { showLoading, hideLoading} from 'react-redux-loading'

// export function handleBaslangicData() {
  
//   return dispatch => {
//     return getBaslangicData().then(({ users, questions }) => {
//         dispatch(getTumSorular(questions));
//         dispatch(getTumKullanicilar(users));
//         dispatch(setLoginUser('johndoe'))
    
//     });
//   };
// }

export function handleBaslangicData(){
  return(dispatch)=>{
    // Stating the state starting show loading bar! 
    dispatch(showLoading());
      return getBaslangicData()
        .then(({users,questions})=>{
          // I have the data now set the store 
          dispatch(getTumKullanicilar(users));      
        dispatch(getTumSorular(questions));
        // My process is finishedd hide loading bar ! 
        dispatch(hideLoading())
      }
      )
  }
}