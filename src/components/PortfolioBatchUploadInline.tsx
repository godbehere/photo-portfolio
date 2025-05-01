/* eslint-disable @typescript-eslint/no-explicit-any */
// Step 1: Multi-image batch upload with inline metadata entry
// File: components/admin/PortfolioBatchUploadInline.tsx

"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { uploadImage, createPortfolioImageDoc } from "@/services/portfolio/portfolioService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { X } from "lucide-react";

interface ImageWithMetadata {
  file: File;
  previewUrl: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  tagInput: string;
}

export default function PortfolioBatchUploadInline() {
  const [images, setImages] = useState<ImageWithMetadata[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;

    const imgArray: ImageWithMetadata[] = [];

    for (const file of Array.from(files)) {
      const compressed = await imageCompression(file, {
        maxSizeMB: 10,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });
      imgArray.push({
        file: compressed,
        previewUrl: URL.createObjectURL(compressed),
        title: "",
        description: "",
        category: "",
        tags: [],
        tagInput: "",
      });
    }
    setImages((prev) => [...prev, ...imgArray]);
  };

  const updateImage = (index: number, key: keyof ImageWithMetadata, value: any) => {
    setImages((prev) => {
      const copy = [...prev];
      copy[index][key] = value;
      return copy;
    });
  };

  const addTag = (index: number) => {
    const image = images[index];
    if (image.tagInput.trim()) {
      const tags = [...image.tags, image.tagInput.trim()];
      updateImage(index, "tags", tags);
      updateImage(index, "tagInput", "");
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const isValid = images.every((img) => img.file && img.category.trim());

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleClickSelectFiles = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    if (!isValid) {
      toast.error("Each image must have a category");
      return;
    }
    setLoading(true);
    try {
      for (const img of images) {
        const { url, storagePath } = await uploadImage(img.file, img.category);
        await createPortfolioImageDoc({
          url,
          storagePath,
          title: img.title,
          description: img.description,
          category: img.category,
          tags: img.tags,
        });
      }
      toast.success("All images uploaded successfully!");
      setImages([]);
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold">Batch Portfolio Upload</h2>

      {/* Drag & Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleClickSelectFiles}
        className="border-2 border-dashed border-gray-400 p-6 rounded-md text-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
      >
        <p className="text-gray-600">Drag and drop images here, or click to select</p>
        <Input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          ref={fileInputRef}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* Image Metadata Forms */}
      {images.map((img, i) => (
        <div key={i} className="border rounded p-4 space-y-2 relative">
          {/* Remove Button */}
          <button
            type="button"
            onClick={() => removeImage(i)}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200"
            title="Remove image"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          <div className="relative w-full max-w-md aspect-video mx-auto">
            <Image src={img.previewUrl} alt="Preview" fill className="object-contain rounded" />
          </div>

          <Input
            placeholder="Title"
            value={img.title}
            onChange={(e) => updateImage(i, "title", e.target.value)}
          />

          <Textarea
            placeholder="Description"
            value={img.description}
            onChange={(e) => updateImage(i, "description", e.target.value)}
          />

          <Input
            placeholder="Category"
            value={img.category}
            onChange={(e) => updateImage(i, "category", e.target.value)}
          />

          <div>
            <label className="block font-medium">Tags</label>
            <div className="flex gap-2 mb-2">
              <Input
                value={img.tagInput}
                onChange={(e) => updateImage(i, "tagInput", e.target.value)}
                placeholder="Add tag"
              />
              <Button type="button" onClick={() => addTag(i)}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {img.tags.map((tag, idx) => (
                <span key={idx} className="bg-gray-100 px-2 py-1 rounded text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}

      {images.length > 0 && (
        <Button onClick={handleSubmit} disabled={loading} className="w-full">
          {loading ? "Uploading..." : "Upload All Images"}
        </Button>
      )}
    </div>
  );
}
