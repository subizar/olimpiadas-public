import Link from 'next/link';
import { validateRequest } from '@/lib/validate-request';
import { logout } from './actions';
import { redirect } from 'next/navigation';

export default async function Home() {
  const { user, session } = await validateRequest();
  if (!session) {
    redirect("/auth/login");
  }
  if (user && user.role == "sales") {
    redirect("/dashboard");
  }
  if (user && user.role == "user"){
    redirect("/app/purchase");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-100 to-gray-200 space-y-8">
      <h1>Menú principal</h1>
      {user && session && user.role == "sales" && <div><Link href="/dashboard">Gestión de productos</Link></div>}
      {user && session && user.role == "sales" && <div><Link href="/dashboard/pending">Vista de pedidos</Link></div>}
      {user && session && <div><Link href="/app/purchase">Comprar</Link></div>}
      {user && session && <div><Link href="/app/pending">Mis pedidos</Link></div>}

      {user && (
        <form action={logout}>
          <button>Logout</button>
        </form>
      )}
      {!user && <Link href="/auth/login">Login</Link>}
      {!user && <Link href="/auth/signup">Signup</Link>}

    </main>
  );
}
