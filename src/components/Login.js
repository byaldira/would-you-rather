import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { setLoginUser } from '../actions/loginUser';
import { withRouter } from 'react-router-dom';
import { Container,Row,Col } from 'react-bootstrap';
import HomePage from './HomePage'
import Select from 'react-select';
import { Navbar,Nav,NavDropdown,Form,FormControl,Button ,Card} from 'react-bootstrap'
const imageUserLabel=({ name, avatarURL }) => (
    <div className=''>
        <img src={avatarURL} alt={name} className='w3-circle' height="40" />
      {name}
    </div>
  );

export class Login extends Component {
    state={
        user: '',
        gotoHomePage:false
    };

    handleOnChangeUser=(value)=>{
        this.setState({
            user:value.id,
        })
    }

    handleFormSubmit = (e) => {
        const {user}= this.state;
		const { dispatch, id } = this.props;

		e.preventDefault();

		if (user !== '') {
            dispatch(setLoginUser(user));
            this.setState({
                user: '',
                gotoHomePage: id === null
                          ? true
                          : false,
            });
		}

        if (id !== null) {
        	this.props.history.push(`/questions/${id}`)
        }
	};

    render(){
        
        const { user,gotoHomePage} = this.state;
        const { loginUser,kullanicilar} = this.props;
        
        if (gotoHomePage || !!loginUser) {
        	return <HomePage />
        }

        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col md={12}>
                            <h1>Welcome To Would You Rather Game</h1>
                        <Form onSubmit={this.handleLogin}>
                                <Select
                                    onChange={this.handleOnChangeUser} 
                                    formatOptionLabel={imageUserLabel}
                                    getOptionLabel={(option)=>option.id}
                                    getOptionValue={(option)=>option.name}
                                    options={kullanicilar} 
                                    placeholder='Please Select a User to login'
                                    isSearchable={false}
                            />
                            
                            <Button variant="primary" type="submit"  disabled={user === ''}    onClick={this.handleFormSubmit}>
                                 Login
                            </Button>
                        </Form>
                        </Col>
                     
                    </Row>
                </Container>
            </Fragment>
        )
    }
}
function mapStateToProps ({ kullanicilar,loginUser}, {id}) {
	return {
        loginUser,
    	kullanicilar: Object.values(kullanicilar),
      	id: id ? id : null
	}
}

export default withRouter(connect(mapStateToProps)(Login));