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

const validate = (value, values, input) => {
    const name = input.name;

    if (name === "milesNeeded" || name === "chargeDuration" || name === "mileage" || name === "batterySize") {
        if (!value || value === '') return "A value greater than zero is required."
        if (parseInt(value) < 1) return "A value greater than zero is required."
    }

    if (name === "year") {
        if (!value || value === '') return "A value greater than zero is required."
        if (parseInt(value) < 1980) return "Not sure if anything before 1980 is valid."
    }

    if (name === "make" || name === "model") {
        if (!value || value === '') return "Required."
    }
}

const formInputStyle = {
    marginTop: '5px'
}

const buttonInputStyle = {
    marginTop: '10px'
}

const buttonStyle = {
    marginRight: '5px'
}

const errorStyle = {
    color: 'red',
    marginLeft: '5px'
}

const successStyle = {
    color: 'green'
}

class Preferences extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            milesNeeded: 1,
            chargeDuration: 1,
            make: '',
            model: '',
            year: 2021,
            mileage: 1,
            batterySize: 1
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
                                <Field name="milesNeeded" validate={(value, values, input) => validate(value, values, input)}>
                                    {({ input, meta }) => (
                                        <div>
                                            <label className="col-xs-4 col-md-3">Miles needed</label>
                                            <input {...input} type="number" min="1" className="col-xs-6 col-md-4"/>
                                            {meta.error && meta.touched && <span style={errorStyle}>{meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div className="row" style={formInputStyle}>
                                <Field name="chargeDuration" validate={(value, values, input) => validate(value, values, input)}>
                                    {({ input, meta }) => (
                                        <div>
                                            <label className="col-xs-4 col-md-3">Charge Duration</label>
                                            <input {...input} type="number" min="1" className="col-xs-6 col-md-4"/>
                                            {meta.error && meta.touched && <span style={errorStyle}>{meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div className="row" style={formInputStyle}>
                                <Field name="make" validate={(value, values, input) => validate(value, values, input)}>
                                    {({ input, meta }) => (
                                        <div>
                                            <label className="col-xs-4 col-md-3">Make</label>
                                            <input {...input} type="text" placeholder="Make" className="col-xs-6 col-md-4"/>
                                            {meta.error && meta.touched && <span style={errorStyle}>{meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div className="row" style={formInputStyle}>
                                <Field name="model" validate={(value, values, input) => validate(value, values, input)}>
                                    {({ input, meta }) => (
                                        <div>
                                            <label className="col-xs-4 col-md-3">Model</label>
                                            <input {...input} type="text" placeholder="Make" className="col-xs-6 col-md-4"/>
                                            {meta.error && meta.touched && <span style={errorStyle}>{meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div className="row" style={formInputStyle}>
                                <Field name="year" validate={(value, values, input) => validate(value, values, input)}>
                                    {({ input, meta }) => (
                                        <div>
                                            <label className="col-xs-4 col-md-3">Year</label>
                                            <input {...input} type="number" min="1980" className="col-xs-6 col-md-4"/>
                                            {meta.error && meta.touched && <span style={errorStyle}>{meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div className="row" style={formInputStyle}>
                                <Field name="mileage" validate={(value, values, input) => validate(value, values, input)}>
                                    {({ input, meta }) => (
                                        <div>
                                            <label className="col-xs-4 col-md-3">Mileage</label>
                                            <input {...input} type="number" min="1" className="col-xs-6 col-md-4"/>
                                            {meta.error && meta.touched && <span style={errorStyle}>{meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div className="row" style={formInputStyle}>
                                <Field name="batterySize" validate={(value, values, input) => validate(value, values, input)}>
                                    {({ input, meta }) => (
                                        <div>
                                            <label className="col-xs-4 col-md-3">Battery Size</label>
                                            <input {...input} type="number" min="1" className="col-xs-6 col-md-4"/>
                                            {meta.error && meta.touched && <span style={errorStyle}>{meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div className="row" style={formInputStyle}>
                                <div className="col-xs-10 col-md-7 text-center" style={buttonInputStyle}>
                                    <button className="btn btn-default" type="submit" disabled={submitting || pristine} style={buttonStyle}>
                                        Submit
                                    </button>
                                    <button
                                        className="btn btn-default"
                                        type="button"
                                        onClick={form.reset}
                                        disabled={submitting || pristine}
                                        style={buttonStyle}
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