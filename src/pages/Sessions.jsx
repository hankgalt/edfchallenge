import React from 'react';

const fetchSessions = () => {
    return Promise.resolve([111, 222, 333, 444, 555, 666, 777, 888, 999]);
}

class Sessions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        fetchSessions().then(result => {
            console.log('Sessions.componentDidMount()  - result: ', result);
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
                <div key={`${idx}-${item}`} className="col-xs-4 col-md-3">
                    <button className="btn btn-default" type="submit">{`Session: ${item}`}</button>
                </div>
            )
        });

        return(
            <div className="row">{items}</div>
        );
    }

    render() {
        console.log('Sessions.render() - items: ', this.state.items);
        return (
            <div className="container-fluid">
                <h2 className="align-middle text-center">{`Sessions`}</h2>
                {this.renderSessions()}
            </div>
        );
    }
}

export default Sessions;
