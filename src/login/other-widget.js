import { h, render, Component } from 'preact'

export class OtherWidget extends Component {
  render() {
    return (
      <div>
        We are getting props from teh red master widget 11!!!
        <br />
        <br />
        Counter: {this.props.counter}
      </div>
    )
  }
}
