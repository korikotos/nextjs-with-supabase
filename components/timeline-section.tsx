export default function TimelineSection() {
  return (
    <section className="bg-gray-900 py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-4xl font-bold text-white mb-16">Your Legacy Through Time</h2>

        <div className="relative mx-auto max-w-4xl">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-purple-600 via-pink-500 to-blue-600"></div>

          {/* Timeline items */}
          <div className="space-y-24">
            {/* Item 1 */}
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-1/2 md:pr-12 md:text-right">
                <h3 className="text-2xl font-bold text-white mb-3">Present Day</h3>
                <p className="text-gray-300">
                  Begin your journey with The Ineffable. Create your personal AI Dye and start building your digital
                  legacy through immersive experiences.
                </p>
              </div>
              <div className="absolute left-1/2 top-0 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-purple-600">
                <span className="h-4 w-4 rounded-full bg-white"></span>
              </div>
              <div className="md:w-1/2 md:pl-12 pt-10 md:pt-0"></div>
            </div>

            {/* Item 2 */}
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-1/2 md:pr-12"></div>
              <div className="absolute left-1/2 top-0 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-pink-500">
                <span className="h-4 w-4 rounded-full bg-white"></span>
              </div>
              <div className="md:w-1/2 md:pl-12 pt-10 md:pt-0 md:text-left">
                <h3 className="text-2xl font-bold text-white mb-3">Next Generation</h3>
                <p className="text-gray-300">
                  Your children and grandchildren interact with your digital legacy, learning from your experiences and
                  continuing your story.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-1/2 md:pr-12 md:text-right">
                <h3 className="text-2xl font-bold text-white mb-3">Century Later</h3>
                <p className="text-gray-300">
                  Your AI Dye has evolved, preserving your essence and wisdom for descendants who never had the chance
                  to meet you in person.
                </p>
              </div>
              <div className="absolute left-1/2 top-0 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-blue-600">
                <span className="h-4 w-4 rounded-full bg-white"></span>
              </div>
              <div className="md:w-1/2 md:pl-12 pt-10 md:pt-0"></div>
            </div>

            {/* Item 4 */}
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-1/2 md:pr-12"></div>
              <div className="absolute left-1/2 top-0 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-purple-600">
                <span className="h-4 w-4 rounded-full bg-white"></span>
              </div>
              <div className="md:w-1/2 md:pl-12 pt-10 md:pt-0 md:text-left">
                <h3 className="text-2xl font-bold text-white mb-3">Millennium</h3>
                <p className="text-gray-300">
                  Your legacy continues to influence future generations, creating a bridge across time that spans a
                  thousand years and beyond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

