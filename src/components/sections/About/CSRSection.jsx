import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CSRSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const programs = [
    {
      id: 1,
      title: "Reforestation Program",
      description: "Supporting reforestation efforts in Caper through seed donations to help restore natural ecosystems and promote environmental stewardship.",
      details: [],
      image: "./images/csr/pohon.JPG"
    },
    {
      id: 2,
      title: "Different-Ability Empowerment",
      description: "We actively recruit employees with disabilities through dedicated training programs. Today, differently-abled individuals represent 3% of our workforce—reflecting our commitment to inclusivity.",
      details: [],
      image: "./images/csr/ability.jpg"
    },
    {
      id: 3,
      title: "School & University Partnership",
      description: "Providing students and interns with hands-on industry experience aligned with our values of quality, innovation, and sustainability.",
      details: [],
      image: "./images/csr/school.jpg"
    },
    {
      id: 4,
      title: "Zero Waste, Caring Environment & Community Empowerment",
      description: "PT. Globalindo Intimates is committed to Zero Waste Management by recycling fabric scraps into useful crafts, transforming used cartons into egg trays, and turning domestic wastewater into useful products through innovative initiatives.",
      details: [
        "Fabric Scraps → Community Handicrafts: Leftover fabric donated to local communities for handcrafted products and household income support",
        "Plastic Bottles → Sustainable Building Materials: Collected and converted into eco-friendly construction materials through recycling partners",
        "Canteen Food Waste → Maggot Cultivation: Organic waste transformed into sustainable animal feed, reducing landfill impact",
        "Used Cartons → Egg Trays: Leftover cartons recycled and molded into durable trays for local poultry farms"
      ],
      image: "./images/csr/waste.jpg"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % programs.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + programs.length) % programs.length);
  };

  return (
    <>
      <style>
        {`
          h1, h2, h3, h4, h5, h6 {
            font-family: 'Playfair Display', serif;
          }
          body, p, span, button, div {
            font-family: 'Lato', sans-serif;
          }
        `}
      </style>
      <section id="csr" className="py-16 md:py-24 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          
          {/* Header */}
          <div className="mb-16">
            {/* Subtitle Label */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-orange-600"></div>
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-500">Social Responsibility</span>
            </div>

            {/* Main Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Corporate <span style={{ color: '#FF6600' }}>Social Responsibility</span>
            </h2>

            {/* Decorative Lines */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-1 w-20 bg-gradient-to-r from-orange-600 via-blue-900 to-transparent rounded-full"></div>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-900 to-transparent rounded-full"></div>
            </div>

            {/* Subtitle */}
            <p className="text-lg text-gray-600">
              Know what are the social responsibilities of PT. Globalindo Intimates
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            
            {/* Navigation Button Left */}
            <button
              onClick={prevSlide}
              className="absolute -left-8 top-1/2 transform -translate-y-1/2 z-20 bg-white border-2 border-gray-200 hover:border-orange-500 text-gray-600 hover:text-orange-600 p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
            >
              <ChevronLeft size={28} strokeWidth={1.5} />
            </button>

            {/* Main Card - Horizontal Layout */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
              
              <div className="flex flex-col md:flex-row">
                
                {/* Image Section - Left */}
                <div className="relative w-full md:w-2/5 h-64 md:h-96 overflow-hidden flex-shrink-0 bg-gradient-to-br from-gray-200 to-gray-100">
                  <img
                    src={programs[currentSlide].image}
                    alt={programs[currentSlide].title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  {/* Overlay Accent */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                </div>

                {/* Content Section - Right */}
                <div className="flex-1 p-8 md:p-12 flex flex-col justify-between">
                  
                  {/* Content */}
                  <div>
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-orange-50 rounded-full border border-orange-200">
                      <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                      <span className="text-xs font-semibold text-orange-600 uppercase tracking-wide">
                        Program {currentSlide + 1} of {programs.length}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                      {programs[currentSlide].title}
                    </h3>

                    {/* Decorative Line */}
                    <div className="h-1 w-12 bg-gradient-to-r from-orange-600 to-transparent rounded-full mb-6"></div>

                    {/* Main Description */}
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                      {programs[currentSlide].description}
                    </p>

                    {/* Details List */}
                    {programs[currentSlide].details.length > 0 && (
                      <div className="space-y-3 mb-6">
                        {programs[currentSlide].details.map((detail, idx) => (
                          <div key={idx} className="flex gap-3 items-start">
                            <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                              {detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom Section */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    {/* Indicators */}
                    <div className="flex gap-2">
                      {programs.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            index === currentSlide
                              ? 'bg-orange-600 w-6'
                              : 'bg-gray-300 w-2 hover:bg-gray-400 hover:scale-125'
                          }`}
                          title={`Go to program ${index + 1}`}
                        />
                      ))}
                    </div>

                    {/* Navigation Info */}
                    <span className="text-sm font-semibold text-gray-500">
                      {currentSlide + 1} / {programs.length}
                    </span>
                  </div>
                </div>

              </div>

            </div>

            {/* Navigation Button Right */}
            <button
              onClick={nextSlide}
              className="absolute -right-8 top-1/2 transform -translate-y-1/2 z-20 bg-white border-2 border-gray-200 hover:border-orange-500 text-gray-600 hover:text-orange-600 p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
            >
              <ChevronRight size={28} strokeWidth={1.5} />
            </button>

          </div>

          {/* Program Counter */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 text-sm">
              Swipe or click indicators to explore our CSR programs
            </p>
          </div>

        </div>
      </section>
    </>
  );
};

export default CSRSection;