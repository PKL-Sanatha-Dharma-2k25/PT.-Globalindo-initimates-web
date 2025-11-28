import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FacilitiesSection = () => {
  const designTokens = {
    colors: {
      primary: {
        orange: '#FF6B35'
      }
    },
    spacing: {
      section: {
        py: 'py-12 md:py-16 lg:py-20'
      },
      container: {
        default: 'max-w-7xl mx-auto px-6 md:px-8 lg:px-12'
      }
    }
  };

  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const sectionRef = React.useRef(null);

  const facilities = [
    {
      id: 1,
      title: 'Automatic Cutting & Laser Cut Lace Machine',
      description: 'Fabric and tile cutting machines are controlled by a computer system, allowing them to operate automatically and quickly while ensuring precise and consistent results.',
      image: '/images/facilities/laser.JPG',
      layout: 'left',
      category: 'cutting',
      fullDescription: 'Fabric and tile cutting machines are controlled by a computer system, allowing them to operate automatically and quickly while ensuring precise and consistent results.',
      specs: [
        { label: 'Precision', value: '±0.1mm' },
        { label: 'Speed', value: '50-100 cuts/hr' },
        { label: 'Capacity', value: '32,000 m²' },
        { label: 'Efficiency', value: '99.8%' }
      ]
    },
    {
      id: 2,
      title: 'Laser Template Machine',
      description: 'This machine is suitable for acrylic cutting, garment fabric processing, plate engraving, and several other applications, offering flexibility and efficiency in different production needs.',
      image: '/images/facilities/laser.jpg',
      layout: 'right',
      category: 'cutting',
      fullDescription: 'This machine is suitable for acrylic cutting, garment fabric processing, plate engraving, and several other applications, offering flexibility and efficiency in different production needs.',
      specs: [
        { label: 'Max Size', value: '3000x1500mm' },
        { label: 'Resolution', value: '1200 DPI' },
        { label: 'Materials', value: '50+ types' },
        { label: 'Production', value: '200 pcs/hr' }
      ]
    },
    {
      id: 3,
      title: 'Fabric Shrinking Machine',
      description: 'A loosening, shrinking, and forming fabric machine restores fabric shape and dimensions, enhances appearance and stability, saves time and costs, and supports quality control, playing an important role in optimizing fabric quality and production processes.',
      image: '/images/facilities/inspection.jpg',
      layout: 'left',
      category: 'processing',
      fullDescription: 'A loosening, shrinking, and forming fabric machine restores fabric shape and dimensions, enhances appearance and stability, saves time and costs, and supports quality control, playing an important role in optimizing fabric quality and production processes.',
      specs: [
        { label: 'Temp Range', value: '40-120°C' },
        { label: 'Width', value: '2.5 meters' },
        { label: 'Production', value: '500 m/hr' },
        { label: 'Energy Grade', value: 'A' }
      ]
    },
    {
      id: 4,
      title: 'Automatic Collar turning & pressing Machine',
      description: 'The automatic collar turning and pressing process improves efficiency and ensures consistent quality in collar production. It saves time while covering steps from collar preparation to shaping, inspection, and garment attachment.',
      image: '/images/facilities/pres.png',
      layout: 'right',
      category: 'finishing',
      fullDescription: 'The automatic collar turning and pressing process improves efficiency and ensures consistent quality in collar production. It saves time while covering steps from collar preparation to shaping, inspection, and garment attachment.',
      specs: [
        { label: 'Speed', value: '1,200 pcs/hr' },
        { label: 'Labor Reduction', value: '70%' },
        { label: 'Quality Rate', value: '99.5%' },
        { label: 'Accuracy', value: '±2mm' }
      ]
    },
    {
      id: 5,
      title: 'Sewfree Machine',
      description: 'The use of thermoplastic or hot melt adhesive films has started to revolutionize the way of garment construction and has become the next generation of cut and sew.',
      image: '/images/facilities/sewfree.png',
      layout: 'left',
      category: 'processing',
      fullDescription: 'The use of thermoplastic or hot melt adhesive films has started to revolutionize the way of garment construction and has become the next generation of cut and sew.',
      specs: [
        { label: 'Bond Strength', value: '5+ kg' },
        { label: 'Durability', value: '50+ washes' },
        { label: 'Speed', value: '800 pcs/hr' },
        { label: 'Comfort Score', value: '9.5/10' }
      ]
    },
    {
      id: 6,
      title: 'Real Time Monitoring Sewing Line',
      description: 'Sewing line monitor is useful for identifying sewing material needs, tracking line productivity, and detecting reject products from quality control to improve overall efficiency.',
      image: '/images/facilities/gpr.jpg',
      layout: 'right',
      category: 'monitoring',
      fullDescription: 'Sewing line monitor is useful for identifying sewing material needs, tracking line productivity, and detecting reject products from quality control to improve overall efficiency.',
      specs: [
        { label: 'Coverage', value: '3,000+ Machines' },
        { label: 'Latency', value: '<1 second' },
        { label: 'Uptime', value: '99.9%' },
        { label: 'Data Points', value: '50+' }
      ]
    },
    {
      id: 7,
      title: 'Go Mechanic App',
      description: 'Machine problems can be handled quickly, thereby reducing wasted time during the production process, while also being useful in collecting important production data.',
      image: '/images/facilities/gooapp.jpg',
      layout: 'left',
      category: 'software',
      fullDescription: 'Machine problems can be handled quickly, thereby reducing wasted time during the production process, while also being useful in collecting important production data.',
      specs: [
        { label: 'Users', value: '150+ Mechanics' },
        { label: 'Response Time', value: '< 5 min' },
        { label: 'Downtime Reduction', value: '45%' },
        { label: 'Accuracy', value: '99.5%' }
      ]
    },
    {
      id: 8,
      title: 'AGV Follower Robot',
      description: 'Robot is controlled through apps and runs automatically to the designated sewing line to deliver materials needed for the sewing line and transport the finished product.',
      image: '/images/facilities/agv.jpg',
      layout: 'right',
      category: 'robot',
      fullDescription: 'Robot is controlled through apps and runs automatically to the designated sewing line to deliver materials needed for the sewing line and transport the finished product.',
      specs: [
        { label: 'Unit Count', value: '25 units' },
        { label: 'Capacity', value: '500 kg/unit' },
        { label: 'Speed', value: '1.5 m/s' },
        { label: 'Efficiency Gain', value: '+60%' }
      ]
    }
  ];

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Cutting', value: 'cutting' },
    { label: 'Monitoring', value: 'monitoring' },
    { label: 'Processing', value: 'processing' },
    { label: 'Finishing', value: 'finishing' },
    { label: 'Robot', value: 'robot' },
    { label: 'Software', value: 'software' }
  ];

  const itemsPerPage = 4;
  const filtered = activeFilter === 'all' ? facilities : facilities.filter(f => f.category === activeFilter);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFacilities = filtered.slice(startIndex, startIndex + itemsPerPage);

  const handleFilterChange = (value) => {
    setActiveFilter(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
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
      <section id="facilities" ref={sectionRef} className={`bg-white ${designTokens.spacing.section.py}`}>
        <div className={designTokens.spacing.container.default}>
          {/* Header */}
          <div className="mb-12">
            {/* Subtitle Label */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-orange-600"></div>
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-500">Advanced Manufacturing</span>
            </div>

            {/* Main Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span style={{ color: '#FF6B35' }}>Facilities</span>
            </h2>

            {/* Decorative Lines */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-1 w-20 bg-gradient-to-r from-orange-600 via-blue-900 to-transparent rounded-full"></div>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-900 to-transparent rounded-full"></div>
            </div>

            {/* Subtitle */}
            <p className="text-lg text-gray-600">
              State-of-the-art technology and equipment for superior production quality.
            </p>
          </div>

          {/* Filter Tabs - Left Aligned (Horizontal) */}
          <div className="flex flex-wrap gap-3 mb-12 justify-start">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => handleFilterChange(filter.value)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeFilter === filter.value 
                    ? 'bg-orange-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Facilities List */}
          <div className="space-y-12">
            {paginatedFacilities.map((facility, idx) => (
              <div key={facility.id}>
                <div className={`flex flex-col ${facility.layout === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}>
                  {/* Image */}
                  <div className="w-full md:w-1/2">
                    <div className="relative overflow-hidden rounded-lg shadow-lg">
                      <img src={facility.image} alt={facility.title} className="w-full h-80 object-cover" />
                      <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {facility.category}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full md:w-1/2 group">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{facility.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{facility.description}</p>
                    
                    <div className="bg-gray-50 p-6 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-gray-700 text-sm mb-4">{facility.fullDescription}</p>
                      <div className="grid grid-cols-2 gap-3">
                        <h4 className="col-span-2 font-semibold text-gray-900 mb-2">Key Specifications</h4>
                        {facility.specs.map((spec, idx) => (
                          <div key={idx} className="bg-white p-3 rounded border border-gray-200">
                            <p className="text-xs text-gray-500 mb-1">{spec.label}</p>
                            <p className="font-semibold text-gray-900">{spec.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {idx !== paginatedFacilities.length - 1 && <hr className="my-12" />}
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  currentPage === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-600'
                }`}
              >
                <ChevronLeft size={20} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${
                    currentPage === page 
                      ? 'bg-orange-600 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  currentPage === totalPages 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-600'
                }`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default FacilitiesSection;