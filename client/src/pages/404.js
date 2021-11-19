import React from "react";
import { withRouter } from 'react-router-dom';
//* ==============================

function NotFound(props) {
  return (
    <div className="notfound">
      <button onClick={() => props.history.push("/")} className="button404">GO BACK TO HOME PAGE</button>
    </div>
  );
}

export default withRouter(NotFound);
