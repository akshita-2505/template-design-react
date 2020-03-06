import React from "react";
import { useFormFields } from "../libs/HooksLib";
import "./signup/Signup.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { loginWithFirebase } from '../actions/signupAction';
import {bindActionCreators} from "redux";
import { connect } from 'react-redux';

function Login(props) {
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: "",
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

    function renderForm() {
        return (
            <form>
                <TextField id="email"
                           label="Email"
                           value={fields.email}
                           onChange={handleFieldChange}
                />
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    value={fields.password}
                    onChange={handleFieldChange}
                />
                <Button variant="contained" style={{marginTop: 25}} onClick={validateForm}>Log In</Button>
            </form>
        );
    }

    return (
        <div className="Signup">
            {renderForm()}
        </div>
    );
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

export default (connect(mapState, mapDispatch)(Login));
