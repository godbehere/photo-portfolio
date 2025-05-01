import Image from "next/image";

type Category = {
    title: string;
    image: string;
    href: string;
  };
  
  const categories: Category[] = [
    {
      title: "Pets",
      image: "/portfolio/pets.jpg",
      href: "/portfolio#pets",
    },
    {
      title: "Portraits",
      image: "/portfolio/portraits.jpg",
      href: "/portfolio?category=Portraits",
    },
    {
      title: "Landscapes",
      image: "/portfolio/landscapes.jpg",
      href: "/portfolio?category=Landscapes",
    },
  ];
  
  export default function PortfolioCategories() {
    return (
      <section className="bg-gray-100 py-16 px-4 dark:bg-gray-900 dark:text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-10">Portfolio Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <a
                key={cat.title}
                href={cat.href}
                className="group relative block overflow-hidden rounded-xl shadow-lg"
              >
                <div className="relative w-full h-64">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <h3 className="text-white text-2xl font-bold">{cat.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }
  