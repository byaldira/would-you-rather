import { Component, Fragment } from "react";
import { Route , withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import NotFound from './NotFound'
import Login from './Login'
import QuestionResult from './QuestionResult'
import Question from './Question'

class QuestionPool extends Component{
    render(){
        
        const { VarMi , CevaplanmisMi , question_id ,loginUser } = this.props
        
        console.log('Pooldayız : ')
        console.log('VarMi : ', VarMi)
        console.log('CevaplanmisMi : ' , CevaplanmisMi)
        console.log('id : ' , question_id)
        console.log('loginUser : ' , loginUser)
        

        // Kullanıcı girişi yapmadı ise buraya yönlendir.
        if(loginUser === null)
            return <Login id={question_id}/>

        if(VarMi && CevaplanmisMi ===null)
            return <NotFound/>

        if(CevaplanmisMi !== null){
            return(
                <Fragment>
                 { !CevaplanmisMi ? <Question id={question_id} /> : <QuestionResult id={question_id}/> }
                </Fragment>
            )
          
        }else {
            return(<div>....Loading....</div>)
        }
   
    }
}
function mapStateToProps ({ sorular, loginUser }, props ) {
    const { question_id } = props.match.params;
    console.log(question_id);
    const soru = sorular[question_id];
    console.log(sorular)
    console.log('soruyu buldum : ' , soru)
    return {
        question_id,
        loginUser,
        VarMi : Object.entries(sorular).length !== 0,
        CevaplanmisMi: soru
                    ? soru.optionOne.votes.includes(loginUser) || 
                    soru.optionTwo.votes.includes(loginUser)
                    : null,
        
  }
 }
export default connect(mapStateToProps)(QuestionPool)