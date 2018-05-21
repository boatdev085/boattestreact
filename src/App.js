import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
const postData = (url, data) => {
  return fetch(url, {
    body: JSON.stringify(data),
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "user-agent": "Mozilla/4.0 MDN Example",
      "content-type": "application/json"
    },
    method: "POST",
    mode: "cors",
    redirect: "follow",
    referrer: "no-referrer"
  }).then(response => response.json());
};

class App extends Component {
  state = {
    email: "",
    password: "",
    flaglogin: false,
    res: ""
  };
  funclogin = () => {
    this.setState({ flaglogin: true, res: "" });
    let data = {
      email: this.state.email,
      password: this.state.password
    };

    postData("http://localhost:3001/api/login", data).then(data => {
      this.setState({
        flaglogin: false,
        email: "",
        password: "",
        res: data.msg
      });
    });
  };

  handleEmailChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="App">
        <img
          src={logo}
          className={this.state.flaglogin ? "App-logo-spin" : "App-logo"}
          alt="logo"
        />
        <div className="fromlogin">
          <label>
            E-mail address
            <br />
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleEmailChange}
              placeholder="example@appman.co.th"
            />
          </label>

          <label>
            Password
            <br />
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleEmailChange}
              placeholder="your password..."
            />
          </label>
          <div style={{ textAlign: "center" }}>
            <a style={{ color: this.state.res === "OK" ? "green" : "red" }}>
              {this.state.res}
            </a>
          </div>
          <div style={{ textAlign: "center" }}>
            <button onClick={this.funclogin}>SIGN IN</button>
          </div>

          <div className="divbottom">
            <a style={{ float: "left" }}>Forgot password ?</a>

            <a style={{ float: "right" }}>Create a new account</a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
