import React, { useState } from "react";
import { Linkedin, Mail, Phone, X, ArrowRight } from "lucide-react";

const TeamSection = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const designTokens = {
    spacing: {
      section: { py: "py-16 md:py-24" },
      container: { default: "max-w-7xl mx-auto px-4 md:px-6" }
    },
    colors: {
      primary: {
        orange: "#ea580c",
        blue: "#001f3f"
      }
    }
  };

  const teamData = [
    {
      id: 1,
      name: "Teti Yani Hartono",
      role: "Chief Operation Officer",
      department: "Executive",
      img: "./images/team/teti.jpg",
      bio: "Driving operational excellence with 20+ years of industry experience in manufacturing and logistics",
      detailBio: "Teti has led multiple manufacturing facilities across Asia, implementing lean methodologies and optimizing supply chain performance. She is passionate about developing future operational leaders and strengthening organizational capabilities.",
      email: "teti@globalindo.com",
      phone: "+62-8XX-XXXX",
      expertise: ["Supply Chain", "Lean Manufacturing", "Team Leadership", "Quality Management"]
    },
    {
      id: 2,
      name: "Suandi Lim",
      role: "Factory Manager",
      department: "Executive",
      img: "./images/team/suandi.jpg",
      bio: "Strategic leader focused on growth, innovation, and sustainable business development.",
      detailBio: "Suandi brings strong expertise in market analysis, business scaling, and strategic transformation. He has guided the company through multiple expansion phases while strengthening its global competitiveness.",
      email: "suandi@globalindo.com",
      phone: "+62-8XX-XXXX",
      expertise: ["Strategic Planning", "Business Growth", "Innovation", "Market Analysis"]
    },
    {
      id: 3,
      name: "Rudy Tjandra",
      role: "Senior Manager PPIC",
      department: "Operations",
      img: "./images/team/rudy.jpg",
      bio: "Planning and inventory control specialist with deep expertise in supply chain optimization.",
      detailBio: "Rudy ensures seamless production flow through accurate demand forecasting, efficient inventory management, and waste-minimization initiatives.",
      email: "rudy@globalindo.com",
      phone: "+62-8XX-XXXX",
      expertise: ["Inventory Management", "Demand Forecasting", "PPIC Systems", "Cost Reduction"]
    },
    {
      id: 4,
      name: "Amila",
      role: "IE Manager",
      department: "Operations",
      img: "./images/team/amila.jpg",
      bio: "Industrial efficiency and process-optimization expert.",
      detailBio: "Amila leads major industrial engineering and process-improvement programs, successfully delivering efficiency gains, cost reductions, and value-engineering initiatives across various production lines.",
      email: "amila@globalindo.com",
      phone: "+62-8XX-XXXX",
      expertise: ["Process Optimization", "Industrial Engineering", "Value Engineering", "Efficiency Analysis"]
    },
    {
      id: 5,
      name: "Dedy Mirady",
      role: "Production Manager",
      department: "Production",
      img: "./images/team/dedi.jpg",
      bio: "Leader in production excellence and quality assurance.",
      detailBio: "With strong Six Sigma and continuous-improvement expertise, Dedy ensures that production operations consistently deliver outstanding quality, efficiency, and reliability.",
      email: "dedy@globalindo.com",
      phone: "+62-8XX-XXXX",
      expertise: ["Quality Assurance", "Six Sigma", "Production Management", "Continuous Improvement"]
    },
    {
      id: 6,
      name: "Sugiyarni",
      role: "Quality Assurance Senior Manager",
      department: "Operations",
      img: "./images/team/sugi1.png",
      bio: "Quality specialist with extensive experience in QC systems and high-performance team development.",
      detailBio: "Sugi fosters collaborative environments and drives quality innovation through effective employee engagement and robust QC strategies.",
      email: "fsugi@globalindo.com",
      phone: "+62-8XX-XXXX",
      expertise: ["Team Management", "Process Improvement", "Operations Strategy", "Change Management"]
    }
  ];

  const getDepartmentColor = (dept) => {
    switch(dept) {
      case "Executive":
        return "bg-orange-100 text-orange-700 border-orange-300";
      case "Operations":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "Production":
        return "bg-green-100 text-green-700 border-green-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
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
      <section id="team" className={`${designTokens.spacing.section.py} relative overflow-hidden bg-white`}>
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 rounded-full blur-3xl opacity-5" style={{ backgroundColor: `${designTokens.colors.primary.orange}` }}></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-5" style={{ backgroundColor: `${designTokens.colors.primary.blue}` }}></div>
        </div>

        <div className={`${designTokens.spacing.container.default} relative z-10`}>
          
          {/* HEADER SECTION */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-orange-600"></div>
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-500">Our Team</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gray-900">Meet Our </span>
              <span className="text-orange-600">Leadership Team</span>
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="h-1 w-20 bg-gradient-to-r from-orange-600 via-blue-900 to-transparent rounded-full"></div>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-900 to-transparent rounded-full"></div>
            </div>
            
            <p className="text-lg text-gray-600 max-w-2xl">
              Exceptional professionals dedicated to excellence and innovation
            </p>
          </div>

          {/* HORIZONTAL CARD GRID */}
          <div className="w-full space-y-4">
            {teamData.map((member) => (
              <div
                key={member.id}
                onClick={() => setSelectedMember(member)}
                className="group cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-200"
              >
                <div className="flex flex-col md:flex-row h-full">
                  
                  {/* IMAGE SECTION - Left Side */}
                  <div className="relative w-full md:w-64 h-64 md:h-auto overflow-hidden flex-shrink-0">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                  </div>

                  {/* INFO SECTION - Right Side */}
                  <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                    
                    {/* Text Content */}
                    <div>
                      <div className="mb-2">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                        <p className="text-base font-semibold text-orange-600 mb-3">{member.role}</p>
                      </div>

                      {/* Department Badge */}
                      <div className="mb-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getDepartmentColor(member.department)}`}>
                          {member.department}
                        </span>
                      </div>

                      {/* Bio */}
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed line-clamp-2">
                        {member.bio}
                      </p>
                    </div>

                    {/* Contact Section */}
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex gap-2">
                        <a
                          href={`mailto:${member.email}`}
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-lg bg-orange-50 hover:bg-orange-600 text-orange-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                          title="Send Email"
                        >
                          <Mail size={18} />
                        </a>
                        <a
                          href={`tel:${member.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                          title="Call"
                        >
                          <Phone size={18} />
                        </a>
                        <a
                          href={member.linkedin}
                          onClick={(e) => e.stopPropagation()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-blue-50 hover:bg-blue-700 text-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                          title="LinkedIn Profile"
                        >
                          <Linkedin size={18} />
                        </a>
                      </div>

                      {/* View Profile Button */}
                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-50 hover:bg-orange-600 text-orange-600 hover:text-white font-semibold transition-all duration-300 transform group-hover:translate-x-1">
                        View Profile
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* MODAL */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300 z-10"
            >
              <X size={24} className="text-gray-700" />
            </button>

            {/* Modal Content */}
            <div className="overflow-hidden">
              <div className="flex flex-col md:flex-row gap-0">
                
                {/* Image Section - Left */}
                <div className="relative w-full md:w-1/2 h-80 md:h-[500px] overflow-hidden flex-shrink-0 bg-gradient-to-b from-gray-200 to-gray-100">
                  <img
                    src={selectedMember.img}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Text Section - Right */}
                <div className="p-8 md:p-10 md:w-1/2 overflow-y-auto md:max-h-[500px]">
                {/* Header */}
                <div className="mb-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{selectedMember.name}</h2>
                  <p className="text-lg text-orange-600 font-semibold mb-1">{selectedMember.role}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getDepartmentColor(selectedMember.department)}`}>
                    {selectedMember.department}
                  </span>
                </div>

                {/* Decorative Line */}
                <div className="h-1 w-12 bg-gradient-to-r from-orange-600 to-transparent rounded-full mb-6"></div>

                {/* Bio Section */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">About</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedMember.detailBio}
                  </p>
                </div>

                {/* Expertise Section */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Areas of Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.expertise.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-sm font-medium border border-orange-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Section */}
                <div className="border-t pt-6">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">Get in Touch</h3>
                  <div className="flex flex-col gap-3 mb-6">
                    <a
                      href={`mailto:${selectedMember.email}`}
                      className="flex items-center gap-3 text-gray-700 hover:text-orange-600 transition-colors"
                    >
                      <Mail size={20} className="text-orange-600" />
                      <span>{selectedMember.email}</span>
                    </a>
                    <a
                      href={`tel:${selectedMember.phone}`}
                      className="flex items-center gap-3 text-gray-700 hover:text-orange-600 transition-colors"
                    >
                      <Phone size={20} className="text-orange-600" />
                      <span>{selectedMember.phone}</span>
                    </a>
                  </div>

                  {/* Social Icons */}
                  <div className="flex gap-3">
                    <a
                      href={`mailto:${selectedMember.email}`}
                      className="p-3 rounded-lg bg-orange-50 hover:bg-orange-600 text-orange-600 hover:text-white transition-all duration-300"
                    >
                      <Mail size={20} />
                    </a>
                    <a
                      href={`tel:${selectedMember.phone}`}
                      className="p-3 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white transition-all duration-300"
                    >
                      <Phone size={20} />
                    </a>
                    <a
                      href={selectedMember.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-blue-50 hover:bg-blue-700 text-blue-600 hover:text-white transition-all duration-300"
                    >
                      <Linkedin size={20} />
                    </a>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default TeamSection;