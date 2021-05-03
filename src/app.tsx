import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MainView from "./MainView"

function render() {
  ReactDOM.render(
    <React.StrictMode>
        <MainView />
    </React.StrictMode>,
    document.getElementById('root')
  )
}

render();