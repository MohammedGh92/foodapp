import { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Form extends PureComponent {
  static propTypes = {
    render: PropTypes.func.isRequired,
    schema: PropTypes.objectOf(PropTypes.any).isRequired,
    onSubmit: PropTypes.func,
    validationSchema: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      isSubmitting: false,
      isValidating: false,
      errors: {},
      clearToggle: false,
    };

    this.values = props.schema;
    this.inputErrorsState = {};
  }

  setFieldValue = (name, value, noValidate, removeError = true) => {
    this.values[name] = value;

    if (noValidate) {
      if (removeError) {
        const errorsCollection = { ...this.state.errors };
        delete errorsCollection[name];

        this.setState({
          errors: errorsCollection,
        });
        return;
      }
      return;
    }

    this.validateFormField(name);
  };

  validateFormField = name => {
    const error = this.validateField(name);
    if (error[name]) {
      this.setState({
        errors: {
          ...this.state.errors,
          [name]: error[name],
        },
      });
    } else if (this.state.errors[name]) {
      const errorsCollection = { ...this.state.errors };
      delete errorsCollection[name];

      this.setState({
        errors: errorsCollection,
      });
    }
  };

  getErrorsFromValidationError = (validationError, name) =>
    validationError.inner.reverse().reduce(
      (errors, error) => ({
        ...errors,
        [name || error.path]: error.message,
      }),
      {},
    );

  setSubmitting = value => {
    this.setState({
      isSubmitting: value,
    });
  };

  resetform = () => {
    this.setState(prevState => ({
      clearToggle: !prevState.clearToggle,
    }));
  };

  validateField = name => {
    if (!this.props.validationSchema) {
      return {};
    }

    const validationSchema = this.props.validationSchema(this.values);

    if (!validationSchema.fields[name]) {
      return {};
    }

    try {
      validationSchema.fields[name].validateSync(this.values[name], {
        abortEarly: false,
      });
      return {};
    } catch (error) {
      return this.getErrorsFromValidationError(error, name);
    }
  };

  validate = () => {
    if (!this.props.validationSchema) {
      return {};
    }

    const validationSchema = this.props.validationSchema(this.values);

    try {
      validationSchema.validateSync(this.values, { abortEarly: false });
      return {};
    } catch (error) {
      // showError(I18n.t('ui-form-error'));
      return this.getErrorsFromValidationError(error);
    }
  };

  setError = (name, errText) => {
    const errorsCollection = { ...this.state.errors };
    if (errText) {
      errorsCollection[name] = errText;
    } else {
      delete errorsCollection[name];
    }

    this.setState({
      errors: {
        ...errorsCollection,
      },
    });
  };

  setErrors = errors => {
    this.setSubmitting(false);
    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        ...errors,
      },
    }));
  };

  setErrorState = (name, v) => {
    this.inputErrorsState = {
      ...this.inputErrorsState,
      [name]: v,
    };
  };

  handleSubmit = () => {
    this.setState({ isValidating: true, isSubmitting: true });

    // halt on validation schema errors
    const errors = this.validate();
    if (Object.keys(errors).length > 0) {
      this.setState(prevState => ({
        isValidating: false,
        isSubmitting: false,
        errors: {
          ...errors,
          ...prevState.errors,
        },
      }));
      return;
    }

    // halt on any errors found
    if (Object.keys(this.state.errors).length > 0) {
      this.setState({
        isValidating: false,
        isSubmitting: false,
      });
      return;
    }

    // check if input async is validating
    let isInputsValidating = false;
    Object.keys(this.inputErrorsState).forEach(key => {
      if (this.inputErrorsState[key]) {
        isInputsValidating = true;
      }
    });
    if (isInputsValidating) {
      this.setState({
        isValidating: false,
        isSubmitting: false,
      });
      return;
    }

    this.setState({ isValidating: false, errors: {} });

    if (this.props.onSubmit) {
      this.props.onSubmit(this.values, {
        setSubmitting: this.setSubmitting,
        resetForm: this.resetform,
        setErrors: this.setErrors,
      });
    }
  };

  injectFormProps = (name, changeValueCallbackName = 'onChange') => ({
    name,
    initialValue: this.values[name],
    [changeValueCallbackName]: this.setFieldValue,
    onBlur: this.setFieldValue,
    error: this.state.errors[name],
    reset: this.state.clearToggle,
    setError: this.setError,
    setErrorState: this.setErrorState,
    editable: !this.state.isSubmitting,
  });

  render() {
    return this.props.render({
      injectFormProps: this.injectFormProps,
      isSubmitting: this.state.isSubmitting,
      isValidating: this.state.isValidating,
      handleSubmit: this.handleSubmit,
      setFieldValue: this.setFieldValue,
      resetForm: this.resetform,
      initialValues: this.values,
      errors: this.state.errors,
      setError: this.setError,
      validateField: this.validateFormField,
    });
  }
}

export default Form;
