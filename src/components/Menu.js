import { Component ,Fragment } from "react";
import { Navbar,Nav,NavDropdown,Form,FormControl,Button ,Card} from 'react-bootstrap'
import { connect } from 'react-redux';
import {setLoginUser}  from '../actions/loginUser'
import { NavLink, withRouter } from 'react-router-dom';
import { NavItem} from 'reactstrap';
import { Switch, Route, Link } from 'react-router-dom';
export class Menu extends Component {

    
    handleCikis = (e) => {
    e.preventDefault();
  
      const { dispatch } = this.props;

      dispatch(setLoginUser( null ));
      this.props.history.push('/');
}



    render(){
        const { loginUser ,kullanici } = this.props;
        console.log(kullanici)
        return (
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Navbar.Brand to="/">Would You Rather ? </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            {/* <NavItem className="w3-bar-item">
                  <NavLink   to='/newquestion' >
                    New Question2
                  </NavLink>
            </NavItem> */}
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/" >Home</Nav.Link>
                    <Nav.Link as={Link} to="/newquestion"  >New Question</Nav.Link>
                    <Nav.Link as={Link} to="/leaderboard" >Leader Board </Nav.Link>
                </Nav>
            </Navbar.Collapse>
            {kullanici && ( 
                 <Navbar.Collapse className="justify-content-end">
                 <Navbar.Text>
                   Signed in as:   <a to="#login">{loginUser}</a>   
                 </Navbar.Text>
                 <Card style={{ width: '2.5rem' }}> 
                     <Card.Img variant="top" src={kullanici.avatarURL}  />
                 </Card>
                 <Button 
                     onClick={this.handleCikis}
                     className='w3-bar-item w3-btn w3-block w3-button'
                     >
                                 Logout
                 </Button>
             </Navbar.Collapse>
            )}
           
        </Navbar>
        )
    }
}
function mapStateToProps({ loginUser ,kullanicilar}) {
    return {
      loginUser,
      kullanici:loginUser ? kullanicilar[loginUser] :null
    };
  }
// export default connect( mapStateToProps , { setLoginUser })(Menu);
export default withRouter(connect(mapStateToProps)(Menu));
