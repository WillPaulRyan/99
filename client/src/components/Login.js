import React from "react";
import "./Login.css";

export default class Login extends React.Component {
  state = {

  }

  render() {
    return (
			<div id="index">
				<div id="login-container">
					<header>
						<h1>99</h1>
						<p>The addition card game</p>
					</header>
					<main>
						<form action="play">
							<div className="form-control">
								<label htmlFor="username">Username</label>
								<input
									type="text"
									name="username"
									id="username"
									placeholder="Enter username..."
									required
								/>
							</div>
							<div className="form-control">
								<label htmlFor="table">Table</label>
								<select name="table" id="table">
									<option value="A">A</option>
									<option value="B">B</option>
								</select>
							</div>
							<button type="submit">Join Chat</button>
						</form>
					</main>
				</div>
			</div>
    )
  }
}
