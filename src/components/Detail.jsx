import React from 'react';
import { Line } from 'react-chartjs-2';

const fetchSessionData = (itemID) => {
    return fetch(`api/test-server/sessions/${itemID}`)
        .then(response => {
            return response.json();
        }).then(data => {
            return Promise.resolve(data);
        }).catch(error => {
            console.error(`/sessions/${itemID} - error: `, error);
            return Promise.reject(error)
        });
}

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (snapshot !== null) {
            if (this.props.itemID && this.props.itemID !== prevProps.itemID) {
                const { itemID } = this.props;
                fetchSessionData(itemID).then(result => {
                    this.setState({ error: null, item: result })
                }).catch(error => {
                    console.error('Detail.componentDidMount() - error: %o', error);
                    this.setState({ error: error.message, item: null })
                });
            }
        }
    }

    render() {
        const { itemID } = this.props;
        if (!itemID || itemID === '') {
            return null;
        }

        if (!this.state.item) {
            return(
                <div className="row">
                    <div className="row">
                        <div className="col-xs-4 col-md-3">{`Session ID: ${itemID}`}</div>
                        <div className="col-xs-4 col-md-3">{'Acccount Name'}</div>
                        <div className="col-xs-4 col-md-3">{'Timezone'}</div>
                        <div className="col-xs-4 col-md-3">{'Vehicle Name'}</div>
                    </div>
                    {this.state.item && <Line data={data} options={options} />}
                </div>
            );
        }
        const { session } = this.state.item;
        const options = {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        };
        const data = {
            labels: session.chart_data.time,
            datasets: [
                {
                    label: 'Actual energy delivered',
                    data: session.chart_data.actual_energy_delivered,
                    fill: false,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgba(255, 99, 132, 0.2)',
                },
                {
                    label: 'Predictive energy delivered',
                    data: session.chart_data.predictive_energy_delivered,
                    fill: false,
                    backgroundColor: 'rgb(54, 162, 235)',
                    borderColor: 'rgba(54, 162, 235, 0.2)',
                }
            ],
        };
        return(
            <div className="row">
                <div className="row">
                    <div className="col-xs-4 col-md-3">{`Session ID: ${itemID}`}</div>
                    <div className="col-xs-4 col-md-3">{'Acccount Name'}</div>
                    <div className="col-xs-4 col-md-3">{'Timezone'}</div>
                    <div className="col-xs-4 col-md-3">{'Vehicle Name'}</div>
                </div>
                <Line data={data} options={options} />
            </div>
        );
    }
}

export default Detail;