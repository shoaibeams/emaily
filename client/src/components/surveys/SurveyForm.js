//SurveyForm shows a form for a user to add input
import React, { Component } from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form'
import SurveyField from './SurveyField'
import validateEmails from '../utils/validateEmail'
import formFields from './formFields'

class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          component={SurveyField}
          type="text"
          label={label}
          name={name}
          key={name}
        />
      )
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}

          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">navigate_next</i>
          </button>
          <Link to="/surveys" className="red btn-flat left white-text">
            Cancel
            <i className="material-icons right">cancel</i>
          </Link>
        </form>
      </div>
    )
  }
}

const validate = values => {
  const errors = {}
  errors.emails = validateEmails(values.recipients || '')

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a value for ${name}`
    }
  })

  return errors
}

export default reduxForm({ validate, form: 'surveyForm', destroyOnUnmount: false })(
  SurveyForm
)
