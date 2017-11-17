import { h, render, Component } from 'preact'

export class DynamicComponent extends Component {
  render() {
    const { counter } = this.props
    return (
      <div>
        YO I WAS LAZY LOADED FROM A DIFFERENT JS file. Check your networking tab
        <br />
        <br />
        {counter}
      </div>
    )
  }
}
