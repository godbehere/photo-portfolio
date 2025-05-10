import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-10">
      <h1 className="text-4xl font-bold text-center">About Me</h1>

      {/* Main Image */}
      <div className="relative w-full h-100 rounded-xl overflow-hidden shadow-md">
        <Image
          src="/images/about-me1.jpg"
          alt="Portrait of the photographer"
          fill
          className="object-cover"
        />
      </div>

      {/* Text Content */}
      <div className="space-y-6 text-lg text-muted-foreground">
        <p>
          Hi, I’m [Your Name], a Toronto-based photographer with a passion for capturing people, moments, and emotion through the lens. My work focuses on lifestyle, portrait, and event photography—telling stories through honest, vibrant imagery.
        </p>
        <p>
          Whether I’m photographing a quiet moment at home or a bustling celebration downtown, I bring an eye for detail and a calming presence that helps people feel at ease in front of the camera. My goal is always to create a comfortable experience that results in genuine, beautiful photos.
        </p>
        <p>
          When I’m not behind the camera, I’m usually exploring the city, chasing golden hour light, or experimenting with film. Photography is more than just a job—it’s how I connect with people and preserve what matters most.
        </p>
      </div>

      {/* Optional Additional Image */}
      <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-md">
        <Image
          src="/images/about-me3.jpg" // Optional second image
          alt="Behind the scenes"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
