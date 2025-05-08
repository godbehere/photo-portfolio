import PortfolioBatchUploadInline from "@/components/PortfolioBatchUploadInline";
import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// import PortfolioUploadForm from "@/components/PortfolioUploadForm";

export default async function SessionsPage() {
  const sessionCookie = (await cookies()).get('__session')?.value;
  if (!sessionCookie) return redirect('/login');

  const decoded = await getAuth().verifySessionCookie(sessionCookie, true);
  if (!decoded.admin) return redirect('/unauthorized');
  
  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        {/* <PortfolioUploadForm /> */}
        <PortfolioBatchUploadInline />
      </div>
    </main>
  );
}
