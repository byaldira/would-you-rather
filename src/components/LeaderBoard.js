import { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form,Button,Media ,Container,Row,Col,Image} from 'react-bootstrap'

class LeaderBoard extends Component{
    render(){
        const { loginUser, kullanicilar  } = this.props;
      
        if (loginUser === null) {
            return <Redirect to='/' />
        }

        return(
            <Fragment>
                 <Container className="mt-2">
                     { kullanicilar && kullanicilar.map((kullanici,index) => (
                        <Row key={kullanici.id}>
                        <Col md={2}>
                            <Image thumbnail  src={kullanici.avatarURL} rounded />
                        </Col>
                        <Col md={10}>
                            <div>
                            <Media>
                            <Media.Body>
                                <Row>
                                    <Col md={12}>
                                      <h5>{ kullanici.name }  </h5>
                                    </Col>
                                    <Col md={12}>
                                        <h5>Answered Questions &nbsp;
                                            <span> {kullanici.answeredQuestions}</span>
                                        </h5>
                                    </Col>
                                    <Col md={12}>
                                        <h5>Created Question &nbsp;
                                        <span>{kullanici.createdQuestions}</span>
                                        </h5>
                                    </Col>
                                    <Col md={12} className="float-right">
                                        <h5>Score</h5> 
                                        <h2>{kullanici.score}</h2>
                                    </Col>
                                </Row>
                         <hr/>
                            </Media.Body>
                            </Media>
                            </div>
                        </Col>
                    </Row>
                     )) }
                    
                </Container>
            </Fragment>
        )
    }
}


function mapStateToProps({kullanicilar , loginUser}) {
    let kullaniciScorelari = [];
  
    Object.entries(kullanicilar).forEach(
      ([key, value]) => {
        
                kullaniciScorelari.push({
                id: value.id,
                name: value.name,
                avatarURL: value.avatarURL,
                answeredQuestions: Object.entries(value.answers).length,
                createdQuestions: value.questions.length,
                score: Object.entries(value.answers).length + value.questions.length,
          })
      }
     )

     return {
        kullanicilar: kullaniciScorelari.sort((a,b) => b.score - a.score),
        loginUser
    } 
}
export default connect(mapStateToProps)(LeaderBoard);