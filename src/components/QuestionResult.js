import { Component ,Fragment } from "react";
import { connect } from 'react-redux';
import { Media ,Container,Row,Col,Image , ProgressBar,Alert} from 'react-bootstrap'
class QuestionResult extends Component{
    render(){
        const { soru , soruSahibi , YourAnswer   } = this.props;
        console.log(soru )
        console.log(soruSahibi )
        console.log(YourAnswer )

        const birinciCevapSayisi = soru.optionOne.votes.length;
        const ikinciCevapSayisi = soru.optionTwo.votes.length;

        const toplamCevapSayisi = birinciCevapSayisi + ikinciCevapSayisi ; 
        
        const birinciCevapYuzdesi = Math.round((birinciCevapSayisi/toplamCevapSayisi)*100);
        const ikinciCevapYuzdesi = Math.round((ikinciCevapSayisi/toplamCevapSayisi)*100);
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
                                <h5>{ soruSahibi.name } asks : </h5>
                                <p>
                                Results: 
                                </p>
                                Would You Rather {soru.optionOne.text} ? 
                                <b>  { YourAnswer === 'optionOne' &&   <Alert.Heading> Your Vote!</Alert.Heading>}</b>
                                <div className="w3-center">{birinciCevapSayisi} out of {toplamCevapSayisi} votes</div>
                                <ProgressBar striped variant="warning" now={birinciCevapYuzdesi}  label={`${birinciCevapYuzdesi}%`}/>
                                OR <br/>
                                Would You Rather {soru.optionTwo.text} ? 
                                { YourAnswer === 'optionTwo' && <Alert.Heading> Your Vote!</Alert.Heading>}
                                <div className="w3-center">{ikinciCevapSayisi} out of {toplamCevapSayisi} votes</div>
                                 <ProgressBar striped variant="danger" now={ikinciCevapYuzdesi}  label={`${ikinciCevapYuzdesi}%`} />
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
function mapStateToProps({ sorular , kullanicilar, loginUser }, {id}){
    return {
        soru : sorular[id],
        soruSahibi : kullanicilar[sorular[id].author],
        YourAnswer : kullanicilar[loginUser].answers[id],
    }
}
export default connect(mapStateToProps)(QuestionResult);
