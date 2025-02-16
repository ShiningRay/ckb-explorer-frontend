import ReactDOM from 'react-dom'
import './index.css'
import './utils/i18n'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { handleRedirectFromAggron } from './utils/util'

const redirect = handleRedirectFromAggron()
if (!redirect) {
  ReactDOM.render(<App />, document.getElementById('root'))

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister()
}
