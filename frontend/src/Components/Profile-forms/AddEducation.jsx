import React, { useState, Fragment } from 'react';

//Redux
import { connect } from 'react-redux';
import { addEducation } from '../../Action/profileAction';
import { Link, withRouter } from 'react-router-dom';

const AddEducation = ({addEducation, history}) => {

    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [disableTodate, toggleCurentCheckboxInput] = useState(false);

    const {  school, degree, fieldofstudy, from, to, current, description } = formData;

    const handleFormData = (e)=> {
        setFormData({...formData, [e.target.name] : e.target.value});
    }

    const submitFormData = (e)=> {
        e.preventDefault();
        addEducation(formData, history);
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Add Your Education
            </h1>
            <p className="lead">
                <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that you have attended
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={(e)=>submitFormData(e)}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* School or Bootcamp"
                        name="school"
                        value={school}
                        onChange={(e)=>handleFormData(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Degree or Certificate"
                        name="degree"
                        value={degree}
                        onChange={(e)=>handleFormData(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Field Of Study" name="fieldofstudy" value={fieldofstudy} onChange={(e)=>handleFormData(e)} />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={(e)=>handleFormData(e)}/>
                </div>
                <div className="form-group">
                    <p><input type="checkbox" name="current" checked={current} value={current} 
                    onChange={ (e)=> {
                        setFormData({...formData, current: !current});
                        toggleCurentCheckboxInput(!disableTodate);
                    }}/>{' '} Current School or Bootcamp</p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" value={to} onChange={(e)=>handleFormData(e)} disabled={disableTodate?'disabled':''}/>
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Program Description"
                        value={description}
                        onChange={(e)=>handleFormData(e)}
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        educationInfo: state.profileReducer
    }
}

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation));