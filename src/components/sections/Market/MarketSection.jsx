import React, { useState, useEffect } from "react";
import { Globe2, Award, TrendingUp, Factory } from "lucide-react";

// Design Tokens (Inline)
const typography = {
  h1: 'text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold',
  h2: 'text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold',
  h3: 'text-lg sm:text-xl lg:text-2xl font-bold',
  h4: 'text-base sm:text-lg lg:text-xl font-bold',
  bodyLg: 'text-sm md:text-base lg:text-lg leading-relaxed',
  bodyBase: 'text-xs md:text-sm lg:text-base leading-relaxed',
  bodySm: 'text-[10px] md:text-xs lg:text-sm leading-relaxed',
  label: 'text-xs md:text-sm font-medium',
  caption: 'text-[10px] md:text-xs text-gray-500',
  statsNumber: 'text-3xl sm:text-4xl lg:text-5xl font-black',
};

const spacing = {
  section: {
    py: 'py-10 md:py-14 lg:py-20 xl:py-24',
    mb: 'mb-6 md:mb-8 lg:mb-10 xl:mb-12',
  },
  container: {
    default: 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl',
  },
  stack: {
    sm: 'space-y-3 md:space-y-4',
  },
};

const animations = {
  basic: {
    fadeIn: 'animate-fadeIn',
  },
};

const factory1Data = [
  { region: "USA", percentage: 60, color: "#0D1B66", lightColor: "#E8EBF7" },
  { region: "Korea", percentage: 10, color: "#1A2D8F", lightColor: "#D1D6EC" },
  { region: "Europe", percentage: 30, color: "#FF6600", lightColor: "#FFE5D6" }
];

const factory2Data = [
  { region: "Japan", percentage: 50, color: "#0D1B66", lightColor: "#E8EBF7" },
  { region: "Australia", percentage: 10, color: "#1A2D8F", lightColor: "#D1D6EC" },
  { region: "USA", percentage: 10, color: "#FF6600", lightColor: "#FFE5D6" },
  { region: "Indonesia", percentage: 30, color: "#FF8533", lightColor: "#FFEEDD" }
];

const factory1Customers = [
  "Vanity Fair", "Levi'S", "Fila", "Hanes Brand",
  "AAI", "WOLF", "Lacelier"
];

const factory2Customers = [
  "Marubeni", "Kurabo", "Ambra", "Dame",
  "Ohne", "FBB", "etc"
];

const PieChart = ({ data, title, customers, index }) => {
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedPercentages, setAnimatedPercentages] = useState(data.map(() => 0));

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      data.forEach((item, idx) => {
        let current = 0;
        const increment = item.percentage / 30;
        const percentTimer = setInterval(() => {
          current += increment;
          if (current >= item.percentage) {
            current = item.percentage;
            clearInterval(percentTimer);
          }
          setAnimatedPercentages(prev => {
            const newPercentages = [...prev];
            newPercentages[idx] = Math.round(current);
            return newPercentages;
          });
        }, 20);
      });
    }, index * 200);

    return () => clearTimeout(timer);
  }, [data, index]);

  let currentAngle = -90;
  
  return (
    <div 
      className={`group relative bg-white rounded-2xl border border-gray-100 p-6 md:p-7 lg:p-8 max-w-[500px] transition-all duration-700 hover:border-blue-200 hover:shadow-lg ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Decorative thread line - subtle */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      <div className="relative z-10">
        {/* Title with icon */}
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <Factory className="w-5 h-5 text-blue-900" />
            <h3 className={`${typography.h3} text-blue-900`}>
              {title}
            </h3>
          </div>
          <div className="h-px w-20 bg-blue-900 mx-auto"></div>
        </div>
        
        <div className="flex flex-col lg:flex-row justify-center items-center gap-6 mb-8 lg:mb-10">
          {/* Chart Container */}
          <div className="relative group/chart">
            <svg width="280" height="280" viewBox="0 0 300 300" className="filter drop-shadow-sm">
              <defs>
                <filter id={`glow-${index}`}>
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                
                {/* Subtle gradient for segments */}
                <linearGradient id={`grad-blue-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#0D1B66', stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: '#1A2D8F', stopOpacity: 1}} />
                </linearGradient>
                <linearGradient id={`grad-orange-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#FF6600', stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: '#FF8533', stopOpacity: 1}} />
                </linearGradient>
              </defs>
              
              {data.map((item, idx) => {
                const radius = 150;
                const centerX = 150;
                const centerY = 150;
                const innerRadius = 85;
                
                const startAngle = (currentAngle * Math.PI) / 180;
                const angleSize = (animatedPercentages[idx] * 360) / 100;
                const endAngle = ((currentAngle + angleSize) * Math.PI) / 180;
                
                const x1 = centerX + radius * Math.cos(startAngle);
                const y1 = centerY + radius * Math.sin(startAngle);
                const x2 = centerX + radius * Math.cos(endAngle);
                const y2 = centerY + radius * Math.sin(endAngle);
                
                const innerX1 = centerX + innerRadius * Math.cos(startAngle);
                const innerY1 = centerY + innerRadius * Math.sin(startAngle);
                const innerX2 = centerX + innerRadius * Math.cos(endAngle);
                const innerY2 = centerY + innerRadius * Math.sin(endAngle);
                
                const largeArc = animatedPercentages[idx] > 50 ? 1 : 0;
                
                const pathData = [
                  `M ${x1} ${y1}`,
                  `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
                  `L ${innerX2} ${innerY2}`,
                  `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerX1} ${innerY1}`,
                  'Z'
                ].join(' ');
                
                const midAngle = startAngle + (endAngle - startAngle) / 2;
                const labelRadius = (radius + innerRadius) / 2;
                const labelX = centerX + labelRadius * Math.cos(midAngle);
                const labelY = centerY + labelRadius * Math.sin(midAngle);
                
                currentAngle += angleSize;
                
                return (
                  <g 
                    key={idx}
                    onMouseEnter={() => setHoveredSegment(idx)}
                    onMouseLeave={() => setHoveredSegment(null)}
                    className="cursor-pointer"
                  >
                    <path 
                      d={pathData} 
                      fill={item.color}
                      filter={hoveredSegment === idx ? `url(#glow-${index})` : ''}
                      className="transition-all duration-300"
                      style={{
                        transform: hoveredSegment === idx ? 'scale(1.03)' : 'scale(1)',
                        transformOrigin: '150px 150px',
                        opacity: hoveredSegment === null ? 1 : hoveredSegment === idx ? 1 : 0.7
                      }}
                    />
                    {animatedPercentages[idx] > 0 && (
                      <text
                        x={labelX}
                        y={labelY}
                        fill="white"
                        fontSize="18"
                        fontWeight="600"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="pointer-events-none"
                        style={{
                          filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))'
                        }}
                      >
                        {animatedPercentages[idx]}%
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
            
            {/* Center Circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative bg-white rounded-full w-32 h-32 flex items-center justify-center shadow-sm border border-gray-100 group-hover/chart:border-blue-200 transition-all duration-500">
                <div className="text-center">
                  <Globe2 className="w-8 h-8 mx-auto mb-1 text-blue-900" />
                  <div className={`${typography.bodySm} font-semibold text-gray-600`}>Export</div>
                  <div className={`${typography.bodySm} font-semibold text-gray-600`}>Markets</div>
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className={spacing.stack.sm}>
            {data.map((item, idx) => (
              <div 
                key={idx} 
                className={`flex items-center gap-3 transition-all duration-300 ${
                  hoveredSegment === null || hoveredSegment === idx ? 'opacity-100 translate-x-0' : 'opacity-60'
                }`}
                onMouseEnter={() => setHoveredSegment(idx)}
                onMouseLeave={() => setHoveredSegment(null)}
              >
                <div className="relative">
                  <div 
                    className="w-4 h-4 rounded shadow-sm transition-all duration-200" 
                    style={{ 
                      backgroundColor: item.color,
                      transform: hoveredSegment === idx ? 'scale(1.2)' : 'scale(1)'
                    }}
                  />
                  {hoveredSegment === idx && (
                    <div className="absolute inset-0 rounded animate-ping" style={{backgroundColor: item.color, opacity: 0.4}}></div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`${typography.bodyBase} font-semibold text-gray-800`}>{item.region}</span>
                    {hoveredSegment === idx && (
                      <span className={`${typography.bodySm} text-gray-500`}>({item.percentage}%)</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customers Section */}
        <div className="border-t border-gray-100 pt-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="w-4 h-4 text-blue-900" />
            <h4 className={`${typography.label} text-gray-700`}>
              Trusted Partners
            </h4>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {customers.map((customer, idx) => (
              <div
                key={idx}
                className={`relative px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg ${typography.bodySm} font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-900 transition-all duration-300 cursor-default ${animations.basic.fadeIn}`}
                style={{
                  animationDelay: `${idx * 0.05}s`
                }}
              >
                {customer}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function MarketSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="market" className={`relative ${spacing.section.py} bg-white overflow-hidden`}>
      <div className={spacing.container.default}>
        {/* ===== ENHANCED HEADER ===== */}
        <div className={`${spacing.section.mb} mb-12 md:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          {/* Subtitle Label dengan Icon */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-orange-600"></div>
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-500">Our Market</span>
          </div>
          
          {/* Main Title - dengan font weight dinamis */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Export <span className="text-orange-600">Destinations</span>
          </h2>
          
          {/* Decorative Line */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-1 bg-orange-600 rounded-full"></div>
            <div className="w-12 h-1 bg-blue-900 rounded-full"></div>
          </div>
          
          {/* Subtitle - lebih besar & elegant */}
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl font-light leading-relaxed">
            Delivering a diverse range of apparel—not only intimates but multiple garment categories—to leading global brands.
          </p>
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 max-w-7xl mx-auto justify-items-center">
          <PieChart 
            data={factory1Data} 
            title="Factory 1" 
            customers={factory1Customers}
            index={0}
          />
          <PieChart 
            data={factory2Data} 
            title="Factory 2" 
            customers={factory2Customers}
            index={1}
          />
        </div>
      </div>

      <style>{`
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Playfair Display', serif;
        }
        body, p, span, button, div {
          font-family: 'Lato', sans-serif;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out backwards;
        }
        
        .gradient-text-blue {
          background: linear-gradient(135deg, #0D1B66 0%, #1A2D8F 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </section>
  );
}