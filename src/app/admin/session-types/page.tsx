import SessionTypeList from "@/components/SessionTypeList";
import { getAuth } from "@/lib/firebaseAdmin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SessionTypeAdminPage() {
  const sessionCookie = (await cookies()).get('__session')?.value;
  if (!sessionCookie) return redirect('/login');

  const decoded = await getAuth.verifySessionCookie(sessionCookie, true);
  if (!decoded.admin) return redirect('/unauthorized');
  
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Session Types</h1>
      <SessionTypeList />
    </div>
  );
}
