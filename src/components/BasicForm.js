import useInput from '../hooks/use-input';

const BasicForm = (props) => {
  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const nameReg = /^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/;

  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    hasError: firstNameInputHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameInputBlurHandler,
  } = useInput((value) => nameReg.test(value));

  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameInputBlurHandler,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
  } = useInput((value) => emailReg.test(value));

  let formIsValid = false;
  if (
    enteredFirstNameIsValid &&
    enteredEmailIsValid &&
    enteredLastNameIsValid
  ) {
    formIsValid = true;
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (
      !enteredFirstNameIsValid &&
      !enteredEmailIsValid &&
      !enteredLastNameIsValid
    )
      return;
  };

  const firstNameInputClasses = firstNameInputHasError
    ? 'form-control error-text'
    : 'form-control';

  const lastNameInputClasses = lastNameInputHasError
    ? 'form-control error-text'
    : 'form-control';

  const emailInputClasses = emailInputHasError
    ? 'form-control error-text'
    : 'form-control';

  return (
    <form onSubmit={formSubmitHandler}>
      <div>
        <div className={firstNameInputClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            onChange={firstNameChangeHandler}
            onBlur={firstNameInputBlurHandler}
            value={enteredFirstName}
          />
          {firstNameInputHasError && (
            <p>Username must have letters and digits</p>
          )}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            onChange={lastNameChangeHandler}
            onBlur={lastNameInputBlurHandler}
            value={enteredLastName}
          />
          {lastNameInputHasError && <p>Name must not be empty</p>}
        </div>

        <div className={emailInputClasses}>
          <label htmlFor="email">E-Mail Address</label>
          <input
            type="text"
            id="email"
            onChange={emailChangeHandler}
            onBlur={emailInputBlurHandler}
            value={enteredEmail}
          />
          {emailInputHasError && <p>Email must include '@'</p>}
        </div>
        <div className="form-actions">
          <button disabled={!formIsValid}>Submit</button>
        </div>
      </div>
    </form>
  );
};

export default BasicForm;
