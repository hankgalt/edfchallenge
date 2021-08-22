import React from 'react';
import { Router, Route, Switch, Redirect, Link } from 'react-router-dom';

import { history } from '../utils/history'
import Home from '../pages/Home';
import Sessions from '../pages/Sessions';
import Preferences from '../pages/Preferences';

const containerStyle = {
    height: '90vh',
    overflowY: 'hidden'
}

const headerStyle = {
    height: '100px',
    margin: '2px',
    border: '1px solid blue',
}

class App extends React.Component {
    constructor(props) {
        super(props)

        history.listen((location, action) => {
            console.log("Location: %o, action: %o", location, action);
        });
    }

    render() {
        return (
            <div className="jumbotron">
                <div className="container-fluid" style={containerStyle}>
                    <Router history={history}>
                        <Link className="nav-link" to="/">
                            <div className="row" style={headerStyle}>
                                <h1 className="align-middle text-center">{'Sessions Management'}</h1>
                            </div>
                        </Link>
                        <div className="row">
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route path="/sessions" component={Sessions}/>
                                <Route path="/preferences" component={Preferences}/>
                                <Redirect from="*" to="/"/>
                            </Switch>
                        </div>
                    </Router>
                </div>
            </div>
        )
    }
}

export { App }
