import React from "react";

const CSRSection = () => {
  const csrPrograms = [
    {
      title: "Reforestation Program",
      description: "PT. Globalindo Intimates supports reforestation in the Cagar area through plant seed donations, reflecting its commitment to environmental sustainability and a greener future for the community.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
      position: "left"
    },
    {
      title: "Different Ability Empowerment",
      description: "PT. Globalindo Intimates has successfully carried out the recruitment of disabled employees through special training programs. This initiative reflects the company's commitment to inclusivity, with disabled employees now comprising 1% of its total workforce.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
      position: "right"
    },
    {
      title: "School & University Partner",
      description: "PT. Globalindo Intimates provides opportunities for students and interns to gain valuable industry experience while maintaining a motivated and focused workforce, aligned with the company's commitment to quality and sustainability.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
      position: "left"
    },
    {
      title: "Zero Waste, Caring Environment & Community Empowerment",
      description: "PT. Globalindo Intimates is committed to Zero Waste Management by recycling fabric scraps into products like doormat, rugs, and shopping bags or trays, and turning domestic household waste into poultry feed through maggot cultivation.",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80",
      position: "right",
      badges: ["Processing cardboard waste into egg trays", "Waste to poultry feed by maggot", "Waste to Craft"]
    }
  ];

  return (
    <section id="csr" className="py-20 bg-gradient-to-b from-white via-gray-50 to-blue-50/30 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-20 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-3">
            CORPORATE SOCIAL RESPONSIBILITY
          </h2>
          <p className="text-gray-600 text-base">
            Know what are the social responsibilities of PT. Globalindo Intimates
          </p>
        </div>

        {/* CSR Programs */}
        <div className="space-y-16">
          {csrPrograms.map((program, index) => (
            <div key={index} className="relative">
              {program.position === "left" ? (
                // Left Image Layout
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Image */}
                  <div className="group relative overflow-hidden rounded-2xl shadow-xl">
                    <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                      <img 
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-blue-900">
                      {program.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {program.description}
                    </p>
                    {program.badges && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {program.badges.map((badge, badgeIndex) => (
                          <span 
                            key={badgeIndex}
                            className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // Right Image Layout
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Content */}
                  <div className="space-y-4 md:order-1">
                    <h3 className="text-2xl font-bold text-blue-900">
                      {program.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {program.description}
                    </p>
                    {program.badges && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {program.badges.map((badge, badgeIndex) => (
                          <span 
                            key={badgeIndex}
                            className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Image */}
                  <div className="group relative overflow-hidden rounded-2xl shadow-xl md:order-2">
                    <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                      <img 
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CSRSection;