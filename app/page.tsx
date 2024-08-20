import Link from 'next/link';
import { validateRequest } from '@/lib/validate-request';
import { logout } from './actions';

export default async function Home() {
  const { user, session } = await validateRequest();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-black-100 space-y-8">
      <h1>Menú principal</h1>
      {user && session && user.role == "sales" && <div><Link href="/c/dashboard">Dashboard</Link></div>}
      {user && (
        <form action={logout}>
          <button>Logout</button>
        </form>
      )}
      {!user && <Link href="/auth/login">Login</Link>}
      {!user && <Link href="/auth/signup">Signup</Link>}
    <Link href="/c/purchase">
      <span>Menú de compras?</span>
    </Link>
    </main>
  );
}
