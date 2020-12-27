import { Component ,Fragment } from "react";
import { connect } from 'react-redux';
import { Form,Button ,Media ,Container,Row,Col,Image } from 'react-bootstrap'
import {handleAddAnswer} from '../actions/sorular'
class Question extends Component{
    state={
        cevap:'',
        toResultPage: false
    }

    handleGonder = (e)=> {
        debugger;
        e.preventDefault();
      
        const { cevap } = this.state;
        const { dispatch, id } = this.props;
    
         dispatch( handleAddAnswer(id, cevap ));
    
        this.setState({
            cevap:'',
            toResultPage: true,
      })

    }

    handleCevapChange= (e)=> {
        const cevap = e.target.value;
         console.log(cevap);
        this.setState({
            cevap,
        })
    }

    render(){

        const {soru ,  soruSahibi ,id } = this.props;

        console.log(soru)
        console.log(soruSahibi)
        console.log(id)
        const { cevap, toResultPage } = this.state;

        return(
            <Fragment>
            <Container className="mt-2">
                <Row>
                    <Col md={2}>
                     <Image thumbnail  src={soruSahibi.avatarURL} rounded />
                    </Col>
                    <Col md={10}>
                        <div>
                        <Media>
                            <Media.Body>
                                <h5>{soruSahibi.name} asks : Would You Rather ...  </h5>
                                <Form>
                                <Form.Row>
                                    <Form.Check
                                    value="optionOne"
                                    type="radio"
                                    name="aaa"
                                    aria-label="radio 1"
                                    label={soru.optionOne.text}
                                    onChange={this.handleCevapChange}
                                    />
                                    {/* <Form.Check
                                            type="radio"
                                            className="mb-2 mr-sm-2"
                                            id={`default-${soru.optionOne.text}`}
                                            label={soru.optionOne.text}
                                        /> */}
                                </Form.Row>

                                <Form.Row>
                                <Form.Check
                                    value="optionTwo"
                                    type="radio"
                                    aria-label="radio 1" 
                                    name="aaa"
                                    label={soru.optionTwo.text}
                                    onChange={this.handleCevapChange}
                                    />
                                   
                                    {/* <Form.Check
                                            type="radio"
                                            className="mb-2 mr-sm-2"
                                            id={`default-${soru.optionTwo.text}`}
                                            label={soru.optionTwo.text}
                                        /> */}
                                </Form.Row>
                                
                                     <Button 
                                        className="w3-button w3-block w3-green"
                                        type='submit'
                                        disabled={cevap === ''}
                                        onClick={this.handleGonder}
                                    >
                                        Submit
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

function mapStateToProps({ sorular , kullanicilar, loginUser }, {id}) {
    return {
        soru : sorular[id],
        soruSahibi : kullanicilar[sorular[id].author],
        id
    }
}

export default connect(mapStateToProps)(Question);
