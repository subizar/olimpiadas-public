export default function Page() {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-100 space-y-8">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
          <h1 className="text-2xl font-bold mb-6 text-center text-black">Login</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input id="username" type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input id="password" type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <a href="#" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mb-4">
              Olvido su contraseña?
            </a>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Sign In
            </button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Register
            </button>
          </div>
        </div>
  
        <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
          <h1 className="text-2xl font-bold mb-6 text-center text-black">Register</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
              Nombre
            </label>
            <input id="nombre" type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
              Apellido
            </label>
            <input id="apellido" type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fechanac">
              Fecha de nacimiento
            </label>
            <input id="fechanac" type="date" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
              Telefono
            </label>
            <input id="telefono" type="tel" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gmail">
              Gmail
            </label>
            <input id="gmail" type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input id="password" type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Register
            </button>
          </div>
        </div>
  
        <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
          <h1 className="text-2xl font-bold mb-6 text-center text-black">Olvide mi contraseña</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="got">
              Gmail o Numero de telefono
            </label>
            <input id="got" type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Recuperar cuenta
            </button>
          </div>
        </div>
  
        <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
    <h1 className="text-2xl font-bold mb-6 text-center text-black">Olvidé mi contraseña</h1>
    
    <div className="flex items-center justify-between mb-4">
      <label className="block text-gray-700 text-sm font-bold" htmlFor="codigo">
        Código
      </label>
      <a href="#" className="font-bold text-sm text-blue-500 hover:text-blue-800">
        Reenviar código
      </a>
    </div>
    
    <input id="codigo" type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" />
  
    <div className="flex items-center justify-between">
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Enviar código
      </button>
    </div>
  </div>
  
        <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
          <h1 className="text-2xl font-bold mb-6 text-center text-black">Olvide mi contraseña</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nuevacontraseña">
              Nueva Contraseña
            </label>
            <input id="nuevacontraseña" type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Restablecer contraseña
            </button>
          </div>
        </div>
      </main>
    );
  }
  