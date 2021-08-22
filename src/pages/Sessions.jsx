import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import Detail from '../components/Detail';

const fetchSessions = () => {
    return Promise.resolve([111, 222, 333, 444, 555, 666, 777, 888, 999]);
    // return fetch(`api/test-server/sessions`)
    //     .then(response => response.json())
    //     .then(data => {
    //         return Promise.resolve(data);
    //     }).catch(error => {
    //         console.error('/sessions - error: ', error);
    //         return Promise.reject(error)
    //     });
}

const sessionCardStyle = {
    padding: '2px'
}

class Sessions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    itemSelected(item) {
        console.log("Sessions.itemSelected() - selected item: ", item);
        this.setState({ selected: item })
    }

    componentDidMount() {
        fetchSessions().then(result => {
            this.setState({ error: null, items: result })
        }).catch(error => {
            console.error('Sessions.componentDidMount() - error: %o', error);
            this.setState({ error: error.message, items: null })
        });
    }

    renderSessions() {
        if (!this.state.items) {
            return(
                <div>{`No sessions to display`}</div>
            );
        }

        let items = []
        this.state.items.forEach((item, idx) => {
            items.push(
                <Link key={`${idx}-${item}`} to={`/sessions/${item}`}>
                    <div key={`${idx}-${item}`} className="col-xs-4 col-md-3" style={sessionCardStyle}>
                        <button className="btn btn-default" type="submit" onClick={()=>this.itemSelected(item)}>
                            {`Session: ${item}`}
                        </button>
                    </div>
                </Link>
            )
        });

        return(
            <div className="row">{items}</div>
        );
    }

    render() {
        return (
            <div className="container-fluid">
                <h2 className="align-middle text-center">{`Sessions`}</h2>
                {this.renderSessions()}
                <Switch>
                    <Route exact path="/sessions/:item" render={(props) => <Detail {...props} /> } />
                </Switch>
            </div>
        );
    }
}

export default Sessions;
