import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: "1",
    title: "Amazon Lake",
    price: "$45",
    image: "/products/amazon-lake.jpg",
  },
  {
    id: "2",
    title: "Rainbow Boa",
    price: "$30",
    image: "/products/rainbow-boa.jpg",
  },
  {
    id: "3",
    title: "Weevil",
    price: "$40",
    image: "/products/weevil.jpg",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-6">Shop Featured Prints</h2>
        <p className="text-gray-600 mb-10">
          Limited edition prints and digital artwork. Curated by the artist.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <Image
                src={product.image}
                alt={product.title}
                width={600}
                height={400}
                className="w-full h-60 object-cover"
              />
              <div className="p-4 text-left">
                <h3 className="text-lg font-medium mb-1">{product.title}</h3>
                <p className="text-gray-700 font-semibold">{product.price}</p>
                <Link
                  href={`/shop/${product.id}`}
                  className="inline-block mt-3 text-sm text-blue-600 hover:underline"
                >
                  View Product →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/shop"
          className="inline-block mt-12 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
        >
          Visit the Shop
        </Link>
      </div>
    </section>
  );
}
