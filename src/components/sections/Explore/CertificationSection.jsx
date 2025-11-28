import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Play } from 'lucide-react';

const CertificationSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [activeTab, setActiveTab] = useState('certificates');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const CERT_FOLDER = '/images/Sertif/';
  const EVENT_FOLDER = '/images/Event/';

  const certifications = [
    { title: 'BPJS Ketenagakerjaan', image: `${CERT_FOLDER}bpjsk.jpg` },
    { title: 'ISO 45001:2018', image: `${CERT_FOLDER}bpjskjuara1.jpg` },
    { title: 'ISO 14001:2015', image: `${CERT_FOLDER}disabilitas.jpg` },
    { title: 'SGS Certification', image: `${CERT_FOLDER}industri40.jpg` },
    { title: 'BSCI Certification', image: `${CERT_FOLDER}image 28.png` },
    { title: 'OEKO-TEX Standard', image: `${CERT_FOLDER}oekotex.jpg` },
    { title: 'Fair Trade Certified', image: `${CERT_FOLDER}image 28.png` },
    { title: 'Industry Excellence Award', image: `${CERT_FOLDER}image 30.png` },
  ];

  const photoEvents = [
    { title: 'BPJS Ketenagakerjaan Ceremony', date: '2024', image: `${EVENT_FOLDER}event1.jpg`, size: 'small' },
    { title: 'ISO Certification Award Reception', date: '2024', image: `${EVENT_FOLDER}event3.jpg`, size: 'large' },
    { title: 'Industry Excellence Forum', date: '2024', image: `${EVENT_FOLDER}workshop.jpg`, size: 'small' },
    { title: 'Award Celebration', date: '2024', image: `${EVENT_FOLDER}event2.jpg`, size: 'tall' },
  ];

  const itemsPerView = 5;

  useEffect(() => {
    if (!isAutoPlay || activeTab !== 'certificates') return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % certifications.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlay, activeTab, certifications.length]);

  const nextCert = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % certifications.length);
    setTimeout(() => setIsAutoPlay(true), 8000);
  };

  const prevCert = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + certifications.length) % certifications.length);
    setTimeout(() => setIsAutoPlay(true), 8000);
  };

  const getVisibleCerts = () => {
    const certs = [];
    for (let i = 0; i < itemsPerView; i++) {
      certs.push(certifications[(currentIndex + i) % certifications.length]);
    }
    return certs;
  };

  const visibleCerts = getVisibleCerts();

  const getGridClass = (size) => {
    switch(size) {
      case 'large':
        return 'lg:col-span-2 lg:row-span-2';
      case 'tall':
        return 'lg:col-span-1 lg:row-span-2';
      case 'small':
        return 'lg:col-span-1';
      default:
        return 'lg:col-span-1';
    }
  };

  const getAspectClass = (size) => {
    switch(size) {
      case 'large':
        return 'aspect-square';
      case 'tall':
        return 'aspect-[3/4]';
      case 'small':
        return 'aspect-video';
      default:
        return 'aspect-video';
    }
  };

  return (
    <section id="certifications" className="py-24 md:py-40 bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <style>{`
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Playfair Display', serif;
        }
        body, p, span, button, div {
          font-family: 'Lato', sans-serif;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="mb-20 text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-orange-50 rounded-full border border-orange-200">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
            <span className="text-xs font-medium text-orange-600 uppercase tracking-wide">Recognition</span>
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Our Recognition
            </h2>
            <span style={{ color: '#FF6600' }} className="text-3xl md:text-4xl font-bold">
              & Awards
            </span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-1 w-20 bg-gradient-to-r from-[#FF6600] via-[#0D1B66] to-transparent rounded-full"></div>
            <div className="h-1 w-20 bg-gradient-to-r from-[#0D1B66] to-transparent rounded-full"></div>
          </div>
          
          <p className="text-gray-600 text-base max-w-3xl font-light leading-relaxed">
            We are committed to maintaining the highest standards of quality and excellence, as demonstrated by our comprehensive collection of international certifications and industry recognition.
          </p>
        </div>

        {/* Tab Navigation - Enhanced */}
        <div className="flex gap-12 mb-16 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('certificates')}
            className={`relative px-2 py-4 text-lg font-semibold transition-all duration-300 group ${
              activeTab === 'certificates'
                ? 'text-orange-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Certifications & Awards
            {activeTab === 'certificates' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`relative px-2 py-4 text-lg font-semibold transition-all duration-300 group ${
              activeTab === 'photos'
                ? 'text-orange-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Event & Celebration
            {activeTab === 'photos' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"></div>
            )}
          </button>
        </div>

        {/* Certificates Tab */}
        {activeTab === 'certificates' && (
          <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-50 to-transparent rounded-full opacity-40 -z-10"></div>
            
            <button
              onClick={prevCert}
              className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 bg-white border-2 border-gray-200 hover:border-orange-500 text-gray-600 hover:text-orange-500 p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-110"
            >
              <ChevronLeft size={28} strokeWidth={1.5} />
            </button>

            <div className="overflow-hidden py-16 md:py-20">
              <div className="flex gap-8 md:gap-12 justify-center items-end px-8 md:px-16">
                {visibleCerts.map((cert, idx) => {
                  const isCenter = idx === 2;
                  return (
                    <div key={currentIndex + idx} className="flex-shrink-0 flex flex-col items-center">
                      <div className={`bg-gradient-to-br from-white to-gray-50 border-2 rounded-2xl p-6 md:p-8 flex items-center justify-center transition-all duration-500 ${
                        isCenter 
                          ? 'h-72 w-64 shadow-2xl border-orange-400 ring-8 ring-orange-100 scale-100' 
                          : 'h-48 w-48 opacity-40 scale-65 border-gray-200 shadow-md'
                      }`}>
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="h-full w-auto object-contain filter drop-shadow-sm"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={nextCert}
              className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 bg-white border-2 border-gray-200 hover:border-orange-500 text-gray-600 hover:text-orange-500 p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-110"
            >
              <ChevronRight size={28} strokeWidth={1.5} />
            </button>

            {/* Indicators */}
            <div className="flex justify-center gap-2 pb-10 md:pb-14">
              {certifications.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsAutoPlay(false);
                    setCurrentIndex(idx);
                    setTimeout(() => setIsAutoPlay(true), 8000);
                  }}
                  className={`rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'bg-orange-500 w-8 h-2.5 shadow-lg'
                      : 'bg-gray-300 w-2.5 h-2.5 hover:bg-gray-400 hover:scale-125'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Photos Tab */}
        {activeTab === 'photos' && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
            {/* Background accent */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-50 to-transparent rounded-full opacity-40 -z-10"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-max">
              {photoEvents.map((photo, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedPhoto(photo)}
                  className={`group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 ${
                    getAspectClass(photo.size)
                  } ${getGridClass(photo.size)}`}
                >
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                    <div className="flex justify-center items-center h-full">
                      <div className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full transition-all duration-300 transform group-hover:scale-125 shadow-xl">
                        <Play size={28} fill="currentColor" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-white font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg">
                        {photo.title}
                      </h3>
                      <p className="text-orange-300 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {photo.date}
                      </p>
                    </div>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative max-w-4xl w-full animate-in fade-in scale-95"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 text-white hover:text-orange-400 transition-colors p-2 hover:scale-110 duration-300"
            >
              <X size={36} strokeWidth={1.5} />
            </button>
            
            <img
              src={selectedPhoto.image}
              alt={selectedPhoto.title}
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            
            <div className="mt-8 bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100">
              <h3 className="text-blue-950 font-bold text-2xl">{selectedPhoto.title}</h3>
              <p className="text-orange-600 font-semibold text-sm mt-3">{selectedPhoto.date}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CertificationSection;