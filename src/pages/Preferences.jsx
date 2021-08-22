import React from 'react';

class Preferences extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="container-fluid">
                <h2 className="align-middle text-center">{`Preferences`}</h2>
            </div>
        );
    }
}

export default Preferences;
