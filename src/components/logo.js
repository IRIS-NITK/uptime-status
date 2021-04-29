/** @jsx jsx */
import { jsx } from "theme-ui"
import ReactLogo from '../../assets/logo.svg';

const Logo = (props) => (

  <img src={ReactLogo} alt="IRIS Logo" width="100px" />
)

Logo.defaultProps = {
  color: "white",
}

export default Logo
