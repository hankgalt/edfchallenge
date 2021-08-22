import React from 'react';

class Detail extends React.Component {
    constructor(props) {
        super(props);
        console.log("Detail.constructor() - props: ", props);
        this.state = {item: null};
    }

    componentDidMount() {
        console.log("Detail.componentDidMount() - props: ", this.props.match.params);
    }

    render() {
        const { item } = this.props.match.params;
        if (item === '') {
            return null;
        }

        return(
            <div className="row">
                <div className="row">
                    <div className="col-xs-4 col-md-3">{`Session ID: ${item}`}</div>
                    <div className="col-xs-4 col-md-3">{'Acccount Name'}</div>
                    <div className="col-xs-4 col-md-3">{'Timezone'}</div>
                    <div className="col-xs-4 col-md-3">{'Vehicle Name'}</div>
                </div>
            </div>
        );
    }
}

export default Detail;