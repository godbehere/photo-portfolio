import Image from "next/image";
import { PortfolioImage } from "@/services/portfolio/portfolioService";

interface ImageCardProps {
  image: PortfolioImage;
  onClick: () => void;
}

export default function ImageCard({ image, onClick }: ImageCardProps) {
  return (
    <div
      className="relative w-full aspect-[4/3] cursor-pointer group overflow-hidden rounded shadow"
      onClick={onClick}
    >
      <Image
        src={image.url}
        alt={image.title || "Portfolio image"}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-50 transition-opacity flex items-end p-2">
        <div className="text-white text-sm">
          {image.title && <p className="font-semibold">{image.title}</p>}
          <p className="text-xs">{image.category}</p>
        </div>
      </div>
    </div>
  );
}
