import React from 'react';
import { Form, Field } from 'react-final-form';

const submitPreferences = (preferences) => {
    return fetch(`api/test-server/preferences`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(preferences)
        }).then(response => {
            if (response.status === 200) {
                return { success: true };
            }
            return { error: response.status };
        }).catch(error => {
            console.error(`/preferences - error: `, error);
            return { error };
        });
}

const formatPreferencesRequest = (preferences) => {
    return {
        miles_needed: parseInt(preferences.milesNeeded),
        charge_duration: parseInt(preferences.chargeDuration),
        make: preferences.make,
        model: preferences.model,
        year: parseInt(preferences.year),
        mileage: parseInt(preferences.mileage),
        battery_size: parseInt(preferences.batterySize)
    }
}

const formInputStyle = {
    padding: '2px 0px 2px 0px'
}

const errorStyle = {
    color: 'red'
}

const successStyle = {
    color: 'green'
}

class Preferences extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            milesNeeded: 0,
            chargeDuration: 0,
            make: '',
            model: '',
            year: 0,
            mileage: 0,
            batterySize: 0
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(values) {
        const formattedBody = formatPreferencesRequest(values);
        submitPreferences(formattedBody).then(result => {
            if (result.error) {
                this.setState({ error: result.error, success: null, ...values })
            } else {
                this.setState({ error: null, success: 'Preferences updated successfully', ...values })
            }
        }).catch(error => {
            console.error('Preferences.onSubmit() - error: %o', error);
            this.setState({ error: error.message, success: null, ...values })
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <h2 className="align-middle text-center">{`Preferences`}</h2>
                {this.state.error && <h5 className="align-middle text-center" style={errorStyle}>{this.state.error}</h5>}
                {this.state.success && <h5 className="align-middle text-center" style={successStyle}>{this.state.success}</h5>}
                <Form
                    onSubmit={this.onSubmit}
                    initialValues={{
                        ...this.state,
                    }}
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="row" style={formInputStyle}>
                                <label className="col-xs-4 col-md-3">Miles needed</label>
                                <Field
                                    name="milesNeeded"
                                    component="input"
                                    type="number"
                                    className="col-xs-6 col-md-4"
                                />
                            </div>
                            <div className="row" style={formInputStyle}>
                                <label className="col-xs-4 col-md-3">Charge Duration</label>
                                <Field
                                    name="chargeDuration"
                                    component="input"
                                    type="number"
                                    className="col-xs-6 col-md-4"
                                />
                            </div>
                            <div className="row" style={formInputStyle}>
                                <label className="col-xs-4 col-md-3">Make</label>
                                <Field
                                    name="make"
                                    component="input"
                                    type="text"
                                    placeholder="Make"
                                    className="col-xs-6 col-md-4"
                                />
                            </div>
                            <div className="row" style={formInputStyle}>
                                <label className="col-xs-4 col-md-3">Model</label>
                                <Field
                                    name="model"
                                    component="input"
                                    type="text"
                                    placeholder="Model"
                                    className="col-xs-6 col-md-4"
                                />
                            </div>
                            <div className="row" style={formInputStyle}>
                                <label className="col-xs-4 col-md-3">Year</label>
                                <Field
                                    name="year"
                                    component="input"
                                    type="number"
                                    className="col-xs-6 col-md-4"
                                />
                            </div>
                            <div className="row" style={formInputStyle}>
                                <label className="col-xs-4 col-md-3">Mileage</label>
                                <Field
                                    name="mileage"
                                    component="input"
                                    type="number"
                                    className="col-xs-6 col-md-4"
                                />
                            </div>
                            <div className="row" style={formInputStyle}>
                                <label className="col-xs-4 col-md-3">Battery Size</label>
                                <Field
                                    name="batterySize"
                                    component="input"
                                    type="number"
                                    className="col-xs-6 col-md-4"
                                />
                            </div>
                            <div className="row" style={formInputStyle}>
                                <div className="col-xs-10 col-md-7 align-middle">
                                    <button className="btn btn-default" type="submit" disabled={submitting || pristine}>
                                        Submit
                                    </button>
                                    <button
                                        className="btn btn-default"
                                        type="button"
                                        onClick={form.reset}
                                        disabled={submitting || pristine}
                                    >
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                />
            </div>
        );
    }
}

export default Preferences;