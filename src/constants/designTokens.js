// ========================================
// 🎨 DESIGN TOKENS - PT. GLOBALINDO INTIMATES
// Complete Design System (v3.0 - FULL)
// ========================================

// ========================================
// 📐 MAX WIDTH CONSTRAINTS
// ========================================
export const maxWidths = {
  content: 'max-w-7xl',           // 1280px - Default container
  narrow: 'max-w-5xl',            // 1024px - Text-heavy content
  wide: 'max-w-[1440px]',         // 1440px - Wide layout
  factoryCard: 'max-w-[420px]',   // 420px - Factory cards optimal size
  cardMd: 'max-w-md',             // 448px
  cardLg: 'max-w-lg',             // 512px
  prose: 'max-w-prose',           // 65ch - Reading width
};

// ========================================
// 🎨 COLOR PALETTE - LENGKAP
// ========================================
export const colors = {
  primary: {
    blue: '#1e40af',
    orange: '#f97316',
  },
  neutral: {
    white: '#ffffff',
    black: '#000000',
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },
  semantic: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
};

// ========================================
// 📝 TYPOGRAPHY - OPTIMIZED
// ========================================
export const typography = {
  // Headings
  h1: 'text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold',
  h2: 'text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold',
  h3: 'text-lg sm:text-xl lg:text-2xl font-bold',
  h4: 'text-base sm:text-lg lg:text-xl font-bold',
  
  // Body
  bodyLg: 'text-sm md:text-base lg:text-lg leading-relaxed',
  bodyBase: 'text-xs md:text-sm lg:text-base leading-relaxed',
  bodySm: 'text-[10px] md:text-xs lg:text-sm leading-relaxed',
  
  // Special
  label: 'text-xs md:text-sm font-medium',
  caption: 'text-[10px] md:text-xs text-gray-500',
};

// ========================================
// 📏 SPACING - OPTIMIZED
// ========================================
export const spacing = {
  section: {
    py: 'py-10 md:py-14 lg:py-20 xl:py-24',
    mb: 'mb-6 md:mb-8 lg:mb-10 xl:mb-12',
  },
  container: {
    default: 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl',
    narrow: 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl',
    wide: 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]',
  },
  stack: {
    xs: 'space-y-2 md:space-y-2.5',
    sm: 'space-y-3 md:space-y-4',
    md: 'space-y-4 md:space-y-5 lg:space-y-6',
    lg: 'space-y-5 md:space-y-6 lg:space-y-8',
    xl: 'space-y-6 md:space-y-8 lg:space-y-10',
  },
  gridGap: {
    sm: 'gap-3 md:gap-4',
    md: 'gap-4 md:gap-5',
    lg: 'gap-6 md:gap-8',
    xl: 'gap-8 md:gap-10 lg:gap-12',
  },
};

// ========================================
// 🔲 BORDER RADIUS
// ========================================
export const borderRadius = {
  none: 'rounded-none',
  xs: 'rounded-sm',
  sm: 'rounded',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
};

// ========================================
// 🔸 SHADOWS - KEDALAMAN
// ========================================
export const shadows = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  hover: 'shadow-md hover:shadow-lg transition-shadow duration-300',
  card: 'shadow-sm hover:shadow-md transition-all duration-300',
  lift: 'shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1',
};

// ========================================
// ⏱️ TRANSITIONS - SMOOTH ANIMATIONS
// ========================================
export const transitions = {
  fast: 'transition-all duration-150 ease-in-out',
  base: 'transition-all duration-300 ease-in-out',
  slow: 'transition-all duration-500 ease-in-out',
};

// ========================================
// 🎴 CARDS - OPTIMIZED
// ========================================
export const cards = {
  feature: {
    container: 'card-feature max-w-2xl',
    gap: 'space-y-3 md:space-y-4',
  },
  info: {
    container: 'card-info max-w-[420px]',
    gap: 'space-y-2 md:space-y-2.5',
  },
  infoItem: {
    container: 'rounded-lg border',
    padding: 'p-2 md:p-2.5 lg:p-3',
    blue: 'bg-blue-50 border-blue-100',
    orange: 'bg-orange-50 border-orange-100',
  },
};

// ========================================
// 🎯 ICON BOX - CONTROLLED
// ========================================
export const iconBox = {
  sm: 'w-7 h-7 md:w-8 md:h-8',
  md: 'w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10',
  iconSm: 'w-3.5 h-3.5 md:w-4 md:h-4',
  iconMd: 'w-4 h-4 md:w-5 md:h-5',
  base: 'bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm',
};

// ========================================
// 🔘 BUTTONS
// ========================================
export const buttons = {
  primary: {
    blue: 'btn-primary-blue',
    orange: 'btn-primary-orange',
  },
  outline: 'btn-outline',
  sizes: {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
  },
};

// ========================================
// 📐 GRIDS - OPTIMIZED
// ========================================
export const grids = {
  twoCol: {
    container: 'grid lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-12',
    factory: 'grid sm:grid-cols-2 gap-4 md:gap-5 justify-items-center',
  },
  threeCol: {
    container: 'grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6',
    centered: 'grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 justify-items-center',
  },
};

// ========================================
// 🏷️ BADGES
// ========================================
export const badges = {
  blue: 'inline-block bg-blue-900 text-white px-5 py-1.5 rounded-full font-bold text-sm',
  orange: 'inline-block bg-orange-500 text-white px-5 py-1.5 rounded-full font-bold text-sm',
  outline: {
    blue: 'inline-block border-2 border-blue-900 text-blue-900 px-5 py-1.5 rounded-full font-bold text-sm',
    orange: 'inline-block border-2 border-orange-500 text-orange-500 px-5 py-1.5 rounded-full font-bold text-sm',
  },
};

// ========================================
// 🎨 GRADIENTS
// ========================================
export const gradients = {
  text: {
    blue: 'gradient-text-blue',
    orange: 'gradient-text-orange',
  },
  bg: {
    blueOrange: 'bg-gradient-to-r from-blue-500 to-orange-500',
    blueDark: 'bg-gradient-to-br from-blue-500 to-blue-600',
    orangeDark: 'bg-gradient-to-br from-orange-500 to-orange-600',
  },
};

// ========================================
// 📋 FORM ELEMENTS
// ========================================
export const forms = {
  input: 'w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200',
  textarea: 'w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200',
  select: 'w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer transition-all duration-200',
  label: 'block text-sm font-medium text-gray-700 mb-2',
  error: 'text-xs text-red-600 mt-1',
  helper: 'text-xs text-gray-500 mt-1',
  group: 'space-y-2',
};

// ========================================
// 📊 TABLE ELEMENTS
// ========================================
export const tables = {
  base: 'w-full border-collapse',
  header: 'bg-gray-50 border-b border-gray-200',
  headerCell: 'px-4 py-3 text-left text-sm font-semibold text-gray-700',
  bodyCell: 'px-4 py-3 border-b border-gray-200 text-sm text-gray-600',
  row: 'hover:bg-gray-50 transition-colors',
};

// ========================================
// 🎯 ALERTS / NOTIFICATIONS
// ========================================
export const alerts = {
  base: 'p-4 rounded-lg flex items-start gap-3 border transition-all duration-300',
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
  icon: 'w-5 h-5 flex-shrink-0 mt-0.5',
  title: 'font-semibold text-sm',
  description: 'text-sm opacity-90',
};

// ========================================
// 🔳 LOADING & SKELETON
// ========================================
export const loading = {
  skeleton: 'bg-gray-200 animate-pulse rounded',
  skeletonText: 'skeleton h-4 w-full',
  skeletonCard: 'skeleton h-48 w-full rounded-xl',
  spinner: 'inline-block w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin',
};

// ========================================
// 📱 MODAL & OVERLAY
// ========================================
export const modal = {
  overlay: 'fixed inset-0 bg-black/50 backdrop-blur-sm z-40',
  content: 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 max-h-[90vh] overflow-y-auto',
  header: 'flex items-center justify-between p-6 border-b border-gray-200',
  body: 'p-6',
  footer: 'flex items-center justify-end gap-3 p-6 border-t border-gray-200',
};

// ========================================
// 💬 TOOLTIP & POPOVER
// ========================================
export const popups = {
  tooltip: 'absolute bg-gray-900 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap z-50 shadow-lg',
  popover: 'absolute bg-white rounded-lg shadow-xl border border-gray-200 z-50 p-4',
};

// ========================================
// 🍞 BREADCRUMB
// ========================================
export const breadcrumb = {
  container: 'flex items-center gap-2 text-sm',
  item: 'text-gray-600 hover:text-blue-900 transition-colors',
  separator: 'text-gray-400',
  active: 'text-gray-900 font-medium',
};

// ========================================
// ✨ INTERACTIVE UTILITIES
// ========================================
export const interactive = {
  hoverLift: 'hover:-translate-y-1 transition-transform duration-200',
  hoverScale: 'hover:scale-105 transition-transform duration-200',
  hoverGlow: 'hover:shadow-lg hover:shadow-blue-500/20 transition-shadow duration-200',
  disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
  groupHoverVisible: 'opacity-0 group-hover:opacity-100 transition-opacity',
};

// ========================================
// 📏 RESPONSIVE HELPERS
// ========================================
export const responsive = {
  textFluidSm: 'text-xs md:text-sm lg:text-base',
  textFluidBase: 'text-sm md:text-base lg:text-lg',
  textFluidLg: 'text-base md:text-lg lg:text-xl',
  truncate2: 'line-clamp-2 overflow-hidden',
  truncate3: 'line-clamp-3 overflow-hidden',
};

// ========================================
// 📦 IMAGE SIZES
// ========================================
export const images = {
  hero: 'w-full h-auto md:h-[500px] lg:h-[600px] object-cover',
  thumbnail: 'w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg',
  card: 'w-full h-48 md:h-56 object-cover rounded-lg',
  avatar: 'w-10 h-10 md:w-12 md:h-12 rounded-full object-cover',
};

// ========================================
// 🎯 Z-INDEX STACKING
// ========================================
export const zIndex = {
  dropdown: 'z-40',
  sticky: 'z-30',
  fixed: 'z-20',
  modal: 'z-50',
  tooltip: 'z-50',
};

// ========================================
// 🎯 PRESETS - Ready to Use
// ========================================
export const presets = {
  sectionHeader: {
    title: 'text-2xl sm:text-3xl md:text-4xl font-bold gradient-text-blue mb-2',
    subtitle: 'text-sm md:text-base text-gray-600',
    container: 'mb-8 md:mb-10 lg:mb-12',
  },
  cardHeader: {
    container: 'flex items-center gap-2.5 md:gap-3 mb-3',
    iconBlue: 'w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0',
    iconOrange: 'w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0',
  },
  hero: {
    badge: 'inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 px-3 py-2 rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300',
    title: 'text-white tracking-tight text-shadow',
    subtitle: 'font-light text-white/90',
    highlight: 'font-bold text-orange-400 relative inline-block',
    highlightUnderline: 'absolute bottom-0 left-0 w-full h-0.5 bg-orange-400/30 rounded-full',
  },
};

// ========================================
// 🎭 ANIMATIONS (class names from index.css)
// ========================================
export const animations = {
  basic: {
    fadeIn: 'animate-fadeIn',
    slideUp: 'animate-slideUp',
  },
  hero: {
    float: 'animate-float',
    floatDelayed: 'animate-float-delayed',
    floatSlow: 'animate-float-slow',
    gradient: 'animate-gradient',
    scroll: 'animate-scroll',
    bounceSlow: 'animate-bounce-slow',
    particle: 'animate-float-particle',
    particleDelayed: 'animate-float-particle-delayed',
    particleSlow: 'animate-float-particle-slow',
  },
};

// ========================================
// 💡 UTILITY HELPERS
// ========================================
export const utils = {
  flexCenter: 'flex items-center justify-center',
  flexBetween: 'flex items-center justify-between',
  flexCol: 'flex flex-col',
  scrollbarHide: 'scrollbar-hide',
};

// ========================================
// 💡 EXPORT DEFAULT
// ========================================
export default {
  maxWidths,
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  cards,
  iconBox,
  buttons,
  grids,
  badges,
  gradients,
  forms,
  tables,
  alerts,
  loading,
  modal,
  popups,
  breadcrumb,
  interactive,
  responsive,
  images,
  zIndex,
  presets,
  animations,
  utils,
};