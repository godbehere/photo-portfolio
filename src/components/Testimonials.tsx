const testimonials = [
    {
      name: "Emily R.",
      quote:
        "Absolutely loved working with you! The photos captured every moment perfectly. I’ll treasure them forever.",
    },
    {
      name: "James T.",
      quote:
        "Professional, easy to work with, and incredibly talented. The results were beyond what I expected.",
    },
    {
      name: "Samantha L.",
      quote:
        "From start to finish, the experience was seamless. The final edits are stunning — thank you so much!",
    },
  ];
  
  export default function Testimonials() {
    return (
      <section className="bg-white py-16 px-4 dark:bg-gray-900 dark:text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-10">What Clients Are Saying</h2>
  
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <p className="text-gray-700 italic mb-4">“{t.quote}”</p>
                <p className="font-semibold text-gray-900">– {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  