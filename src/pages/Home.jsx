import React from 'react';
import { Link } from 'react-router-dom';

const cardStyle = {
    height: '100px',
    margin: '2px',
    border: '1px solid red',
}

function Home() {
    return (
        <div className="container-fluid">
            <div className="col-xs-2 col-md-2"></div>
            <Link className="nav-link" to="/sessions">
                <div style={cardStyle} className="col-xs-7 col-md-4">
                    <h2 className="align-middle text-center">{"Sessions"}</h2>
                </div>
            </Link>
            <Link className="nav-link" to="/preferences">
                <div style={cardStyle} className="col-xs-7 col-md-4">
                    <h2 className="align-middle text-center">{'Preferences'}</h2>
                </div>
            </Link>
            <div className="col-xs-2 col-md-2"></div>
        </div>
    );
}

export default Home;
