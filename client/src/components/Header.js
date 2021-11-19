import React from "react";
import { withRouter } from 'react-router-dom';
import Logo from "../assets/BEACTIVLogo.svg"
function Header(props) {
  return (
    <div className="header">
      <img  className="logo"src={Logo} alt="kid on skateboard" onClick={() => props.history.push('/')}/>
    </div>
  );
}

export default withRouter(Header);
