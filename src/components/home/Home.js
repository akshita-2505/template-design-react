import React from 'react';
import {Button} from '@material-ui/core';
import './Home.css';
import LeftContainer from './leftContainer';
import RightContainer from './rightContainer';
import {useFormFields} from "../../libs/HooksLib";
import {bindActionCreators} from "redux";
import {loginWithFirebase} from "../../actions/signupAction";
import {connect} from "react-redux";

function Home(props) {
    const [fields, handleFieldChange] = useFormFields({
        email: "test@test.com",
        password: "Test@123",
    });

    function validateForm() {
        if (
            fields.email.length > 0 &&
            fields.password.length > 0
        ) {
            loginUser()
        }
    }

    function loginUser () {
        props.loginWithFirebase(fields).then(res => {
            props.history.push('/dashboard');
        }).catch(err => {
            alert(err);
        })
    };

    return(
        <div>
            <div className={'header'}>
                <div style={{flexDirection: 'row', display: 'flex', flex: 1}}>
                    <div style={{flex: 1}}>
                        <div className={'facebookFont'}>facebook</div>
                    </div>
                    <div style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <form style={{marginTop: '-2.5%'}}>
                            <label className={'inputTextField'}>
                                Email or phone
                            </label>
                            <div>
                                <input type="text" name="name" className={'inputTextStyle'} onChange={handleFieldChange} value={fields.email} id='email'/>
                            </div>
                        </form>
                        <form style={{marginLeft: '3%'}}>
                            <label className={'passwordTextField'}>
                                Password
                            </label>
                            <div><input type="password" name="name" className={'inputTextStyle'} onChange={handleFieldChange} value={fields.password} id='password'/></div>
                            <label style={{fontSize: 11, color: 'silver', marginLeft: '-35%'}}>Forgotten account?</label>
                        </form>
                        <Button className={'loginButton'} style={{color: 'white'}} onClick={validateForm}>Log In</Button>
                    </div>
                </div>
            </div>
            <div style={{flexDirection: 'row', display: 'flex', backgroundColor: '#DEE1EE', flex: 1}}>
                <LeftContainer/>
                <RightContainer history={props.history}/>
            </div>
        </div>
    )
}

const mapState = (state) => {
    return {
        logIn: state.signupReducer.logIn
    }
};

const mapDispatch = (dispatch) => {
    return {
        loginWithFirebase: bindActionCreators(loginWithFirebase, dispatch)
    }
};

export default (connect(mapState, mapDispatch)(Home));
