import Link from "next/link";
import { signup } from "./actions";
import { validateRequest } from "@/lib/validate-request";
import { redirect } from "next/navigation";

export default async function Page() {
	const {session } = await validateRequest();
	if (session) {
		redirect("/");
	}
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-6 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-xs w-full">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Registrarse
        </h1>
        <form action={signup} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
              Nombre de usuario
            </label>
            <input
              name="username"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
			  Contraseña
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-between items-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Registrarse
            </button>
            <Link href="/auth/signin/" className="text-blue-500 hover:underline">
              <span>Inicio de sesión</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}