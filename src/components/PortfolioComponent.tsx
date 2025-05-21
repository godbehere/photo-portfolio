'use client';
import { useEffect, useState } from "react";
import { getPortfolioImages, PortfolioImage } from "@/services/portfolio/portfolioService";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import ImageCard from "./ImageCard";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";


export default function PortfolioGallery() {
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  const IMAGES_PER_PAGE = 9;
  const [visibleCount, setVisibleCount] = useState(IMAGES_PER_PAGE);

  const [filtersOpen, setFiltersOpen] = useState(false);

  const searchParams = useSearchParams();

  const debouncedCategory = useDebounce(selectedCategory, 300);
  const debouncedTags = useDebounce(selectedTags, 300);


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
  
  useEffect(() => {
    setVisibleCount(IMAGES_PER_PAGE);
  }, [selectedCategory, selectedTags]);

  const filtered = images.filter((img) => {
    const matchesCategory = debouncedCategory ? img.category === debouncedCategory : true;
    const matchesTags = debouncedTags.length
      ? debouncedTags.every((tag) => img.tags?.includes(tag))
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

      {/* Filter Toggle Button */}
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Portfolio</h1>
          <button
            className="flex items-center gap-1 px-3 py-2 text-sm rounded-md border hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setFiltersOpen((prev) => !prev)}
          >
            <Filter className="w-4 h-4" />
            Filters
            {filtersOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

      {/* Collapsible Filter Section */}
      {filtersOpen && (
        <div className="rounded-md border bg-white dark:bg-gray-900 p-4 mb-6 space-y-4 shadow-sm">
          {/* Category Filter */}
          <div>
            <label className="block mb-1 font-semibold">Category</label>
            <select
              className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
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

      {/* Tags Filter */}
        <div>
          <label className="block mb-1 font-semibold">Tags</label>
          <div className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide py-1">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`text-sm px-3 py-1 rounded-full border transition-colors flex-shrink-0
                  ${
                    selectedTags.includes(tag)
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                  } hover:bg-opacity-80`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        {/* Clear All Button */}
        <div className="flex justify-end pt-2">
          <button
            className="text-sm text-blue-600 dark:text-blue-400 transition-all duration-200 hover:text-blue-800 dark:hover:text-blue-300 hover:scale-105"
            onClick={() => {
              setSelectedCategory(null);
              setSelectedTags([]);
              setFiltersOpen(false); // Collapse filter section
            }}
          >
            Clear All Filters
          </button>
        </div>
      </div>
    )}



      {filtered.length === 0 ? (
        <p className="text-muted-foreground text-center my-8">
          No images match your filters. Try selecting a different category or tag.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.slice(0, visibleCount).map((img, i) => (
            <ImageCard key={img.id} image={img} onClick={() => setLightboxIndex(i)} />
          ))}
        </div>
      )}
      {visibleCount < filtered.length && (
        <div className="text-center mt-6">
          <Button onClick={() => setVisibleCount((v) => v + IMAGES_PER_PAGE)}>
            Load More
          </Button>
        </div>
      )}

      {/* Lightbox Modal */}
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
                    setLightboxIndex((i) =>
                      i !== null ? (i + 1) % filtered.length : null
                    )
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
