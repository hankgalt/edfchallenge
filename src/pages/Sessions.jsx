import React from 'react';

import Detail from '../components/Detail';

const fetchSessions = () => {
    return fetch(`api/test-server/sessions`)
        .then(response => response.json())
        .then(data => {
            return Promise.resolve(data);
        }).catch(error => {
            console.error('/sessions - error: ', error);
            return Promise.reject(error)
        });
}

const sessionCardStyle = {
    padding: '2px'
}

class Sessions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.itemSelected = this.itemSelected.bind(this);
        this.renderSessions = this.renderSessions.bind(this);
    }

    componentDidMount() {
        fetchSessions().then(result => {
            this.setState({ error: null, items: result })
        }).catch(error => {
            console.error('Sessions.componentDidMount() - error: %o', error);
            this.setState({ error: error.message, items: null })
        });
    }

    itemSelected(item) {
        this.setState({ selected: item })
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
                <div key={`${idx}-${item}`} className="col-xs-4 col-md-3 text-center" style={sessionCardStyle}>
                    <button className="btn btn-default" type="submit" onClick={()=>this.itemSelected(item)}>
                        {`Session: ${item}`}
                    </button>
                </div>
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
                <Detail itemID={this.state.selected} />
            </div>
        );
    }
}

export default Sessions;
