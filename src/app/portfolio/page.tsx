import PortfolioGallery from "@/components/PortfolioComponent";
import { Suspense } from "react";

export default function PortfolioPage() {
    return (
      <main className="container mx-auto px-4 py-12">
        <Suspense>
          <PortfolioGallery />
        </Suspense>
      </main>
    )
  }
  