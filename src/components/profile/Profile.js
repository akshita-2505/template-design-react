import React from 'react'
import Buttons from './Buttons'
import './App.css'
import  firebase from 'firebase/app';

class Home extends React.Component{
    state = {
        uploading: false,
    };

    onChange = e => {
        this.setState({ uploading: true })
        for (let i = 0; i < e.target.files.length; i++) {
            let imageFile = e.target.files[i];
            this.uploadImageToStorage(imageFile);
        }
    };

    uploadImageToStorage = (files) => {
        const uploadTask = firebase.storage().ref(`filesFromReact/${files.name}`).put(files);
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
                    .ref("filesFromReact")
                    .child(files.name)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url);
                        this.setState({ url });
                    });
            }
        )
    };

    render() {
        return (
            <div>
                <div className='buttons'>
                    <Buttons onChange={this.onChange} />
                </div>
            </div>
        )
    }
}

export default Home;
