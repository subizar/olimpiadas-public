import Link from 'next/link';
import Image from 'next/image';
import { validateRequest } from '@/lib/validate-request';
import { logout } from '@/app/actions';

interface UserSession {
  user: {
    role: string;
  };
  session: any;
}

export default async function Sidebar() {
  const { user, session } = await validateRequest();

  return (
    <aside className="bg-gray-800 text-gray-300 w-64 min-h-screen fixed left-0 top-0 px-6 py-8 flex flex-col">
      <nav className="flex-grow space-y-4">
        {/* Sales Links */}
        {user && session && user.role === "sales" && (
          <>
            <Link href="/dashboard" className="block py-2 px-4 rounded hover:bg-gray-700">
              Gestión de productos
            </Link>
            <Link href="/dashboard/pending" className="block py-2 px-4 rounded hover:bg-gray-700">
              Vista de pedidos
            </Link>
          </>
        )}

        {/* User Links */}
        {user && session && (
          <>
            <Link href="/app/purchase" className="block py-2 px-4 rounded hover:bg-gray-700">
              Comprar
            </Link>
            <Link href="/app/pending" className="block py-2 px-4 rounded hover:bg-gray-700">
              Mis pedidos
            </Link>
          </>
        )}
      </nav>

      <div className="mt-auto">
        {/* Auth Links */}
        {user && (
          <form action={logout}>
            <button className="block w-full py-2 px-4 rounded bg-red-500 hover:bg-red-600 text-white font-medium">
              Logout
            </button>
          </form>
        )}
        {!user && (
          <>
            <Link href="/auth/login" className="block py-2 px-4 rounded hover:bg-gray-700">
              Login
            </Link>
            <Link href="/auth/signup" className="block py-2 px-4 rounded hover:bg-gray-700">
              Signup
            </Link>
          </>
        )}
      </div>
    </aside>
  );
}