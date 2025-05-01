"use client";

import { useState } from "react";
import { uploadImage } from "@/services/portfolio/uploadImage";
import { createPortfolioImageDoc } from "@/services/portfolio/createPortfolioImageDoc";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
// import { toast } from "react-hot-toast";
import { toast } from "sonner";

export default function PortfolioUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
//   const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
//   const [categoryInput, setCategoryInput] = useState("");
  const [tagInput, setTagInput] = useState("");

//   const addCategory = () => {
//     if (categoryInput.trim()) {
//       setCategories((prev) => [...prev, categoryInput.trim()]);
//       setCategoryInput("");
//     }
//   };
  
  const addTag = () => {
    if (tagInput.trim()) {
      setTags((prev) => [...prev, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !category) {
      toast.error("Please select a file and category.");
      return;
    }

    setLoading(true);
    try {
      const { url, storagePath } = await uploadImage(file, category);
      await createPortfolioImageDoc({
        url,
        storagePath,
        title,
        category,
        description,
        tags,
      });
      
      toast.success("Image uploaded successfully!");
      // Reset form
      setFile(null);
      setCategory("");
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold">Upload Portfolio Image</h2>

      <Input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

        {/* Categories */}
        <Input
            placeholder="Add category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
        />

        {/* Tags */}
        <div>
        <label className="block mb-1 font-medium">Tags</label>
        <div className="flex gap-2">
            <Input
            placeholder="Add tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            />
            <Button type="button" onClick={addTag}>Add</Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, idx) => (
            <span key={idx} className="px-2 py-1 bg-gray-100 rounded">{tag}</span>
            ))}
        </div>
        </div>


      <Input
        placeholder="Title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Button type="submit" disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </Button>
    </form>
  );
}
