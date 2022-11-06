import EyeSvgIcon from "jsx:../../img/eye.svg"
import EyeSlashIcon from "jsx:../../img/eyeSlash.svg"
import { KeyboardEventHandler, useRef } from "react"

interface SetFunction {
  (arg: boolean): void
}

export interface PropsType {
  showPassword: boolean,
  setShowPassword: SetFunction
}

const EyeIcon = ({ showPassword, setShowPassword }: PropsType) => {

  const togglePasswordKeyHandler: KeyboardEventHandler<Element> = ({ code }) => {
    if (code === "Space" || code === "Enter") {
      previousState.current = showPassword
      setShowPassword(!showPassword)
    }
  }

  let previousState = useRef(showPassword)

  const setRef = el => {
    if (!el) return
    if (previousState.current === showPassword) return
    el.focus()
    previousState.current = showPassword
  }
  
  return showPassword
    ? <EyeSlashIcon
      ref={ showPassword ? setRef : null }
      tabIndex="0"
      onClick={ () => setShowPassword(false) }
      onKeyDown={ togglePasswordKeyHandler }
      aria-label="Hide Password"
    />
    : <EyeSvgIcon
      ref={ !showPassword ? setRef : null }
      tabIndex="0"
      onClick={ () => setShowPassword(true) }
      onKeyDown={ togglePasswordKeyHandler }
      aria-label="Show Password"
    />

}

export default EyeIcon
