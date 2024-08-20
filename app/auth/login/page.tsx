import { login } from "./actions";
export default async function Page() {
	return (
		<>
			<h1>Sign in</h1>
			<form action={login}>
				<label htmlFor="username">Username</label>
				<input name="username" id="username" className="text-black" />
				<br />
				<label htmlFor="password">Password</label>
				<input type="password" name="password" id="password" className="text-black" />
				<br />
				<button>Continue</button>
			</form>
		</>
	);
}
