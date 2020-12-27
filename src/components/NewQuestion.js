import { Fragment } from "react";
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form,Button,Media ,Container,Row,Col,Image} from 'react-bootstrap'
import { handleAddQuestion } from '../actions/sorular';

class NewQuestion extends Component{
    state={
        opsiyonBir:'',
        opsiyonIki:'',
        redirectToHomePage :false
    }

    handleChangeOpsyionBir = (e) => {
        const opsiyonBir = e.target.value
    
        this.setState({
            opsiyonBir
        })
    }

    handleChangeOpsiyonIki = (e) => {
        const opsiyonIki = e.target.value
    
        this.setState ({
            opsiyonIki
        })
      }
      
    handleAddNewQuestion = (e) => {
        e.preventDefault()
    
        const {  opsiyonBir,opsiyonIki } = this.state;
        const { dispatch } = this.props;
    
        // todo: Add Question to Store
       
        dispatch( handleAddQuestion(opsiyonBir, opsiyonIki) );
    
        this.setState(() => ({
            opsiyonBir:'',
            opsiyonIki:'',
            redirectToHomePage: true,
        }))

    }

    render(){
        const { opsiyonBir,opsiyonIki,redirectToHomePage } =this.state;
        const { loginUser , kullanici } = this.props;

        if( redirectToHomePage === true || loginUser===null ){
            return <Redirect to='/' />
        }

        return(
            <Fragment>
                <Container className="mt-2">
                    <Row>
                        <Col md={2}>
                            <Image thumbnail  src={kullanici.avatarURL} rounded />
                        </Col>
                        <Col md={10}>
                            <div>
                            <Media>
                            <Media.Body>
                                <h5>{ kullanici.name } add new question : </h5>
                                <Form  onSubmit={this.handleAddNewQuestion}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Would You Rather ? </Form.Label>
                                    <Form.Control type="text" placeholder="Please Fill Option One "  onChange={this.handleChangeOpsyionBir}/>
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Or </Form.Label>
                                    <Form.Control type="text" placeholder="Please Fill Option Two "   onChange={this.handleChangeOpsiyonIki}/>
                                </Form.Group>
                              
                                <Button variant="primary" type="submit">
                                    Add New Question
                                </Button>
                                </Form>
                            </Media.Body>
                            </Media>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}

function mapStateToProps({loginUser, kullanicilar}) {
	return {
        loginUser,
        kullanici : kullanicilar[loginUser]
    }
}
export default connect(mapStateToProps)(NewQuestion);