import React from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const fetchSessionData = (itemID) => {
    return fetch(`api/test-server/sessions/${itemID}`)
        .then(response => {
            return response.json();
        }).then(data => {
            localStorage.setItem(itemID, JSON.stringify(data));
            return Promise.resolve(data);
        }).catch(error => {
            console.error(`/sessions/${itemID} - error: `, error);
            return Promise.reject(error)
        });
}

const chartStyle = {
    margin: '10px'
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
                <div className="row align-middle text-center">
                    <div className="col-xs-4 col-md-3">{`Session ID: ${itemID}`}</div>
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
            labels: session.chart_data.time.map(timeStamp => {
                return format(utcToZonedTime(timeStamp*1000, timeZone), "yyyy-MM-dd HH:mm:ss");
            }),
            datasets: [
                {
                    label: 'Actual energy delivered (KWh)',
                    data: session.chart_data.actual_energy_delivered,
                    fill: false,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgba(255, 99, 132, 0.2)',
                },
                {
                    label: 'Predictive energy delivered (KWh)',
                    data: session.chart_data.predictive_energy_delivered,
                    fill: false,
                    backgroundColor: 'rgb(54, 162, 235)',
                    borderColor: 'rgba(54, 162, 235, 0.2)',
                }
            ],
        };
        return(
            <div className="row">
                <div className="row align-middle text-center">
                    <h3>{itemID} {this.state.item.acc.name} {this.state.item.acc.timezone} {session.vehicle_name}</h3>
                </div>
                <div className="row" style={chartStyle}>
                    <Line data={data} options={options} />
                </div>
            </div>
        );
    }
}

export default Detail;