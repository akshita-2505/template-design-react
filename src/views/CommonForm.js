import React from "react";
import {Button, Col, FormGroup, Input, Row, Form} from "reactstrap";
import {useFormFields} from "../libs/HooksLib";
import * as firebase from "firebase";

const CommonForm = (props) => {
    const [fields, handleFieldChange] = useFormFields({});

    const updateUser = () => {
        debugger
        firebase.database().ref(`/users/${props.uid}/`).update(fields).then(r =>{
        }).catch(e => {
            console.log(e);
        })
    };

    return(
        <Form>
            <Row>
                <Col className="pr-1" md="5">
                    <FormGroup>
                        <label>Company (disabled)</label>
                        <Input
                            defaultValue="LaNetTeam"
                            disabled
                            placeholder="Company"
                            type="text"
                        />
                    </FormGroup>
                </Col>
                <Col className="px-1" md="3">
                    <FormGroup>
                        <label>Username</label>
                        <Input
                            defaultValue={props.userInfo && props.userInfo.userName}
                            placeholder="Username"
                            type="text"
                            id='userName'
                            onChange={handleFieldChange}
                        />
                    </FormGroup>
                </Col>
                <Col className="pl-1" md="4">
                    <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                            Email address
                        </label>
                        <Input defaultValue={props.userInfo && props.userInfo.email}
                               placeholder={'Email'}
                               type="email"
                               id='email'
                               onChange={handleFieldChange}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col className="pr-1" md="6">
                    <FormGroup>
                        <label>First Name</label>
                        <Input
                            defaultValue={props.userInfo && props.userInfo.firstName}
                            placeholder="Company"
                            type="text"
                            id='firstName'
                            onChange={handleFieldChange}
                        />
                    </FormGroup>
                </Col>
                <Col className="pl-1" md="6">
                    <FormGroup>
                        <label>Last Name</label>
                        <Input
                            defaultValue={props.userInfo && props.userInfo.lastName}
                            placeholder="Last Name"
                            type="text"
                            id='lastName'
                            onChange={handleFieldChange}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md="12">
                    <FormGroup>
                        <label>Address</label>
                        <Input
                            defaultValue={props.userInfo && props.userInfo.address}
                            placeholder="Home Address"
                            type="text"
                            id={'address'}
                            onChange={handleFieldChange}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col className="pr-1" md="4">
                    <FormGroup>
                        <label>City</label>
                        <Input
                            defaultValue={props.userInfo && props.userInfo.city}
                            placeholder="City"
                            type="text"
                            id='city'
                            onChange={handleFieldChange}
                        />
                    </FormGroup>
                </Col>
                <Col className="px-1" md="4">
                    <FormGroup>
                        <label>Country</label>
                        <Input
                            defaultValue={props.userInfo && props.userInfo.country}
                            placeholder="Country"
                            type="text"
                            id='country'
                            onChange={handleFieldChange}
                        />
                    </FormGroup>
                </Col>
                <Col className="pl-1" md="4">
                    <FormGroup>
                        <label>Postal Code</label>
                        <Input placeholder="ZIP Code"
                               type="number"
                               id='zipCode'
                               onChange={handleFieldChange}
                               defaultValue={props.userInfo && props.userInfo.zipCode}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md="12">
                    <FormGroup>
                        <label>About Me</label>
                        <Input placeholder="Type about yourself"
                            type="textarea"
                            id='mySelf'
                            onChange={handleFieldChange}
                            defaultValue={props.userInfo && props.userInfo.mySelf}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <div className="update ml-auto mr-auto">
                    <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                        onClick={updateUser}
                    >
                        Update Profile
                    </Button>
                </div>
            </Row>
        </Form>
    )
};

export default CommonForm;
