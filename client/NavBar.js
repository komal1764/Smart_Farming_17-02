import {Link} from "react-router-dom"
function NavBar()
{
	return(
	<>
	<center>

		<div className="nav">

		<Link to="/" > Login </Link>
		<Link to="/signup" > Signup </Link>
		

	</div>
	</center>
	</>
	);
}
export default NavBar;
