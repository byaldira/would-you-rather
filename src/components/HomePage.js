import React, { Component, Fragment } from 'react';
import { Route , withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { Navbar,Nav,NavDropdown,Form,FormControl,Button ,Card,Media ,Container,Row,Col} from 'react-bootstrap'
import Login from './Login'
import kullanicilar from '../reducers/kullanicilar';
class  HomePage extends Component{

    state ={
        tabAnswered : false,
    }

    handleUnansweredTab = (e) => {
        e.preventDefault();
        // Tab kontrolü için kontrol yap!!! 
        this.setState({
            tabAnswered: false,
        });
    };

    handleAnsweredTab = (e) => {
        e.preventDefault();
    
        // kullanıcı tab değiştirdi.
        this.setState({
            tabAnswered: true,
        });
    };

    handleViewUserPool = (e, id) => {
        debugger;
        e.preventDefault();
        // Kullanıcının sorusana redirect eder id parametresi ni geçirir. 
        this.props.history.push(`/questions/${id}`);
      };
    

    render(){
        const { tabAnswered } = this.state;
        const { cevaplanmisSorular, loginUser ,cevaplanmamisSorular,kullanicilar} = this.props;
        let sayfadaGosterilecekSorular = cevaplanmamisSorular;

        if (loginUser === null) {
            return <Login />;
          }

        if (tabAnswered) {
            sayfadaGosterilecekSorular = cevaplanmisSorular;
        }

        console.log(sayfadaGosterilecekSorular);
    
        return (
            <div>
                  <Container>
                    <Row>
                   
                        <Col md={{ span: 12 }}>
                        <Nav justify variant="tabs" defaultActiveKey="/home">
                            <Nav.Item>
                                <Nav.Link onClick={this.handleUnansweredTab} >Unanswared Questions</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={this.handleAnsweredTab}>Answared Questions</Nav.Link>
                            </Nav.Item>
                        </Nav>

                        <ul className="list-unstyled">
                            {
                                sayfadaGosterilecekSorular.map((soru) =>(
                                    <div key={soru.id}>
                                            <Media as="li" className="mt-4" >
                                                <img
                                                    width={64}
                                                    height={64}
                                                    className="mr-3"
                                                    src={kullanicilar[soru.author].avatarURL}
                                                    alt="Generic placeholder"
                                                />
                                                <Media.Body >
                                                <h5> Joe Asks : Would you rather ...  </h5>
                                                 <span>
                                                    {soru.optionOne.text}  ... <b> Or </b>
                                                 </span>
                                                 
                                                 <span>
                                                    {soru.optionTwo.text} 
                                                 </span>
                                                <Button
                                                    className="float-right"
                                                    onClick={(e) => this.handleViewUserPool(e, soru.id)}
                                                    >
                                                    View Poll
                                                    </Button>
                                                </Media.Body>
                                            </Media>
                                    </div>
                                ))
                            }
                    </ul>
                        </Col>
                    </Row>
                  </Container>
              
               

            </div>
        )
    }
}


function mapStateToProps({ loginUser, sorular, kullanicilar }) {
    return {
      loginUser,
      sorular,
      cevaplanmisSorular : Object.values(sorular)
                                .filter(
                                    (quesId) =>
                                    quesId.optionTwo.votes.includes(loginUser)  || 
                                    quesId.optionOne.votes.includes(loginUser)
                                    )
                                    .sort((a, b) => b.timestamp - a.timestamp),
       cevaplanmamisSorular: Object.values(sorular)
                                    .filter(
                                      (quesId) =>
                                        !quesId.optionOne.votes.includes(loginUser) &&
                                        !quesId.optionTwo.votes.includes(loginUser)
                                        )
                                        .sort((a, b) => b.timestamp - a.timestamp),
                                        kullanicilar    };
  }
export default withRouter(connect( mapStateToProps)(HomePage));