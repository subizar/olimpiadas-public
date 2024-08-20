import { signup } from "./actions";
import Link from "next/link";
//import { lucia, validateRequest } from "@/lib/auth";
export default async function Page() {
	/*const { user } = await validateRequest();
	if (user) {
		return redirect("/");   
	}*/
	return (
		<>
			<h1>Create an account</h1>
			<form action={signup}> 
				<label htmlFor="username">Username</label>
				<input name="username" id="username" className="text-black" />
				<br />
				<label htmlFor="password">Password</label>
				<input type="password" name="password" id="password" className="text-black" />
				<br />
				<button>Continue</button>
			</form>
			<Link href="/login">Sign in</Link>
		</>
	);
}
// IMPORTANTE: TODAVÍA NO MUESTRA EL ERROR EN CASO DE QUE HAYA UNO