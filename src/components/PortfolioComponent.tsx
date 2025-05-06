'use client'
import { useEffect, useState } from "react";
import { getPortfolioImages, PortfolioImage } from "@/services/portfolio/portfolioService";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function PortfolioGallery() {
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    const load = async () => {
      const all = await getPortfolioImages();
      setImages(all);
      setCategories([...new Set(all.map((img) => img.category))]);
      setTags([...new Set(all.flatMap((img) => img.tags || []))]);

      const catParam = searchParams.get("category");
      if (catParam) {
        setSelectedCategory(catParam);
      }
    };
    load();
  }, [searchParams]);

  const filtered = images.filter((img) => {
    const matchesCategory = selectedCategory ? img.category === selectedCategory : true;
    const matchesTags = selectedTags.length
      ? selectedTags.every((tag) => img.tags?.includes(tag))
      : true;
    return matchesCategory && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Portfolio</h1>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Category</label>
          <select
            className="p-2 border rounded"
            value={selectedCategory ?? ""}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
          >
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      <div className="mb-6">
        <label className="block mb-1 font-semibold">Tags</label>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Button
              key={tag}
              size="sm"
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((img, i) => (
            <div key={img.id} className="relative w-full aspect-[4/3] cursor-pointer" onClick={() => setLightboxIndex(i)}>
            <Image
                src={img.url}
                alt={img.category}
                fill
                className="object-cover rounded shadow"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            </div>
        ))}
      </div>

      <Dialog open={lightboxIndex !== null} onOpenChange={() => setLightboxIndex(null)}>
        <DialogContent
            className="w-full max-w-none h-[80vh] p-0 m-0 overflow-hidden"
            style={{ maxWidth: "80vw" }}
            >
            {lightboxIndex !== null && (
            <div className="relative bg-black text-white flex flex-col h-full">
                <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-2 right-2 p-2 z-10"
                >
                <X size={24} />
                </button>

                <div className="flex items-center justify-between p-4 flex-1">
                <button
                    onClick={() =>
                    setLightboxIndex((i) =>
                        i !== null ? (i - 1 + filtered.length) % filtered.length : null
                    )
                    }
                    className="p-2"
                >
                    <ArrowLeft />
                </button>

                <div className="relative w-full h-full max-h-[90vh] mx-auto">
                    <Image
                        src={filtered[lightboxIndex].url}
                        alt={filtered[lightboxIndex].title || "Portfolio Image"}
                        fill
                        className="object-contain"
                        sizes="100vw"
                        priority
                    />
                </div>

                <button
                    onClick={() =>
                    setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null))
                    }
                    className="p-2"
                >
                    <ArrowRight />
                </button>
                </div>

                <div className="text-center py-2 text-sm text-gray-300">
                Category: {filtered[lightboxIndex].category} | Tags:{" "}
                {filtered[lightboxIndex].tags?.join(", ")}
                </div>
            </div>
            )}
        </DialogContent>
      </Dialog>

    </div>
  );
}
