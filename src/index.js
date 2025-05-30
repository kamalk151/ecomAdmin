import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
// Create store with the reducers and
// Apply thunk as a middleware

root.render(
  <Router>
    <App />
  </Router>
)
