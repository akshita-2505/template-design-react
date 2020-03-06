/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";
import * as firebase from "firebase";

class Tables extends React.Component {
  state = {
    firebaseData: []
  };

  componentWillMount() {
    firebase.database().ref('/users').on('value', querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};
      let todoItems = {...data};
      this.setState({
        firebaseData: todoItems,
      });
    });
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Simple Table</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Email</th>
                        <th>City</th>
                        <th className="text-right">Country</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      Object.keys(this.state.firebaseData).map(item => {
                        let data = this.state.firebaseData[item];
                        return (
                            <tr>
                              <td>{data.firstName}</td>
                              <td>{data.surname}</td>
                              <td>{data.email}</td>
                              <td>{data.city}</td>
                              <td className="text-right">{data.country}</td>
                            </tr>
                        )
                      })
                    }
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Tables;
