import React from 'react'
import { render } from 'react-dom'
import './util/setRem'
import './util/forbidUserScalable'
import App from './App'

render(<App />, document.querySelector('#root'))
