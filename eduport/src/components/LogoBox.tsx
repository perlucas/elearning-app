import logo from '@/assets/images/logo.svg'
import logoLight from '@/assets/images/logo-light.svg'
import { Link } from 'react-router-dom'

const LogoBox = ({ height, width }: { height?: number; width?: number }) => {
  return (
    <Link className="navbar-brand" to="/">
      <img height={height} width={width} className="light-mode-item navbar-brand-item w-auto" src={logo} alt="logo" />
      <img height={height} width={width} className="dark-mode-item navbar-brand-item w-auto" src={logoLight} alt="logo" />
    </Link>
  )
}

export default LogoBox
