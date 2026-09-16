import React, { useState, useEffect, useCallback } from 'react';
import {
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  X,
  Heart,
  Info,
  Camera,
  MapPin,
  Calendar,
  Share2,
  Download,
  Filter,
  Grid,
  Columns,
  RotateCcw,
  Sparkles,
  Upload,
  Check
} from 'lucide-react';

interface Photo {
  id: string;
  title: string;
  category: string;
  photographer: string;
  location: string;
  date: string;
  camera: string;
  lens: string;
  aperture: string;
  shutter: string;
  iso: string;
  url: string;
  description: string;
}

const INITIAL_PHOTOS: Photo[] = [
  {
    id: 'photo-1',
    title: 'NFL Gridiron Action',
    category: 'Sports',
    photographer: 'NFL Media',
    location: 'NFL Stadium',
    date: 'September 2026',
    camera: 'Canon EOS R3',
    lens: 'EF 400mm f/2.8L IS III USM',
    aperture: 'f/2.8',
    shutter: '1/2000s',
    iso: '1600',
    url: '/images/image-1.jpg',
    description: 'High-intensity NFL game day action captured live under the stadium lights.'
  },
  {
    id: 'photo-2',
    title: 'Featured Portrait & Visual',
    category: 'Featured',
    photographer: 'Editorial Photography',
    location: 'Studio / Location',
    date: 'September 2026',
    camera: 'Hasselblad 907X',
    lens: 'XCD 80mm f/1.9',
    aperture: 'f/2.0',
    shutter: '1/500s',
    iso: '200',
    url: '/images/image-2.jpg',
    description: 'A curated visual portrait showcasing sharp focal composition and tonal contrast.'
  },
  {
    id: 'photo-3',
    title: 'Neon Drizzle at Midnight',
    category: 'Architecture',
    photographer: 'Kenji Takahashi',
    location: 'Shinjuku, Tokyo',
    date: 'December 20, 2025',
    camera: 'Leica Q3',
    lens: 'Summilux 28mm f/1.7 ASPH',
    aperture: 'f/2.0',
    shutter: '1/250s',
    iso: '800',
    url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=85',
    description: 'Puddles on the asphalt become vibrant mirrors reflecting neon signage and towering high-rises through a sudden winter evening downpour.'
  },
  {
    id: 'photo-4',
    title: 'Championship Moments',
    category: 'Sports',
    photographer: 'Getty Images / The Athletic',
    location: 'League Championship',
    date: 'September 2026',
    camera: 'Sony Alpha 1',
    lens: 'FE 70-200mm f/2.8 GM OSS II',
    aperture: 'f/2.8',
    shutter: '1/1600s',
    iso: '1250',
    url: '/images/image-4.jpg',
    description: 'Dynamic sports capture showcasing athletic intensity and competitive grit.'
  },
  {
    id: 'photo-5',
    title: 'Morning Dew on Flora',
    category: 'Nature',
    photographer: 'Aria Thorne',
    location: 'Olympic National Park, Washington',
    date: 'August 28, 2025',
    camera: 'Nikon Z8',
    lens: 'NIKKOR Z MC 105mm f/2.8 VR S',
    aperture: 'f/4.5',
    shutter: '1/320s',
    iso: '400',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=85',
    description: 'Crystal-clear condensation droplets delicately balanced on wild ferns deep inside the temperate Pacific rainforest canopy.'
  },
  {
    id: 'photo-6',
    title: 'Dune Ripples at Sunset',
    category: 'Minimal',
    photographer: 'Tariq Mansour',
    location: 'Erg Chebbi, Morocco',
    date: 'February 9, 2026',
    camera: 'Hasselblad X2D 100C',
    lens: 'XCD 55mm f/2.5 V',
    aperture: 'f/9.0',
    shutter: '1/200s',
    iso: '64',
    url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=85',
    description: 'Sculpted wind ridges form razor-sharp crests where warm orange sunlight meets cool violet desert shadows.'
  },
  {
    id: 'photo-7',
    title: 'Serenade of Shadows',
    category: 'Minimal',
    photographer: 'Maren Lindqvist',
    location: 'Stockholm, Sweden',
    date: 'March 4, 2026',
    camera: 'Sony Alpha 7C II',
    lens: 'FE 50mm f/1.4 GM',
    aperture: 'f/2.8',
    shutter: '1/400s',
    iso: '100',
    url: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1600&q=85',
    description: 'Linear louver shadows dancing across a warm gallery wall, revealing the quiet elegance of geometric simplicity.'
  },
  {
    id: 'photo-8',
    title: 'Majesty in Flight',
    category: 'Nature',
    photographer: 'Christian Vogel',
    location: 'Banff, Alberta, Canada',
    date: 'October 2, 2025',
    camera: 'Sony Alpha 1',
    lens: 'FE 400mm f/2.8 GM OSS',
    aperture: 'f/3.5',
    shutter: '1/2500s',
    iso: '640',
    url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=85',
    description: 'A powerful raptor soaring effortlessly over endless evergreen forests with pristine glacier lakes below.'
  },
  {
    id: 'photo-9',
    title: 'Patagonian Spires',
    category: 'Landscape',
    photographer: 'Mateo Morales',
    location: 'Torres del Paine, Chile',
    date: 'January 29, 2026',
    camera: 'Canon EOS R5 C',
    lens: 'RF 24-105mm f/4L IS USM',
    aperture: 'f/8.0',
    shutter: '1/160s',
    iso: '100',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85',
    description: 'Iconic granite pinnacles pierce through stormy southern clouds as golden sunlight illuminates the wild mountain ridge.'
  }
];

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>(() => {
    try {
      const saved = localStorage.getItem('user_gallery_photos_v4');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 9) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_PHOTOS;
  });

  const categories = ['All', ...Array.from(new Set(photos.map(p => p.category)))];

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [showMetadata, setShowMetadata] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('gallery_favorites');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [layoutMode, setLayoutMode] = useState<'grid' | 'masonry'>('grid');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [replaceTargetId, setReplaceTargetId] = useState<string | null>(null);
  const [customUrlInput, setCustomUrlInput] = useState<string>('');

  // Persist favorites
  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites(prev => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('gallery_favorites', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // Filtered photos
  const filteredPhotos = photos.filter(photo => {
    const matchesCategory = activeCategory === 'All' || photo.category === activeCategory;
    const matchesSearch =
      photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.photographer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Lightbox navigation
  const openLightbox = (indexInFiltered: number) => {
    const photo = filteredPhotos[indexInFiltered];
    const originalIndex = photos.findIndex(p => p.id === photo.id);
    setSelectedPhotoIndex(originalIndex);
    setIsZoomed(false);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
    setIsZoomed(false);
  };

  const nextPhoto = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % photos.length);
    setIsZoomed(false);
  }, [selectedPhotoIndex, photos.length]);

  const prevPhoto = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex - 1 + photos.length) % photos.length);
    setIsZoomed(false);
  }, [selectedPhotoIndex, photos.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'z' || e.key === 'Z') setIsZoomed(prev => !prev);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, nextPhoto, prevPhoto]);

  // Copy photo link
  const handleShare = (photo: Photo) => {
    navigator.clipboard.writeText(photo.url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Reset to original 9 photos
  const handleResetGallery = () => {
    setPhotos(INITIAL_PHOTOS);
    try {
      localStorage.removeItem('user_gallery_photos_v4');
    } catch {
      // ignore
    }
  };

  // Replace photo url
  const handleApplyReplacement = (targetId: string) => {
    if (!customUrlInput.trim()) return;
    const updated = photos.map(p =>
      p.id === targetId ? { ...p, url: customUrlInput.trim() } : p
    );
    setPhotos(updated);
    try {
      localStorage.setItem('user_gallery_photos_v4', JSON.stringify(updated));
    } catch {
      // ignore
    }
    setReplaceTargetId(null);
    setCustomUrlInput('');
  };

  // Local file upload for a tile
  const handleFileUpload = (targetId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const updated = photos.map(p =>
          p.id === targetId ? { ...p, url: reader.result as string } : p
        );
        setPhotos(updated);
        try {
          localStorage.setItem('user_gallery_photos_v4', JSON.stringify(updated));
        } catch {
          // ignore
        }
        setReplaceTargetId(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const currentPhoto = selectedPhotoIndex !== null ? photos[selectedPhotoIndex] : null;

  return (
    <div id="gallery-container" className="min-h-screen bg-stone-100/70 text-stone-800 flex flex-col selection:bg-stone-800 selection:text-white">
      {/* Top Header */}
      <header id="gallery-header" className="sticky top-0 z-30 border-b border-stone-200/80 bg-stone-50/90 backdrop-blur-md transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-stone-900 text-stone-100 flex items-center justify-center font-serif text-base font-bold shadow-sm">
              9
            </div>
            <div>
              <h1 id="gallery-title" className="font-serif text-lg sm:text-xl font-bold tracking-tight text-stone-900">
                Nine Perspectives
              </h1>
              <p className="text-xs text-stone-500 font-medium -mt-0.5 hidden sm:block">
                A Curated 9-Image Photography Exhibition
              </p>
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Input */}
            <div className="relative">
              <input
                id="gallery-search-input"
                type="text"
                placeholder="Search photos..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-32 sm:w-48 pl-3 pr-8 py-1.5 text-xs bg-white rounded-md border border-stone-200 text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-500 transition-colors"
              />
              {searchQuery && (
                <button
                  id="btn-clear-search"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Layout Toggle */}
            <div className="hidden sm:flex items-center bg-stone-200/60 p-0.5 rounded-md border border-stone-200">
              <button
                id="btn-layout-grid"
                onClick={() => setLayoutMode('grid')}
                className={`p-1.5 rounded transition-all ${
                  layoutMode === 'grid'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
                title="3x3 Uniform Grid"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                id="btn-layout-masonry"
                onClick={() => setLayoutMode('masonry')}
                className={`p-1.5 rounded transition-all ${
                  layoutMode === 'masonry'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
                title="Natural Aspect Ratio"
              >
                <Columns className="w-4 h-4" />
              </button>
            </div>

            {/* Reset Button if modified */}
            <button
              id="btn-reset-gallery"
              onClick={handleResetGallery}
              className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-200/70 rounded-md transition-colors"
              title="Reset default 9 photos"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main id="gallery-main" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Category Filter Pills & Counter */}
        <div id="gallery-filter-bar" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map(cat => {
              const count =
                cat === 'All'
                  ? photos.length
                  : photos.filter(p => p.category === cat).length;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  id={`filter-tab-${cat.toLowerCase()}`}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-stone-900 text-stone-50 shadow-xs'
                      : 'bg-stone-200/70 text-stone-600 hover:bg-stone-300/70 hover:text-stone-900'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-stone-700 text-stone-200' : 'bg-stone-300 text-stone-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center space-x-3 text-xs text-stone-500 font-medium">
            <span className="flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>9 High-Definition Works</span>
            </span>
            <span>•</span>
            <span>Click any tile to enter Lightbox</span>
          </div>
        </div>

        {/* 9 Image Grid */}
        {filteredPhotos.length === 0 ? (
          <div id="gallery-empty-state" className="py-20 text-center bg-white rounded-xl border border-stone-200/80 p-8 shadow-xs">
            <Filter className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-stone-800">No images match your filter</h3>
            <p className="text-sm text-stone-500 mt-1 max-w-sm mx-auto">
              Try clearing your search query or selecting "All" to view all 9 photographs in the exhibition.
            </p>
            <button
              id="btn-reset-filters"
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-stone-900 text-stone-50 text-xs font-medium rounded-lg hover:bg-stone-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            id="gallery-grid"
            className={`grid gap-4 sm:gap-6 ${
              layoutMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-max'
            }`}
          >
            {filteredPhotos.map((photo, index) => {
              const isFav = !!favorites[photo.id];
              return (
                <article
                  key={photo.id}
                  id={`gallery-card-${photo.id}`}
                  onClick={() => openLightbox(index)}
                  className="group relative bg-white rounded-xl overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col"
                >
                  {/* Image Frame */}
                  <div
                    className={`relative overflow-hidden bg-stone-200 ${
                      layoutMode === 'grid' ? 'aspect-4/3' : 'aspect-auto max-h-[380px]'
                    }`}
                  >
                    <img
                      src={photo.url}
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Subtle Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5">
                      <div className="flex items-center justify-between">
                        <span className="bg-black/50 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
                          {photo.category}
                        </span>
                        <div className="flex items-center space-x-1.5">
                          {/* Favorite Button */}
                          <button
                            id={`btn-fav-${photo.id}`}
                            onClick={e => toggleFavorite(photo.id, e)}
                            className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md flex items-center justify-center text-white transition-transform active:scale-90"
                            title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                          >
                            <Heart
                              className={`w-4 h-4 ${
                                isFav ? 'fill-rose-500 text-rose-500' : 'text-white'
                              }`}
                            />
                          </button>
                          {/* Expand Icon */}
                          <div className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md flex items-center justify-center text-white">
                            <Maximize2 className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>

                      <div className="text-white">
                        <p className="text-xs text-stone-300 flex items-center space-x-1 mb-0.5">
                          <MapPin className="w-3 h-3 text-stone-300" />
                          <span>{photo.location}</span>
                        </p>
                        <p className="text-sm font-serif font-bold leading-tight">
                          {photo.title}
                        </p>
                      </div>
                    </div>

                    {/* Favorite badge in default view if favorited */}
                    {isFav && (
                      <div className="absolute top-2.5 right-2.5 bg-rose-500 text-white p-1 rounded-full shadow-xs group-hover:hidden">
                        <Heart className="w-3 h-3 fill-white" />
                      </div>
                    )}

                    {/* Number tag */}
                    <div className="absolute top-2.5 left-2.5 bg-stone-900/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-sm group-hover:hidden">
                      #{photos.findIndex(p => p.id === photo.id) + 1}
                    </div>
                  </div>

                  {/* Card Footer Info */}
                  <div className="p-4 flex items-center justify-between border-t border-stone-100 bg-white">
                    <div className="min-w-0 pr-2">
                      <h2 className="text-sm font-semibold text-stone-900 truncate">
                        {photo.title}
                      </h2>
                      <p className="text-xs text-stone-500 truncate flex items-center space-x-1.5 mt-0.5">
                        <span>by {photo.photographer}</span>
                        <span>•</span>
                        <span>{photo.camera.split(' ')[0]}</span>
                      </p>
                    </div>

                    <button
                      id={`btn-replace-photo-${photo.id}`}
                      onClick={e => {
                        e.stopPropagation();
                        setReplaceTargetId(photo.id);
                      }}
                      className="p-1.5 text-stone-400 hover:text-stone-800 hover:bg-stone-100 rounded-md transition-colors"
                      title="Replace this image"
                    >
                      <Upload className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer id="gallery-footer" className="border-t border-stone-200/80 bg-white py-6 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-serif italic text-stone-700">
            A minimalist 9-image visual gallery celebrating architectural form, wilderness, and natural light.
          </p>
          <div className="flex items-center space-x-4 text-stone-400">
            <span>Use Left / Right arrow keys to navigate</span>
            <span>•</span>
            <span>Press Esc to close</span>
          </div>
        </div>
      </footer>

      {/* Lightbox Modal */}
      {currentPhoto && selectedPhotoIndex !== null && (
        <div
          id="gallery-lightbox-modal"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex flex-col justify-between select-none animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Lightbox Top Control Bar */}
          <div
            className="w-full px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-stone-800/80 bg-stone-950/40"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center space-x-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 bg-stone-800/60 px-2.5 py-1 rounded">
                {selectedPhotoIndex + 1} / {photos.length}
              </span>
              <span className="text-stone-300 font-serif font-medium text-sm sm:text-base truncate max-w-[200px] sm:max-w-md">
                {currentPhoto.title}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {/* Zoom toggle */}
              <button
                id="btn-lightbox-zoom"
                onClick={() => setIsZoomed(!isZoomed)}
                className={`p-2 rounded-lg transition-colors ${
                  isZoomed
                    ? 'bg-stone-100 text-stone-900'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
                title={isZoomed ? 'Reset zoom (Z)' : 'Zoom image (Z)'}
              >
                {isZoomed ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* Toggle Info Drawer */}
              <button
                id="btn-lightbox-info"
                onClick={() => setShowMetadata(!showMetadata)}
                className={`p-2 rounded-lg transition-colors ${
                  showMetadata
                    ? 'bg-stone-800 text-stone-100'
                    : 'text-stone-400 hover:text-white hover:bg-stone-800'
                }`}
                title="Toggle photo details"
              >
                <Info className="w-4 h-4" />
              </button>

              {/* Favorite Button */}
              <button
                id="btn-lightbox-fav"
                onClick={() => toggleFavorite(currentPhoto.id)}
                className="p-2 text-stone-300 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
                title="Favorite"
              >
                <Heart
                  className={`w-4 h-4 ${
                    favorites[currentPhoto.id]
                      ? 'fill-rose-500 text-rose-500'
                      : 'text-stone-300'
                  }`}
                />
              </button>

              {/* Share/Copy URL */}
              <button
                id="btn-lightbox-share"
                onClick={() => handleShare(currentPhoto)}
                className="p-2 text-stone-300 hover:text-white hover:bg-stone-800 rounded-lg transition-colors relative"
                title="Copy high-res image URL"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>

              {/* Download / Open external */}
              <a
                id="link-lightbox-download"
                href={currentPhoto.url}
                target="_blank"
                rel="noreferrer"
                className="p-2 text-stone-300 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
                title="Open original high-res image"
              >
                <Download className="w-4 h-4" />
              </a>

              {/* Close Button */}
              <button
                id="btn-lightbox-close"
                onClick={closeLightbox}
                className="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors ml-2"
                title="Close Lightbox (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Lightbox Center: Image Viewport + Left/Right Nav */}
          <div className="relative flex-1 flex items-center justify-center overflow-hidden p-2 sm:p-6">
            {/* Prev Button */}
            <button
              id="btn-lightbox-prev"
              onClick={e => {
                e.stopPropagation();
                prevPhoto();
              }}
              className="absolute left-3 sm:left-6 z-20 w-11 h-11 rounded-full bg-stone-900/70 hover:bg-stone-800 text-white flex items-center justify-center backdrop-blur-sm transition-transform active:scale-95 border border-stone-700/50"
              title="Previous photo (Left Arrow)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              id="btn-lightbox-next"
              onClick={e => {
                e.stopPropagation();
                nextPhoto();
              }}
              className="absolute right-3 sm:right-6 z-20 w-11 h-11 rounded-full bg-stone-900/70 hover:bg-stone-800 text-white flex items-center justify-center backdrop-blur-sm transition-transform active:scale-95 border border-stone-700/50"
              title="Next photo (Right Arrow)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Stage Image */}
            <div
              className={`max-w-full max-h-full transition-all duration-300 flex items-center justify-center ${
                isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={e => {
                e.stopPropagation();
                setIsZoomed(!isZoomed);
              }}
            >
              <img
                src={currentPhoto.url}
                alt={currentPhoto.title}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] sm:max-h-[82vh] max-w-[90vw] object-contain rounded-lg shadow-2xl transition-all"
              />
            </div>
          </div>

          {/* Optional Bottom Metadata Drawer */}
          {showMetadata && (
            <div
              id="lightbox-metadata-panel"
              onClick={e => e.stopPropagation()}
              className="w-full bg-stone-900/90 border-t border-stone-800 px-4 sm:px-8 py-4 backdrop-blur-md"
            >
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                      {currentPhoto.category}
                    </span>
                    <span className="text-stone-600">•</span>
                    <span className="text-xs text-stone-400 flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-stone-400" />
                      <span>{currentPhoto.location}</span>
                    </span>
                    <span className="text-stone-600">•</span>
                    <span className="text-xs text-stone-400 flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-stone-400" />
                      <span>{currentPhoto.date}</span>
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-stone-100">
                    {currentPhoto.title}
                  </h3>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {currentPhoto.description}
                  </p>
                </div>

                {/* EXIF Data Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 bg-stone-950/60 p-3 rounded-lg border border-stone-800 text-xs">
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase font-medium flex items-center space-x-1">
                      <Camera className="w-2.5 h-2.5 mr-0.5" /> Camera
                    </span>
                    <span className="text-stone-200 font-medium truncate block">
                      {currentPhoto.camera}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase font-medium">
                      Lens
                    </span>
                    <span className="text-stone-200 font-medium truncate block">
                      {currentPhoto.lens}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase font-medium">
                      Exposure
                    </span>
                    <span className="text-stone-200 font-medium">
                      {currentPhoto.aperture} • {currentPhoto.shutter}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase font-medium">
                      ISO / Artist
                    </span>
                    <span className="text-stone-200 font-medium">
                      ISO {currentPhoto.iso} • {currentPhoto.photographer}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Replace Image Modal */}
      {replaceTargetId && (
        <div
          id="replace-image-modal"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setReplaceTargetId(null)}
        >
          <div
            className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-stone-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-serif font-bold text-base text-stone-900">
                Replace Photo #{photos.findIndex(p => p.id === replaceTargetId) + 1}
              </h3>
              <button
                id="btn-close-replace-modal"
                onClick={() => setReplaceTargetId(null)}
                className="text-stone-400 hover:text-stone-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Option 1: Paste Image URL
                </label>
                <div className="flex space-x-2">
                  <input
                    id="input-replace-url"
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={customUrlInput}
                    onChange={e => setCustomUrlInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-stone-800"
                  />
                  <button
                    id="btn-apply-replace-url"
                    onClick={() => handleApplyReplacement(replaceTargetId)}
                    className="px-3.5 py-2 bg-stone-900 text-stone-50 text-xs font-medium rounded-lg hover:bg-stone-800 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-stone-200"></div>
                <span className="flex-shrink mx-3 text-stone-400 text-xs uppercase tracking-wider">or</span>
                <div className="flex-grow border-t border-stone-200"></div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Option 2: Upload Image File
                </label>
                <input
                  id="input-replace-file"
                  type="file"
                  accept="image/*"
                  onChange={e => handleFileUpload(replaceTargetId, e)}
                  className="block w-full text-xs text-stone-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-200 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
