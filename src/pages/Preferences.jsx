import React from 'react';
import { Form, Field } from "react-final-form";

const onSubmit = (values) => {
    console.log(JSON.stringify(values, 0, 2));
};

const formInputStyle = {
    padding: '2px 0px 2px 0px'
}

function Preferences() {
    let formData = {
        milesNeeded: 0,
        chargeDuration: 0,
        make: '',
        model: '',
        year: 0,
        mileage: 0,
        batterySize: 0

    };

    return (
        <div className="container-fluid">
            <h2 className="align-middle text-center">{`Preferences`}</h2>
            <Form
                onSubmit={onSubmit}
                initialValues={{
                    ...formData,
                }}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="row" style={formInputStyle}>
                            <label className="col-xs-4 col-md-3">Miles needed</label>
                            <Field
                                name="milesNeeded"
                                component="input"
                                type="number"
                                placeholder="Miles needed"
                                className="col-xs-6 col-md-4"
                            />
                        </div>
                        <div className="row" style={formInputStyle}>
                            <label className="col-xs-4 col-md-3">Charge Duration</label>
                            <Field
                                name="chargeDuration"
                                component="input"
                                type="number"
                                placeholder="Charge Duration"
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
                                placeholder="Year"
                                className="col-xs-6 col-md-4"
                            />
                        </div>
                        <div className="row" style={formInputStyle}>
                            <label className="col-xs-4 col-md-3">Mileage</label>
                            <Field
                                name="mileage"
                                component="input"
                                type="number"
                                placeholder="Mileage"
                                className="col-xs-6 col-md-4"
                            />
                        </div>
                        <div className="row" style={formInputStyle}>
                            <label className="col-xs-4 col-md-3">Battery Size</label>
                            <Field
                                name="batterySize"
                                component="input"
                                type="number"
                                placeholder="Battery Size"
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
                        <pre>{JSON.stringify(values, 0, 2)}</pre>
                    </form>
                )}
            />
        </div>
    );
}

export default Preferences;