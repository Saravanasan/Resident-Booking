import React, { Component } from "react";
import  './dashboard.css';
import { Card, Button, Modal } from 'react-bootstrap';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from "react-datepicker";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import disableBrowserBackButton from 'disable-browser-back-navigation';
disableBrowserBackButton();

const options = [
  { value: '10AM - 11AM', label: '10AM - 11AM' },
  { value: '11AM - 12AM', label: '11AM - 12PM' },
  { value: '12PM - 1PM', label: '12PM - 1PM' },
  { value: '1PM - 2PM', label: '1PM - 2PM' },
  { value: '2PM - 3PM', label: '2PM - 3PM' },
  { value: '3PM - 4PM', label: '3PM - 4PM' },
  { value: '4PM - 5PM', label: '4PM - 5PM' },
  { value: '5PM - 6PM', label: '5PM - 6PM' },
  { value: '6PM - 7PM', label: '6PM - 7PM' },
  { value: '7PM - 8PM', label: '7PM - 8PM' },
  { value: '8PM - 9PM', label: '8PM - 9PM', className: 'myOptionClassName' },
]
export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
          date: '',
          time :'',
          showModal: false,
          name : ''
    
        };
        this.handleChange = this.handleChange.bind(this);
    
      }
    
      handleChange(date) {
        this.setState({
          date: date
        });
      }

      handleChangeTime(time){
          this.setState({
              time: time
          })
      }

      submit = e => {
          if(this.state.time.value === '' || this.state.date === '' || this.state.time.value === undefined){
            alert('Enter Details');
            this.setState({ showModal: false })

          }
          else{
            let search = window.location.search;
            let params = new URLSearchParams(search);
            let token = params.get('token');
            const payload = {
                name: this.state.name,
                date: new Date(this.state.date).getDate() + '/' + (new Date(this.state.date).getMonth()+1) + '/' + new Date(this.state.date).getFullYear(),
                time: this.state.time.value
                }
                const headers = {
                    'Content-Type': 'application/json',
                    'x-auth': token
                  }
                axios.post('https://bipolar-backend.herokuapp.com/book', payload,{
                    headers: headers
                  })
                  .then((response) => {
                    this.setState({ showModal: false })
                    alert(response.data)
                }, (error) => {
                    this.setState({ showModal: false })
                      alert(error.response.data)
                    });
          }
        
            } 
      
            logout = e =>{
                let search = window.location.search;
                let params = new URLSearchParams(search);
                let token = params.get('token');
                    const header = {
                        'Content-Type': 'application/json',
                        'x-auth': token
                      }
                    axios.post('https://bipolar-backend.herokuapp.com/logout',{},{
                        headers: header
                      })
                      .then((response) => {
                        alert(response.data)
                        this.props.history.push('/sign-in');
                    }, (error) => {
                          alert(error.response.data)
                        window.open('/dashboard?token='+token, "home") 
                      });
                    } 
            

    render() {
        return (
            <div>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Button variant="primary" onClick={this.logout}>Logout</Button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="center">
            <Modal show={this.state.showModal}>
              <Modal.Header >
                <Modal.Title>Booking Portal</Modal.Title>
              </Modal.Header>
    
              <Modal.Body>
                <Dropdown options={options}        
                    value={this.state.time}  
                    placeholder="Select an option" 
                    onChange={(time) => this.handleChangeTime(time)}
                />
                <div style={{marginTop: '10px'}}>
                    <DatePicker
                    minDate={moment().toDate()}
                    dateFormat = 'dd/MM/yyyy'
                    placeholderText = 'Select Date'
                    selected = {this.state.date}
                    onChange={(date) => this.handleChange(date)}
                    value={this.state.date}
                    />
                </div>
              </Modal.Body>
    
              <Modal.Footer>
                <Button variant="secondary" onClick={() => this.setState({ showModal: false })}>Close</Button>
                <Button variant="primary" onClick = {this.submit}>Submit</Button>
              </Modal.Footer>
            </Modal>
            <Card>
              <Card.Body>
                <Card.Title>Tennis Court</Card.Title>
                <Card.Text>
                A tennis court is the venue where the sport of tennis is played. It is a firm rectangular surface with a low net stretched across the centre.
        </Card.Text>
                <Button variant="primary" onClick={() => this.setState({ showModal: true, name : 'Tennis Court' })}>Book Now</Button>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>Swimming Pool</Card.Title>
                <Card.Text>
                A swimming pool, swimming bath, wading pool, paddling pool, or simply pool is a structure designed to hold water to enable swimming or other leisure activities.
        </Card.Text>
                <Button variant="primary" onClick={() => this.setState({ showModal: true, name : 'Swimming Pool' })}>Book Now</Button>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>Badminton Court</Card.Title>
                <Card.Text>
                The full length of the court is 13.4 metres (44 ft). The service courts are marked by a centre line dividing the width of the court.
        </Card.Text>
                <Button variant="primary" onClick={() => this.setState({ showModal: true, name : 'Badminton Court' })}>Book Now</Button>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>Gym</Card.Title>
                <Card.Text>
                Gym is a covered location for athletics. Gym is also slang for "fitness centre", which is often an area for indoor recreation
        </Card.Text>
                <Button variant="primary" onClick={() => this.setState({ showModal: true, name : 'Gym' })}>Book Now</Button>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>Club House</Card.Title>
                <Card.Text>
                Clubhouse may refer to: The meetinghouse of: A club (organization), an association of two or more people united by a common interest or goal.
        </Card.Text>
                <Button variant="primary" onClick={() => this.setState({ showModal: true, name : 'Club House' })}>Book Now</Button>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>Cycle tracks</Card.Title>
                <Card.Text>
                A cycle track, separated bike lane or protected bike lane is an exclusive bikeway that has elements of a separated path and on-road bike lane. 
        </Card.Text>
                <Button variant="primary" onClick={() => this.setState({ showModal: true, name : 'Cycle tracks' })}>Book Now</Button>
              </Card.Body>
            </Card>
          </div>
          </div>
        );
      }

}
