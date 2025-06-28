export default function TestimonialSection() {
  return (
    <section className="bg-black py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-4xl font-bold text-white mb-16">Voices Across Time</h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Testimonial 1 */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/40 to-gray-900/40 p-8 backdrop-blur-sm">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-purple-600/10 blur-3xl"></div>
            <div className="relative z-10">
              <p className="mb-6 text-gray-300">
                "The Ineffable has allowed me to create a living legacy for my grandchildren. The thought that they'll
                be able to interact with my stories and memories long after I'm gone brings me incredible peace."
              </p>
              <div>
                <p className="font-bold text-white">Elena Morales</p>
                <p className="text-sm text-gray-400">Historian & Grandmother</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900/40 to-gray-900/40 p-8 backdrop-blur-sm">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-600/10 blur-3xl"></div>
            <div className="relative z-10">
              <p className="mb-6 text-gray-300">
                "As someone who lost their parents at a young age, The Ineffable has given me a chance to connect with
                my family history in ways I never thought possible. It's like having conversations with ancestors I
                never met."
              </p>
              <div>
                <p className="font-bold text-white">Marcus Chen</p>
                <p className="text-sm text-gray-400">Software Engineer</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-900/40 to-gray-900/40 p-8 backdrop-blur-sm">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-pink-600/10 blur-3xl"></div>
            <div className="relative z-10">
              <p className="mb-6 text-gray-300">
                "The collaborative puzzles and shared experiences have brought our family closer together despite living
                on different continents. We're building a shared legacy that will outlast all of us."
              </p>
              <div>
                <p className="font-bold text-white">Sophia Okonkwo</p>
                <p className="text-sm text-gray-400">Family Therapist</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
