import React, { Component } from 'react';
import classes from './About.module.css';


class About extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="About">

        <h1>About us</h1>
        <br/>
        <div>
          <h2>Creators</h2>
          <br/>
          <strong>Alejandro Araya </strong> - Full Stack Web Developer
          <br/>
          <strong>Santiago Gonzalo </strong> - Full Stack Web Developer
          <br/>
          <strong>Timothy Salinas </strong> - Full Stack Web Developer
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <div>
          <h2>Our Mission</h2>
          <br/>
          Our passion is to provide the top possible matches between employer and contractor in any industries. <br/>
          We have a foundational belief that creating relationships and connecting people is what move companies and employees forward
        </div>

      </div>
    );
  }
}

export default About;
