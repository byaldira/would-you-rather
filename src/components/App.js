import { Component ,Fragment } from "react";
import  { handleBaslangicData }  from '../actions/shared';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './Login'
import NotFound from './NotFound'
import Menu from './Menu'
import HomePage from './HomePage'
import QuestionPool from './QuestionPool'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'

import LoadingBar from 'react-redux-loading';

class App extends Component {
  
  componentDidMount() {
    this.props.handleBaslangicData();
  }
  
  render(){
    const { loginUser } = this.props;
    return (
    <Router>
      <Fragment>
            <Menu/>
            <LoadingBar />
      
         { 
         loginUser === null ? 
          (
            <Route render={() => ( <Login /> )} />
          ) 
          : 
          (
           
              <div>
              {
                this.props.loading === true ? null :
                <Switch>
                  <Route exact path="/" component={Login} />
                  <Route path="/newquestion" component={NewQuestion} />
                  <Route path="/questions/:question_id" component={QuestionPool} />
                  <Route path="/leaderboard" component={LeaderBoard} />
                  <Route component={NotFound} />
              </Switch>
              }
              </div>
             
           
            )} 
            </Fragment>
    </Router>
    )
  }
}
function mapStateToProps({ loginUser }) {
  return {
    loginUser
  };
}
export default connect( mapStateToProps, { handleBaslangicData })(App);
