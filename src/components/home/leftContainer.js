import React from 'react';

class LeftContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render(){
        return(
            <div style={{flex: 1, marginLeft: '18%'}}>
                <div className={'textStyle'}>Facebook helps you connect and share with the people in your life.</div>
                <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yi/r/OBaVg52wtTZ.png" />
            </div>
        )
    }
}

export default LeftContainer;
