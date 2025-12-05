import { useState } from 'react';
import { ChevronLeft, ChevronRight, Trees, Users2, GraduationCap, Leaf, Sprout, Heart, BookMarked, Trash2 } from 'lucide-react';

const CSRSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const programs = [
    {
      id: 1,
      title: "Reforestation Program",
      description: "Supporting reforestation efforts in Caper through seed donations to help restore natural ecosystems and promote environmental stewardship.",
      details: [],
      image: "./images/csr/pohon.JPG",
      icon: Trees,
      color: "green",
      stats: { label: "Trees Planted", value: "1000+" }
    },
    {
      id: 2,
      title: "Different-Ability Empowerment",
      description: "We actively recruit employees with disabilities through dedicated training programs. Today, differently-abled individuals represent 3% of our workforce—reflecting our commitment to inclusivity.",
      details: [],
      image: "./images/csr/ability.jpg",
      icon: Heart,
      color: "blue",
      stats: { label: "Employees Empowered", value: "3%" }
    },
    {
      id: 3,
      title: "School & University Partnership",
      description: "Providing students and interns with hands-on industry experience aligned with our values of quality, innovation, and sustainability.",
      details: [],
      image: "./images/csr/magang.jpg",
      icon: GraduationCap,
      color: "purple",
      stats: { label: "Students Trained", value: "500+" }
    },
    {
      id: 4,
      title: "Zero Waste, Caring Environment & Community Empowerment",
      description: "Our Zero Waste initiatives are designed to minimize environmental impact while creating meaningful benefits for the surrounding community.",
      details: [
        "Fabric Scraps → Community Handicrafts: All leftover fabric from our production lines is donated to local communities.",
        "Plastic Bottles → Sustainable Building Materials: Used plastic bottles are collected and converted into eco-friendly construction materials.",
        "Canteen Food Waste → Maggot Cultivation: Organic waste is donated to maggot cultivation farms for sustainable animal feed.",
        "Used Cartons → Egg Trays: All leftover cartons are recycled and molded into durable egg trays for local poultry farms."
      ],
      image: "./images/csr/csr.png",
      icon: Trash2,
      color: "orange",
      stats: { label: "Waste Diverted", value: "500T+" }
    }
  ];

  const impactStats = [
    { icon: Sprout, label: "Trees Planted", value: "1000+", color: "green" },
    { icon: Users2, label: "Lives Impacted", value: "5000+", color: "blue" },
    { icon: Leaf, label: "Waste Recycled", value: "500T+", color: "orange" },
    { icon: BookMarked, label: "Students Trained", value: "500+", color: "purple" }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % programs.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + programs.length) % programs.length);
  };

  const getColorClass = (color) => {
    const colors = {
      green: "from-green-500 to-green-600",
      blue: "from-blue-500 to-blue-600",
      purple: "from-purple-500 to-purple-600",
      orange: "from-orange-500 to-orange-600"
    };
    return colors[color] || colors.orange;
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
      <section id="csr" className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-screen flex flex-col justify-between">
          
          {/* Header - Compact */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-px bg-orange-600"></div>
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-500">CSR & Sustainability</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Sustainability <span style={{ color: '#FF6600' }}>in Action</span>
            </h2>
          </div>

          {/* Main Carousel - Compact Horizontal Layout */}
          <div className="flex-1 flex items-center gap-4 mb-8 min-h-0">
            
            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="flex-shrink-0 bg-white border-2 border-gray-200 hover:border-orange-500 text-gray-600 hover:text-orange-600 p-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <ChevronLeft size={24} strokeWidth={1.5} />
            </button>

            {/* Card Container */}
            <div className="flex-1 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden h-full min-h-0">
              <div className="flex h-full">
                
                {/* Image - Left */}
                <div className="w-2/5 relative overflow-hidden bg-gradient-to-br from-gray-200 to-gray-100 flex-shrink-0 flex items-center justify-center">
                  <img
                    src={programs[currentSlide].image}
                    alt={programs[currentSlide].title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${getColorClass(programs[currentSlide].color)} opacity-10`}></div>
                </div>

                {/* Content - Right */}
                <div className="w-3/5 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
                  
                  {/* Icon Badge */}
                  <div className="mb-4">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br ${getColorClass(programs[currentSlide].color)} shadow-lg hover:shadow-xl transition-all duration-300`}>
                      {(() => {
                        const IconComponent = programs[currentSlide].icon;
                        return <IconComponent size={28} className="text-white" strokeWidth={2} />;
                      })()}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {programs[currentSlide].title}
                  </h3>

                  {/* Divider */}
                  <div className={`h-1 w-10 bg-gradient-to-r ${getColorClass(programs[currentSlide].color)} rounded-full mb-4`}></div>

                  {/* Description */}
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4 line-clamp-3">
                    {programs[currentSlide].description}
                  </p>

                  {/* Details List - Compact */}
                  {programs[currentSlide].details.length > 0 && (
                    <div className="space-y-2 mb-4 max-h-24 overflow-y-auto">
                      {programs[currentSlide].details.map((detail, idx) => (
                        <div key={idx} className="flex gap-2 items-start text-xs md:text-sm">
                          <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 bg-gradient-to-r ${getColorClass(programs[currentSlide].color)}`}></div>
                          <p className="text-gray-600 leading-snug">{detail}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Bottom - Indicators */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-auto">
                    <div className="flex gap-1.5">
                      {programs.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            index === currentSlide
                              ? `bg-gradient-to-r ${getColorClass(programs[index].color)} w-6`
                              : 'bg-gray-300 w-2 hover:bg-gray-400'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-gray-500">{currentSlide + 1}/{programs.length}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className="flex-shrink-0 bg-white border-2 border-gray-200 hover:border-orange-500 text-gray-600 hover:text-orange-600 p-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <ChevronRight size={24} strokeWidth={1.5} />
            </button>

          </div>

          {/* Impact Statistics - Bottom Row */}
          <div className="grid grid-cols-4 gap-3 md:gap-4">
            {impactStats.map((stat, idx) => {
              const IconComponent = stat.icon;
              return (
                <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 text-center group">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${getColorClass(stat.color)} mb-2 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent size={22} className="text-white" strokeWidth={2} />
                  </div>
                  <p className="text-gray-600 text-xs md:text-sm font-medium mb-1">{stat.label}</p>
                  <p className="text-lg md:text-xl font-bold text-orange-600">{stat.value}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
};

export default CSRSection;