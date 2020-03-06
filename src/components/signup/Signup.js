import React from "react";
import {FormGroup} from "react-bootstrap";
import { useFormFields } from "../../libs/HooksLib";
import "./Signup.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { signupWithFirebase } from '../../actions/signupAction';
import {bindActionCreators} from "redux";
import { connect } from 'react-redux';

function Signup(props) {
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: "",
        confirmPassword: ""
    });

    function validateForm() {
        if (
            fields.email.length > 0 &&
            fields.password.length > 0 &&
            fields.password === fields.confirmPassword
        ) {
            registerNewUser()
        }
    }

    function registerNewUser () {
        props.signupWithFirebase(fields).then(res => {
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

                <FormGroup controlId="formBasicPassword">
                    <TextField
                        id="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        autoComplete="current-password"
                        value={fields.confirmPassword}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <Button variant="contained" style={{marginTop: 25}} onClick={validateForm}>Submit</Button>
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
        signUp: state.signupReducer.signUp
    }
};

const mapDispatch = (dispatch) => {
    return {
        signupWithFirebase: bindActionCreators(signupWithFirebase, dispatch)
    }
};

export default (connect(mapState, mapDispatch)(Signup));
