import './styles/style';

import React, {Component} from 'react';
import {render} from 'react-dom';
import Hello from 'Components/Hello';

class App extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (

            <div><Hello name='Kamil'/></div>
        );
    }
}

if (module.hot) 
    module.hot.accept();
render(
    <App/>, document.getElementById('root'));