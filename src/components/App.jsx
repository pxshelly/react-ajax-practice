import React from 'react';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { //state keeps track of inputs from user
      name: '',
      message: '',
      response: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInputChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    
    this.setState({
      [name]: value,
    });
    // console.log(this.state);
  }

  handleClick(event) {
    let cb = (data) => {
      this.setState({
        response: data
      })
    };

    $.ajax({
      method: 'POST',
      url: 'http://ec2-13-57-25-101.us-west-1.compute.amazonaws.com:3000/api/hrsf111/greeting',
      data: `{name: ${this.state.name}, message: ${this.state.message}`,
      // data: {name: this.state.name, message: this.state.message},
      success: cb
    })
  }

//render response from server onto app
  render() {
    if (this.state.response.length < 1) {
      return (
        <div>
          <form>
            Name:<br></br>
            <input type="text" name="name" onChange={this.handleInputChange}></input><br></br>
            Message:<br></br>
            <input type="text" name="message" onChange={this.handleInputChange}></input>
          </form>  
          <button type="submit" value="Submit" onClick={this.handleClick}>Submit</button>
        </div>
      )
    } else {
      return (
        <div>
          <div>
            {this.state.response}
          </div>
          <form>
            Name:<br></br>
            <input type="text" name="name" onChange={this.handleInputChange}></input><br></br>
            Message:<br></br>
            <input type="text" name="message" onChange={this.handleInputChange}></input>
          </form>  
          <button type="submit" value="Submit" onClick={this.handleClick}>Submit</button>
        </div>
      )
    }
  }
}

export default App;