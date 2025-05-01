"use client";

import PortfolioBatchUploadInline from "@/components/PortfolioBatchUploadInline";

// import PortfolioUploadForm from "@/components/PortfolioUploadForm";

export default function SessionsPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        {/* <PortfolioUploadForm /> */}
        <PortfolioBatchUploadInline />
      </div>
    </main>
  );
}
