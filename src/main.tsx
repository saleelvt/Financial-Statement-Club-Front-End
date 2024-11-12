
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './reduxKit/store'
import "./global.css"
import { App } from './App'



createRoot(document.getElementById('root')!).render(
  <Router>
  <Provider store={store}>
    <App />
    </Provider>
    </Router>
)
