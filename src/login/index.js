import { h, render, Component } from 'preact'
import Portal from 'preact-portal'

import { OtherWidget } from './other-widget'

const { document } = global

const loginContainer = document.querySelector(`#loginForm`)
const someOtherContainer = document.querySelector(`#someOtherWidget`)
const dynamicContainer = document.querySelector(`#dynamicWidget`)

const loadDynamicComponent = () =>
  import(/* webpackChunkName: "dynamic-widget" */ `./dynamic`).then(
    ({ DynamicComponent }) => DynamicComponent,
  )

class LoginWidget extends Component {
  constructor() {
    super()
    this.state = {
      counter: 1,
      doesDynamicExist: !!dynamicContainer,
      DynamicComponent: null,
    }

    this.incrementCounter = this.incrementCounter.bind(this)
  }

  componentDidMount() {
    if (this.state.doesDynamicExist) {
      loadDynamicComponent().then(DynamicComponent => {
        this.setState(state => ({
          DynamicComponent,
        }))
      })
    }
  }

  incrementCounter() {
    this.setState(state => ({ counter: state.counter + 1 }))
  }

  render() {
    const { counter, doesDynamicExist, DynamicComponent } = this.state

    return (
      <div id="login-widget">
        <span>Hello, world! The counter is {this.state.counter}</span>
        <button onClick={this.incrementCounter}>
          Click me to trigger some changes
        </button>

        {someOtherContainer && (
          <Portal into="#someOtherWidget" ref={ref => (this._portal = ref)}>
            <OtherWidget counter={this.state.counter} />
          </Portal>
        )}

        {doesDynamicExist ? (
          <Portal into="#dynamicWidget">
            {DynamicComponent ? (
              <DynamicComponent counter={this.state.counter} />
            ) : (
              <div>Loading...</div>
            )}
          </Portal>
        ) : null}
      </div>
    )
  }
}

if (loginContainer) {
  render(<LoginWidget />, loginContainer)
}
