"use client";

import PortfolioUploadForm from "@/components/PortfolioUploadForm";

export default function SessionsPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-6">All Sessions</h1>
        <PortfolioUploadForm />
      </div>
    </main>
  );
}
