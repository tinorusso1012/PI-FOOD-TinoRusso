import React from 'react'
import {Link} from "react-router-dom";
function LandingPage() {
  return (
    <div>
    <Link to= "/home">
        <button> Ingresar</button>
    </Link>
    </div>
  )
}

export default LandingPage