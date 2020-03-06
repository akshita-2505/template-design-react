import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";
import {connect} from "react-redux";
import * as firebase from "firebase";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage} from "@fortawesome/free-solid-svg-icons";
import CommonForm from "./CommonForm";

let uid;
class User extends React.Component {
  state = {
    uploading: false,
  };

  componentWillMount() {
    uid = localStorage.getItem('isAuth');
    firebase.database().ref(`/users/${uid}`).once('value')
        .then(snapshot => {
          this.setState({
            userInfo: snapshot.val()
          });
        });
  }

  updateProfilePicture = (e) => {
    this.setState({ uploading: true })
    for (let i = 0; i < e.target.files.length; i++) {
      let imageFile = e.target.files[i];
      this.uploadImageToStorage(imageFile);
    }
  };

  uploadImageToStorage = (files) => {
    const uploadTask = firebase.storage().ref(`${uid}/profilePicture/filesFromReact/${files.name}`).put(files);
    uploadTask.on(
        "state_changed",
        snapshot => {
          // progress function ...
          const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({ progress });
        },
        error => {
          // Error function ...
          console.log(error);
        },
        () => {
          // complete function ...
          firebase.storage()
              .ref(`${uid}/profilePicture/filesFromReact`)
              .child(files.name)
              .getDownloadURL()
              .then(url => {
                firebase.database().ref(`/users/${uid}/`).update({profileurl: url}).then(() => {
                  this.setState({ url });
                })
              });
        }
    )
  };

  render() {
    const {userInfo} = this.state;
    return (
        <>
          <div className="content">
            <Row>
              <Col md="4">
                <Card className="card-user">
                  <div className="image">
                    <img
                        alt="..."
                        src={require("assets/img/damir-bosnjak.jpg")}
                    />
                  </div>
                  <CardBody>
                    <div className="author">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img
                            alt="..."
                            className="avatar border-gray"
                            src={userInfo && userInfo.profileurl || require("assets/img/mike.jpg")}
                        />
                        <h5 className="title">{userInfo && userInfo.firstName}</h5>
                      </a>
                      <p className="description">{userInfo && userInfo.userName}</p>
                    </div>
                    <p className="description text-center">
                      {userInfo && userInfo.mySelf}
                    </p>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="button-container">
                      <Row>
                        <Col className="ml-auto" lg="3" md="6" xs="6">
                          <h5>
                            12 <br />
                            <small>Files</small>
                          </h5>
                        </Col>
                        <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                          <h5>
                            2GB <br />
                            <small>Used</small>
                          </h5>
                        </Col>
                        <Col className="mr-auto" lg="3">
                          <h5>
                            24,6$ <br />
                            <small>Spent</small>
                          </h5>
                        </Col>
                      </Row>
                    </div>
                  </CardFooter>
                </Card>
              </Col>
              <Col md="8">
                <Card className="card-user">
                  <CardHeader style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-between'}}>
                    <CardTitle tag="h5">Edit Profile</CardTitle>
                    <label htmlFor='single'>
                      <FontAwesomeIcon icon={faImage} color='#3B5998' size='2x' />
                    </label>
                    <input type='file' id='single' onChange={this.updateProfilePicture}/>
                  </CardHeader>
                  <CardBody>
                   <CommonForm userInfo={userInfo} uid={uid}/>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </>
    );
  }
}

const mapState = (state) => {
  console.log(state.signupReducer);
  return {
    logIn: state.signupReducer.logIn
  }
};

const mapDispatch = (dispatch) => {
  return {}
};

export default (connect(mapState, mapDispatch)(User));
