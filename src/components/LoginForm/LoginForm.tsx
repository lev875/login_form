import { FormEventHandler, Fragment, useId, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../../requests";
import EyeIcon from "./EyeIcon";
import * as classes from "./style.module.css"

const LoginForm = () => {

  const formId          = useId()
  const emailInputId    = formId + '_email'
  const passwordInputId = formId + '_password'

  const [ email, setEmail ]                 = useState("")
  const [ emailError, setEmailError ]       = useState(null)
  const [ password, setPassword ]           = useState("")
  const [ passwordError, setPasswordError ] = useState(null)
  const [ showPassword, setShowPassword ]   = useState(false)
  const [ isValid, setIsValid ]             = useState(false)
  const [ error, setError ]                 = useState(null)
  const [ isLoading, setIsLoading ]         = useState(false)

  const navigate = useNavigate()

  const submitHandler: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    if (!e.currentTarget.checkValidity()) return
    setError(null)
    setIsLoading(true)
    login(email, password)
      .then(({ username }) => {
        console.log(`User ${username} successfully logged in!`)
        navigate("/success")
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setIsLoading(false))
  }

  return <form
    onSubmit={ submitHandler }
    className={ classes.form }
    onChange={ ({ currentTarget }) => setIsValid(currentTarget.checkValidity()) }
  > {
    isLoading
      ? <div className={ classes.spinner }/>
      : <Fragment>
        <div>
          <label htmlFor={ emailInputId }>Email</label>
          <input
            id={ emailInputId }
            type="email"
            placeholder="email"
            value={ email }
            tabIndex={ 0 }
            required
            onChange={ ({ currentTarget }) => {
              if (currentTarget.checkValidity()) setEmailError(null)
              setEmail(currentTarget.value)
            }}
            onBlur={ ({ currentTarget }) => {
              if (!currentTarget.checkValidity())
                setEmailError(currentTarget.validationMessage)
            }}
          />
          <span className={ `${classes.error} ${emailError ? classes.shownError : ""}` }>
            { emailError }
          </span>
        </div>
        <div>
          <label htmlFor={ passwordInputId }>Password</label>
          <div className={ classes.passwordInput }>
            <input
              id={ passwordInputId }
              type={ showPassword ? "text" : "password" }
              placeholder="password"
              value={ password }
              required
              onChange={ ({ currentTarget }) => {
                if (currentTarget.checkValidity()) setPasswordError(null)
                setPassword(currentTarget.value)
              }}
              onBlur={ ({ currentTarget }) => {
                if (!currentTarget.checkValidity())
                  setPasswordError(currentTarget.validationMessage)
              }}
            />
            <EyeIcon
              showPassword={ showPassword }
              setShowPassword={ setShowPassword }
            />
          </div>
          <span className={ `${classes.error} ${ passwordError ? classes.shownError : ""}` }>
            { passwordError }
          </span>
        </div>
        <div className={ classes.signUpBlock }>
          <Link to="/restore_password">Forgot password?</Link>
          <Link to="/signup">Sign up</Link>
        </div>
        <input
          disabled={ !isValid }
          type="submit"
          value="Login"/>
        { error
          ? <span className={ `${classes.error} ${ error ? classes.shownError : ""}` }>
            { error }
          </span>
          : null
        }
      </Fragment>
  }
  </form>

}

export default LoginForm
