import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, ArrowLeft, ArrowRight, Heart, MessageCircle, Share2, Bookmark, 
  Clock, Check, Search, MapPin, Star, Plus, Minus, ShoppingBag, Trash2, 
  Shield, HelpCircle, Phone, X, User as UserIcon, Lock, Mail, CreditCard, 
  Landmark, CheckCircle, AlertCircle, ChevronDown, ChevronUp, Navigation, Menu
} from 'lucide-react';

// --- Animated Wave Component (Mathematical Liquid Motion) ---
const AnimatedWave = ({ className, pathClass, fill, baseHeight = 60, amplitude = 15, frequency = 0.005, speed = 0.02 }) => {
  const pathRef = useRef(null);
  useEffect(() => {
    let animationFrameId;
    let phase = 0;
    const animate = () => {
      phase += speed;
      const width = 1440;
      const height = 120;
      let d = `M 0,${height} L 0,${baseHeight}`;
      
      for (let x = 0; x <= width; x += 10) {
        const y = Math.sin(x * frequency + phase) * amplitude + 
                  Math.cos(x * (frequency * 2) - phase * 0.5) * (amplitude * 0.3) + 
                  baseHeight;
        d += ` L ${x},${y}`;
      }
      
      d += ` L ${width},${height} Z`;
      
      if (pathRef.current) {
        pathRef.current.setAttribute('d', d);
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [baseHeight, amplitude, frequency, speed]);

  return (
    <svg className={className} viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
      <path ref={pathRef} className={pathClass} fill={fill} />
    </svg>
  );
};

// --- Magnetic Button Component (Replaced with Premium Zoom Hover) ---
const MagneticButton = ({ children, className, onClick }) => {
  return (
    <div 
      className={`normal-zoom-btn ${className || ''}`}
      onClick={onClick}
      style={{ display: 'inline-block', cursor: 'pointer' }}
    >
      {children}
    </div>
  );
};

// --- Floating Element Component (Parallax + Floating Physics) ---
const FloatingElement = ({ src, style, speedX = 0.5, speedY = 0.5 }) => {
  const ref = useRef(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * (speedX * 0.05);
      mouseY = (e.clientY - window.innerHeight / 2) * (speedY * 0.05);
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;
    const updatePosition = () => {
      currentX += (mouseX - currentX) * 0.05;
      currentY += (mouseY - currentY) * 0.05;

      if (ref.current) {
        ref.current.style.transform = `translate(${currentX}px, ${currentY}px)`;
      }
      animationFrameId = requestAnimationFrame(updatePosition);
    };
    updatePosition();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speedX, speedY]);

  return (
    <img 
      ref={ref} 
      src={src} 
      className="floating-element" 
      style={{ ...style, transition: 'transform 0.1s ease-out' }} 
      alt="Floating ingredient"
    />
  );
};

// Image mapping for high-quality food and brand visuals (local + Unsplash fallbacks)
const imageMap = {
  'spicy_tadka.jpg': '/images/spicy_tadka.png',
  'dosa_express.jpg': '/images/dosa_express.png',
  'royal_biryani.jpg': '/images/royal_biryani.png',
  'chaat_corner.jpg': '/images/chaat_corner.png',
  'sweet_delight.jpg': '/images/sweet_delight.png',
  
  'mango_chutney.jpg': '/assets/Aanp-Palais-Spread-Nature-sleeve-FR-DE-125g-Packshot-montage-Perspectief-RGB-shadow-1024x1082.png',
  'garlic_spread.jpg': '/assets/Aanp-Palais-Spread-Cumcumber-Chives-sleeve-FR-DE-125g-Packshot-montage-Perspectief-RGB-shadow-1024x1082.png',
  'mint_pesto.jpg': '/assets/Aanp-Palais-Saus-Pasta-sleeve-NL-FR-400ml-Packshot-montage-Perspectief-RGB-shadow-1024x1082.png',
  'makhani_spread.jpg': '/assets/Aanp-Palais-Saus-Bechamel-sleeve-NL-FR-400ml-Packshot-montage-Perspectief-RGB-shadow-1024x1082.png',

  'falafel_wrap.jpg': '/assets/Spread-Garlic-Fine-Herbs-Falafel-wrap-DSC09344-scaled.jpg',
  'paneer_flatbread.jpg': '/assets/Spread-Nature-Breakfast-Toast-DSC08857-scaled.jpg',
  'dosa_rollup.jpg': '/assets/Sauce-Bechamel-Tian-de-Provence-DSC09067-scaled.jpg',

  'butter_paneer.jpg': 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=300&fit=crop',
  'dal_makhani.jpg': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=300&fit=crop',
  'butter_chicken.jpg': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300&h=300&fit=crop',
  'paneer_tikka.jpg': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300&h=300&fit=crop',
  'chicken_tikka.jpg': 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300&h=300&fit=crop',
  'butter_naan.jpg': 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=300&h=300&fit=crop',
  'tandoori_roti.jpg': 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=300&h=300&fit=crop',
  'masala_dosa.jpg': 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=300&h=300&fit=crop',
  'idli_sambar.jpg': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&h=300&fit=crop',
  'medu_vada.jpg': 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=300&h=300&fit=crop',
  'rava_dosa.jpg': 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=300&h=300&fit=crop',
  'filter_coffee.jpg': 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&h=300&fit=crop',
  'chicken_biryani.jpg': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&h=300&fit=crop',
  'mutton_biryani.jpg': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=300&fit=crop',
  'paneer_biryani.jpg': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&h=300&fit=crop',
  'veg_biryani.jpg': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&h=300&fit=crop',
  'garlic_naan.jpg': 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=300&h=300&fit=crop',
  'mirchi_salan.jpg': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&h=300&fit=crop',
  'pani_puri.jpg': 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=300&h=300&fit=crop',
  'samosa_chaat.jpg': 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=300&h=300&fit=crop',
  'chole_bhature.jpg': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&h=300&fit=crop',
  'pav_bhaji.jpg': 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=300&h=300&fit=crop',
  'gulab_jamun.jpg': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&h=300&fit=crop',
  'rasgulla.jpg': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&h=300&fit=crop',
  'kulfi.jpg': 'https://images.unsplash.com/photo-1501443782782-782a09d9b4ae?w=300&h=300&fit=crop',
  'lassi.jpg': 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&h=300&fit=crop'
};

const defaultImageUrl = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop';
const getFoodImage = (name) => imageMap[name] || defaultImageUrl;

const categories = [
  { name: 'All', icon: '🍽️' },
  { name: 'Biryani', icon: '🍲', image: '/images/royal_biryani.png' },
  { name: 'South Indian', icon: '🥞', image: '/images/dosa_express.png' },
  { name: 'Main Course', icon: '🥘', image: '/images/spicy_tadka.png' },
  { name: 'Starters', icon: '🍢', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=150&h=150&fit=crop' },
  { name: 'Chaat', icon: '🥯', image: '/images/chaat_corner.png' },
  { name: 'Sweets', icon: '🍨', image: '/images/sweet_delight.png' }
];

// Presets for Manual Location Selection
const LOCATION_PRESETS = [
  { name: 'Indiranagar, Bangalore', lat: 12.9716, lng: 77.6412 },
  { name: 'Connaught Place, New Delhi', lat: 28.6304, lng: 77.2177 },
  { name: 'Gachibowli, Hyderabad', lat: 17.4483, lng: 78.3489 },
  { name: 'Juhu, Mumbai', lat: 19.1075, lng: 72.8263 },
  { name: 'Park Street, Kolkata', lat: 22.5485, lng: 88.3514 },
  { name: 'Sector 29, Gurgaon', lat: 28.4682, lng: 77.0628 },
  { name: 'Jayanagar, Bangalore', lat: 12.9250, lng: 77.5938 },
  { name: 'Banjara Hills, Hyderabad', lat: 17.4156, lng: 78.4347 },
  { name: 'Bandra West, Mumbai', lat: 19.0607, lng: 72.8362 }
];

// Coordinate mapping for 10 restaurants (to calculate real distance in km)
const RESTAURANT_COORDS = {
  1: { lat: 28.6304, lng: 77.2177 }, // Spicy Tadka (Delhi)
  2: { lat: 12.9716, lng: 77.6412 }, // Dosa Express (Bangalore)
  3: { lat: 17.4483, lng: 78.3489 }, // Royal Biryani House (Hyderabad)
  4: { lat: 19.1075, lng: 72.8263 }, // Chaat Corner (Mumbai)
  5: { lat: 22.5485, lng: 88.3514 }, // Sweet Delight (Kolkata)
  6: { lat: 28.4682, lng: 77.0628 }, // Tandoori Heights (Gurgaon)
  7: { lat: 12.9250, lng: 77.5938 }, // Dakshin Delights (Bangalore)
  8: { lat: 17.4156, lng: 78.4347 }, // Biryani Nawab (Hyderabad)
  9: { lat: 19.0607, lng: 72.8362 }, // Mumbai Masala (Mumbai)
  10: { lat: 22.5485, lng: 88.3514 } // Sweet Nirvana (Kolkata)
};

// Haversine formula to calculate distance in km
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return d.toFixed(1);
};

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export default function App() {
  // Navigation & View States
  const [currentView, setCurrentView] = useState('home'); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [vegOnly, setVegOnly] = useState(false);
  
  // Geolocation & Active Location states
  const [activeLocationName, setActiveLocationName] = useState('Indiranagar, Bangalore');
  const [activeCoords, setActiveCoords] = useState({ lat: 12.9716, lng: 77.6412 });
  const [showLocationModal, setShowLocationModal] = useState(false);

  // Mouse Position (for homepage dynamic floating elements)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Brand Catalog Data
  const [products, setProducts] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Ordering Data
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [searchDishesResults, setSearchDishesResults] = useState([]);

  // User Authentication & Addresses
  const [currentUser, setCurrentUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddressLabel, setNewAddressLabel] = useState('Home');
  const [newAddressLine, setNewAddressLine] = useState('');
  
  const [authModal, setAuthModal] = useState(null); // null | 'login' | 'register'
  const [authUsername, setAuthUsername] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authAddress, setAuthAddress] = useState('');
  const [authError, setAuthError] = useState('');

  // Cart State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  // Payment Gateway Flow
  const [paymentStep, setPaymentStep] = useState('cart'); // 'cart' | 'pay-select' | 'processing' | 'success'
  const [paymentMethod, setPaymentMethod] = useState('COD'); // 'COD' | 'CARD' | 'UPI'
  const [cardNumber, setCardNumber] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [upiId, setUpiId] = useState('');
  const [paymentError, setPaymentError] = useState('');

  // Order Tracking
  const [activeOrder, setActiveOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState('');
  const [orderItemsList, setOrderItemsList] = useState([]);
  const [userOrders, setUserOrders] = useState([]);

  // Newsletter & Contact states
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMessage, setNewsletterMessage] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState('');
  const [contactError, setContactError] = useState('');

  const carouselRef = useRef(null);

  // Default fallback data matching the database seed and screenshots
  const defaultProducts = [
    { id: 1, name: "CLOUD RASOI NATURE", category: "SPREAD", subtitle: "100% Plant-based spread", imageName: "mango_chutney.jpg", description: "Our Nature spread has incredible fresh flavours and creamy textures. Made entirely from organic cashews." },
    { id: 2, name: "CLOUD RASOI CONCOMBRE & CIBOULETTE", category: "SPREAD", subtitle: "Cucumber & Chives spread", imageName: "garlic_spread.jpg", description: "A refreshing blend of fresh cucumber and aromatic chives. Perfect for spreading or dipping." },
    { id: 3, name: "CLOUD RASOI CUISINE PASTA SAUCE", category: "CUISINE", subtitle: "Creamy pasta sauce", imageName: "mint_pesto.jpg", description: "Our plant-based pasta sauce is pretty simple. You don't need to be a chef to use this creamy sauce." },
    { id: 4, name: "CLOUD RASOI CUISINE BECHAMEL", category: "CUISINE", subtitle: "Cheesy & creamy sauce", imageName: "makhani_spread.jpg", description: "A rich, creamy plant-based Bechamel sauce. Something this tasty and easy to use shouldn't be healthy – but it is!" }
  ];

  const defaultRecipes = [
    { id: 1, title: "FALAFEL WRAPS WITH ROASTED CARROT-BEET SALAD", imageName: "falafel_wrap.jpg", timeBadge: "25 min", difficulty: 1, description: "Tasty falafel wraps garnished with fresh salad and garlic herbs spread.", badges: "vegan,lactose-free,soy-free" },
    { id: 2, title: "SPREAD NATURE ON BREAKFAST TOAST", imageName: "paneer_flatbread.jpg", timeBadge: "15 min", difficulty: 1, description: "Start your morning with a nutritious, creamy cashew spread toast.", badges: "vegan,lactose-free,gluten-free" },
    { id: 3, title: "BECHAMEL TIAN DE PROVENCE", imageName: "dosa_rollup.jpg", timeBadge: "45 min", difficulty: 2, description: "A traditional Provençal vegetable gratin baked with creamy plant-based Bechamel.", badges: "vegan,lactose-free,soy-free" }
  ];

  // Mouse Move Parallax Handler
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientWidth, clientHeight } = document.documentElement;
      const x = (e.clientX / clientWidth - 0.5) * 30; // Max 30px offset
      const y = (e.clientY / clientHeight - 0.5) * 30;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Load User from LocalStorage on startup
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setCurrentUser(parsed);
      setCustomerName(parsed.username);
      setDeliveryAddress(parsed.address || '');
    }
  }, []);

  // Fetch User Addresses when Logged In
  useEffect(() => {
    if (currentUser) {
      fetch(`${API_BASE_URL}/api/users/${currentUser.id}/addresses`)
        .then(res => res.json())
        .then(data => {
          setAddresses(data);
          if (data.length) {
            setSelectedAddressId(data[0].id);
            setDeliveryAddress(data[0].addressLine);
          }
        })
        .catch(err => console.error("Error fetching addresses:", err));
    } else {
      setAddresses([]);
      setSelectedAddressId(null);
    }
  }, [currentUser]);

  // Fetch Homepage Brand Catalog Data
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data.length ? data : defaultProducts))
      .catch(() => setProducts(defaultProducts));

    fetch(`${API_BASE_URL}/api/recipes`)
      .then(res => res.json())
      .then(data => setRecipes(data.length ? data : defaultRecipes))
      .catch(() => setRecipes(defaultRecipes));
  }, []);

  // Fetch Restaurants for Ordering View
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/restaurants`)
      .then(res => res.json())
      .then(data => {
        setRestaurants(data);
        setFilteredRestaurants(data);
      })
      .catch(err => console.error("Error fetching restaurants:", err));
  }, []);

  // Fetch user orders when viewing history
  const fetchUserOrders = () => {
    if (!currentUser) return;
    fetch(`${API_BASE_URL}/api/orders/user/${currentUser.id}`)
      .then(res => res.json())
      .then(data => setUserOrders(data))
      .catch(err => console.error("Error fetching orders:", err));
  };

  useEffect(() => {
    if (currentView === 'orders') {
      fetchUserOrders();
    }
  }, [currentView, currentUser]);

  // Fetch Menu
  const handleSelectRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
    fetch(`${API_BASE_URL}/api/restaurants/${restaurant.id}/menu`)
      .then(res => res.json())
      .then(data => {
        setMenuItems(data);
        setCurrentView('menu');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch(err => console.error("Error fetching menu:", err));
  };

  // Add Address Handler
  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!currentUser) return;
    fetch(`${API_BASE_URL}/api/users/${currentUser.id}/addresses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ label: newAddressLabel, addressLine: newAddressLine })
    })
      .then(res => res.json())
      .then(data => {
        setAddresses(prev => [...prev, data]);
        setSelectedAddressId(data.id);
        setDeliveryAddress(data.addressLine);
        setNewAddressLabel('Home');
        setNewAddressLine('');
        setShowNewAddressForm(false);
      })
      .catch(err => console.error("Error adding address:", err));
  };

  // Delete Address Handler
  const handleDeleteAddress = (addressId) => {
    if (!currentUser) return;
    fetch(`${API_BASE_URL}/api/users/${currentUser.id}/addresses/${addressId}`, {
      method: 'DELETE'
    })
      .then(() => {
        setAddresses(prev => prev.filter(a => a.id !== addressId));
        if (selectedAddressId === addressId) {
          setSelectedAddressId(null);
          setDeliveryAddress('');
        }
      })
      .catch(err => console.error("Error deleting address:", err));
  };

  // GPS Geolocation Handler
  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setActiveCoords({ lat: latitude, lng: longitude });
          setActiveLocationName("Current Location (🎯)");
          setShowLocationModal(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Could not access your location. Please select manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Preset Selector
  const handleSelectLocationPreset = (preset) => {
    setActiveLocationName(preset.name);
    setActiveCoords({ lat: preset.lat, lng: preset.lng });
    setShowLocationModal(false);
  };

  // Restaurant Distance Getter (Clue Meter)
  const getRestaurantDistance = (restaurantId) => {
    const rCoords = RESTAURANT_COORDS[restaurantId];
    if (!rCoords) return "2.5";
    return calculateDistance(activeCoords.lat, activeCoords.lng, rCoords.lat, rCoords.lng);
  };

  // Live search (matching both Restaurants and Dishes)
  useEffect(() => {
    let result = restaurants;
    if (selectedCategory !== 'All') {
      result = restaurants.filter(r => 
        r.cuisines.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        (selectedCategory === 'Sweets' && r.cuisines.toLowerCase().includes('dessert')) ||
        (selectedCategory === 'Chaat' && r.cuisines.toLowerCase().includes('street food'))
      );
    }

    if (searchQuery.trim() !== '') {
      // 1. Search Restaurants
      fetch(`${API_BASE_URL}/api/restaurants/search?query=${searchQuery}`)
        .then(res => res.json())
        .then(data => setFilteredRestaurants(data))
        .catch(() => {
          const localFiltered = result.filter(r => 
            r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.cuisines.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setFilteredRestaurants(localFiltered);
        });

      // 2. Search Dishes
      fetch(`${API_BASE_URL}/api/restaurants/search/dishes?query=${searchQuery}`)
        .then(res => res.json())
        .then(data => setSearchDishesResults(data))
        .catch(() => setSearchDishesResults([]));
    } else {
      setFilteredRestaurants(result);
      setSearchDishesResults([]);
    }
  }, [searchQuery, selectedCategory, restaurants]);

  // Cart Management
  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      const isVegVal = item.isVeg !== undefined ? item.isVeg : item.veg;
      return [...prev, { ...item, isVeg: isVegVal, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === itemId);
      if (existing.quantity === 1) {
        return prev.filter(i => i.id !== itemId);
      }
      return prev.map(i => i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i);
    });
  };

  const getCartSubtotal = () => cart.reduce((acc, i) => acc + (i.price * i.quantity), 0);
  const getCartCount = () => cart.reduce((acc, i) => acc + i.quantity, 0);

  // Authentication Handlers
  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError('');
    fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: authUsername, password: authPassword })
    })
      .then(async res => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Login failed");
        return data;
      })
      .then(data => {
        setCurrentUser(data.user);
        setCustomerName(data.user.username);
        setDeliveryAddress(data.user.address || '');
        localStorage.setItem('user', JSON.stringify(data.user));
        setAuthModal(null);
        setAuthUsername('');
        setAuthPassword('');
      })
      .catch(err => setAuthError(err.message));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setAuthError('');
    fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        username: authUsername, 
        password: authPassword, 
        email: authEmail, 
        phone: authPhone, 
        address: authAddress 
      })
    })
      .then(async res => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Registration failed");
        return data;
      })
      .then(data => {
        setCurrentUser(data.user);
        setCustomerName(data.user.username);
        setDeliveryAddress(data.user.address || '');
        localStorage.setItem('user', JSON.stringify(data.user));
        setAuthModal(null);
        setAuthUsername('');
        setAuthPassword('');
        setAuthEmail('');
        setAuthPhone('');
        setAuthAddress('');
      })
      .catch(err => setAuthError(err.message));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    setCurrentView('home');
  };

  // Place Order through Payment Gateway
  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!currentUser) {
      setAuthModal('login');
      return;
    }
    setPaymentStep('pay-select');
  };

  const handleExecutePayment = () => {
    setPaymentError('');
    setPaymentStep('processing');

    const orderPayload = {
      userId: currentUser.id,
      customerName,
      address: deliveryAddress,
      paymentMethod,
      paymentDetails: {
        cardNumber,
        cvv: cardCvv,
        upiId
      },
      items: cart.map(item => ({
        menuItemId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }))
    };

    setTimeout(() => {
      fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      })
        .then(async res => {
          const data = await res.json();
          if (!res.ok) throw new Error(data.message || "Order placement failed");
          return data;
        })
        .then(data => {
          setActiveOrder(data.order);
          setOrderStatus(data.order.status);
          setOrderItemsList(data.items);
          setCart([]);
          setPaymentStep('success');
          startPollingOrder(data.order.id);
        })
        .catch(err => {
          setPaymentError(err.message);
          setPaymentStep('pay-select');
        });
    }, 2500);
  };

  // Poll order status
  const startPollingOrder = (orderId) => {
    const pollInterval = setInterval(() => {
      fetch(`${API_BASE_URL}/api/orders/${orderId}`)
        .then(res => res.json())
        .then(data => {
          setOrderStatus(data.order.status);
          if (data.order.status === 'DELIVERED') {
            clearInterval(pollInterval);
          }
        })
        .catch(() => clearInterval(pollInterval));
    }, 4000);
  };

  const handleTrackOrder = (order) => {
    setActiveOrder(order);
    setOrderStatus(order.status);
    fetch(`${API_BASE_URL}/api/orders/${order.id}`)
      .then(res => res.json())
      .then(data => {
        setOrderItemsList(data.items);
        startPollingOrder(order.id);
      })
      .catch(err => console.error(err));
  };

  // Contact Form Submission
  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSuccess('');
    setContactError('');
    
    fetch(`${API_BASE_URL}/api/contact/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: contactName, email: contactEmail, subject: contactSubject, message: contactMessage })
    })
      .then(async res => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        return data;
      })
      .then(data => {
        setContactSuccess(data.message);
        setContactName('');
        setContactEmail('');
        setContactSubject('');
        setContactMessage('');
      })
      .catch(err => setContactError(err.message));
  };

  // Newsletter Submission
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setNewsletterMessage('');

    fetch(`${API_BASE_URL}/api/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: newsletterEmail })
    })
      .then(res => res.json())
      .then(data => {
        setNewsletterMessage(data.message);
        setNewsletterEmail('');
      })
      .catch(() => {
        setNewsletterMessage("Thank you for subscribing to Cloud Rasoi!");
        setNewsletterEmail('');
      });
  };

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 340; 
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const menuCategories = [...new Set(menuItems.map(item => item.category))];

  return (
    <div className="app-wrapper">
      
      {/* --- Unified Header & Navigation --- */}
      {/* --- Unified Header & Navigation --- */}
      <nav className="navbar">
        <div className="logo-container" onClick={() => { setCurrentView('home'); setSelectedRestaurant(null); }} style={{ cursor: 'pointer' }}>
          <span className="logo-emoji-brand" style={{ fontSize: '28px', marginRight: '8px' }}>🍲</span>
          <span className="logo-text-brand" style={{ fontFamily: 'var(--font-display)', fontSize: '32px', letterSpacing: '0.05em', color: 'var(--color-deep-indigo)' }}>
            Cloud Rasoi
          </span>
        </div>

        {/* Location Selector (GPS/Manual preset trigger) */}
        {(currentView === 'explore' || currentView === 'menu') && (
          <div 
            className="header-location-selector" 
            onClick={() => setShowLocationModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              fontFamily: 'var(--font-ui)',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--color-deep-indigo)',
              padding: '6px 16px',
              borderRadius: '20px',
              backgroundColor: 'rgba(29, 66, 32, 0.05)',
              border: '1px solid rgba(29, 66, 32, 0.1)'
            }}
          >
            <MapPin size={16} style={{ color: 'var(--color-burnt-orange)' }} />
            <span className="location-text-header">{activeLocationName}</span>
            <ChevronDown size={14} />
          </div>
        )}
        
        {/* Navigation Links - Desktop Only */}
        <ul className="nav-links">
          {currentView === 'home' ? (
            <>
              <li className="nav-link"><a href="#about">Our Story</a></li>
              <li className="nav-link"><a href="#products">Products</a></li>
              <li className="nav-link"><a href="#recipes">Recipes</a></li>
              <li className="nav-link"><a href="#contact">Contact</a></li>
              <li className="nav-link highlight-link" onClick={() => setCurrentView('explore')}>
                Order Online 🛵
              </li>
            </>
          ) : (
            <>
              <li className="nav-link" onClick={() => setCurrentView('home')}>Home</li>
              <li className="nav-link highlight-link" onClick={() => setCurrentView('explore')}>Browse Food</li>
            </>
          )}
        </ul>

        <div className="nav-actions">
          {(currentView === 'explore' || currentView === 'menu') && (
            <div className="header-search-box">
              <Search size={16} />
              <input 
                type="text" 
                placeholder="Search biryani, paneer..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}

          {currentUser ? (
            <div className="user-profile-menu-header">
              <button className="btn-profile-header" onClick={() => setCurrentView('profile')}>
                <UserIcon size={16} />
                <span className="user-name-text">Hi, {currentUser.username}</span>
              </button>
            </div>
          ) : (
            <span className="nav-action-link" style={{ cursor: 'pointer' }} onClick={() => setAuthModal('login')}>
              Sign In
            </span>
          )}

          {(currentView !== 'home' || getCartCount() > 0) && (
            <button className="btn-cart-header" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag size={18} />
              {getCartCount() > 0 && <span className="cart-badge-header">{getCartCount()}</span>}
            </button>
          )}

          <div className="desktop-only-order-btn">
            <MagneticButton onClick={() => setCurrentView('explore')}>
              <button className="btn-filled-indigo">Order Now</button>
            </MagneticButton>
          </div>

          {/* Hamburger Menu Button for Mobile/Tablet */}
          <button className="hamburger-menu-btn" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-menu-drawer animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <span className="logo-text-brand" style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--color-deep-indigo)' }}>
                Cloud Rasoi
              </span>
              <button className="btn-close-drawer" onClick={() => setIsMobileMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
            
            <ul className="mobile-menu-links">
              {currentView === 'home' ? (
                <>
                  <li className="mobile-menu-link" onClick={() => { setIsMobileMenuOpen(false); window.location.href = '#about'; }}>Our Story</li>
                  <li className="mobile-menu-link" onClick={() => { setIsMobileMenuOpen(false); window.location.href = '#products'; }}>Products</li>
                  <li className="mobile-menu-link" onClick={() => { setIsMobileMenuOpen(false); window.location.href = '#recipes'; }}>Recipes</li>
                  <li className="mobile-menu-link" onClick={() => { setIsMobileMenuOpen(false); window.location.href = '#contact'; }}>Contact</li>
                  <li className="mobile-menu-link" style={{ color: 'var(--color-burnt-orange)' }} onClick={() => { setIsMobileMenuOpen(false); setCurrentView('explore'); }}>Order Online 🛵</li>
                </>
              ) : (
                <>
                  <li className="mobile-menu-link" onClick={() => { setIsMobileMenuOpen(false); setCurrentView('home'); }}>Home</li>
                  <li className="mobile-menu-link" onClick={() => { setIsMobileMenuOpen(false); setCurrentView('explore'); }}>Browse Food</li>
                </>
              )}
              
              <li style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '12px 0' }} />
              
              {currentUser ? (
                <>
                  <li className="mobile-menu-link" onClick={() => { setIsMobileMenuOpen(false); setCurrentView('profile'); }}>
                    👤 My Profile
                  </li>
                  <li className="mobile-menu-link" onClick={() => { setIsMobileMenuOpen(false); setCurrentView('orders'); }}>
                    📦 My Orders
                  </li>
                  <li className="mobile-menu-link" style={{ color: '#cb202d', marginTop: '20px' }} onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }}>
                    🚪 Logout
                  </li>
                </>
              ) : (
                <li className="mobile-menu-link" style={{ color: 'var(--color-primary)' }} onClick={() => { setIsMobileMenuOpen(false); setAuthModal('login'); }}>
                  🔑 Sign In / Sign Up
                </li>
              )}
            </ul>
          </div>
        </div>
      )}

      {/* --- Main Content Section --- */}
      <main className="main-content">
        
        {currentView === 'home' && (
          /* ================= ORIGINAL HOMEPAGE CLONE (REBRANDED) ================= */
          <div className="home-view-landing animate-fade-in">
            
            {/* --- Hero Section --- */}
            <header className="hero">
              {/* Background blobs (Dynamic Mouse Parallax & Rotate) */}
              <div 
                className="hero-bg-blob watery-element" 
                style={{ 
                  backgroundColor: 'var(--color-honey-gold)', 
                  width: '600px', 
                  height: '600px', 
                  top: '-10%', 
                  right: '-5%', 
                  position: 'absolute', 
                  opacity: 0.85, 
                  zIndex: 1,
                  transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px) rotate(${mousePos.x * 0.1}deg)`,
                  transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)'
                }} 
              />
              <div 
                className="hero-bg-blob watery-element" 
                style={{ 
                  backgroundColor: 'var(--color-mint-sage)', 
                  width: '300px', 
                  height: '400px', 
                  top: '30%', 
                  left: '-10%', 
                  position: 'absolute', 
                  opacity: 0.7, 
                  zIndex: 1,
                  transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px) rotate(${mousePos.x * -0.1}deg)`,
                  transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)'
                }} 
              />
              
              <FloatingElement src="/assets/lactose-free.svg" style={{ top: '20%', left: '45%', width: '60px' }} speedX={0.4} speedY={0.6} />
              <FloatingElement src="/assets/vegan.svg" style={{ top: '70%', left: '10%', width: '50px' }} speedX={0.3} speedY={0.5} />
              
              <div className="container" style={{ zIndex: 10, width: '100%' }}>
                <div className="hero-grid">
                  <div className="hero-left">
                    <h1 className="hero-title">Grow Your<br />Cloud Kitchen</h1>
                    <div className="hero-dots">
                      <span className="hero-dot" /><span className="hero-dot" /><span className="hero-dot" /><span className="hero-dot" /><span className="hero-dot" /><span className="hero-dot" /><span className="hero-dot" /><span className="hero-dot" />
                    </div>
                    <h2 className="hero-subtitle">Handcrafted & Organic Indian Meals</h2>
                    <div style={{ marginTop: '24px' }}>
                      <MagneticButton onClick={() => setCurrentView('explore')}>
                        <button className="btn-filled-indigo" style={{ padding: '16px 40px', fontSize: '14px' }}>
                          Order Online Now 🛵
                        </button>
                      </MagneticButton>
                    </div>
                  </div>
                  <div className="hero-right">
                    <img 
                      src={getFoodImage('spicy_tadka.jpg')} 
                      className="hero-tub" 
                      alt="Cloud Rasoi Special" 
                      style={{ 
                        borderRadius: '24px', 
                        boxShadow: 'var(--shadow-xl-2)', 
                        objectFit: 'cover', 
                        width: '90%', 
                        height: '400px',
                        transform: `translate(${mousePos.x * 0.6}px, ${mousePos.y * 0.6}px) rotate(${mousePos.x * 0.15}deg)`,
                        transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)'
                      }} 
                    />
                  </div>
                </div>
              </div>

              <div className="wave-divider">
                <AnimatedWave pathClass="wave-path" fill="var(--color-pure-white)" baseHeight={60} amplitude={12} speed={0.015} />
              </div>
            </header>

            {/* --- Intro Section --- */}
            <section id="about" className="intro-section">
              <FloatingElement src="/assets/lactose-free.svg" style={{ top: '15%', left: '15%', width: '45px' }} speedX={0.3} speedY={0.3} />
              <div className="container">
                <div className="intro-content">
                  <p className="intro-text">
                    Cloud Rasoi exists because we felt there needed to be more yummy, authentic, and organic food. So we made our creamy spreads, rich curries, and signature gravies entirely out of natural, farm-fresh ingredients.
                  </p>
                  <MagneticButton onClick={() => setCurrentView('explore')}>
                    <button className="btn-outline-orange">Explore Menu →</button>
                  </MagneticButton>
                </div>
              </div>
            </section>

            {/* --- Products Carousel Section --- */}
            <section id="products" className="products-section">
              <div className="container">
                <div className="section-header-carousel">
                  <h2 className="section-title-landing">Signature Products</h2>
                  <div className="carousel-controls">
                    <button className="btn-carousel-control" onClick={() => scrollCarousel('left')}><ArrowLeft size={18} /></button>
                    <button className="btn-carousel-control" onClick={() => scrollCarousel('right')}><ArrowRight size={18} /></button>
                  </div>
                </div>

                <div className="carousel-container" ref={carouselRef}>
                  {products.map(product => (
                    <div key={product.id} className="product-card-landing" onClick={() => setSelectedProduct(product)}>
                      <div className="product-card-img-wrapper">
                        <img src={getFoodImage(product.imageName)} alt={product.name} />
                      </div>
                      <div className="product-card-info">
                        <span className="product-card-category">{product.category}</span>
                        <h3 className="product-card-title">{product.name}</h3>
                        <p className="product-card-subtitle">{product.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* --- Recipe Section --- */}
            <section id="recipes" className="recipes-section">
              <FloatingElement src="/assets/vegetarian.svg" style={{ top: '10%', right: '15%', width: '55px' }} speedX={0.4} speedY={0.4} />
              
              <div className="container">
                <div className="recipes-grid">
                  <div className="recipes-left">
                    <div style={{ width: '100%' }}>
                      <div className="recipes-list-vertical">
                        {recipes.map(recipe => (
                          <div key={recipe.id} className="recipe-row-card" onClick={() => setSelectedRecipe(recipe)}>
                            <div className="recipe-row-img-wrapper">
                              <img src={getFoodImage(recipe.imageName)} alt={recipe.title} />
                            </div>
                            <div className="recipe-row-info">
                              <span className="recipe-row-time">⏱️ {recipe.timeBadge}</span>
                              <h3 className="recipe-row-title">{recipe.title}</h3>
                              <p className="recipe-row-desc">{recipe.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="recipes-right">
                    <span className="recipes-tag">Cook & Bake</span>
                    <h2 className="recipes-main-title">A Kitchen Full of Delights</h2>
                    <p className="recipes-text">
                      Discover quick, healthy, and organic Indian recipes utilizing our signature spreads and fresh kitchen ingredients. Elevate your daily cooking.
                    </p>
                    <MagneticButton onClick={() => setCurrentView('explore')}>
                      <button className="btn-filled-indigo">Order Ingredients</button>
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </section>

            {/* --- Split Section --- */}
            <section className="split-section">
              <div className="split-grid">
                <div className="split-left" style={{ backgroundColor: 'var(--color-mint-sage)' }}>
                  <h2 className="split-title">Easy &<br />Delicious</h2>
                  <p className="split-text">
                    Cloud Rasoi artisanal curries and gravies are pretty simple. You don't need to be a professional chef to cook a delicious Dal Makhani or Paneer Butter Masala. Something this tasty and easy to prepare shouldn't be healthy – but it is!
                  </p>
                  <MagneticButton onClick={() => setCurrentView('explore')}>
                    <button className="btn-white">Get Cooking!</button>
                  </MagneticButton>
                </div>
                <div className="split-right-images">
                  <img 
                    src={getFoodImage('dosa_express.jpg')} 
                    className="split-img-1" 
                    alt="Masala Dosa" 
                    style={{
                      transform: `translate(${mousePos.x * -0.4}px, ${mousePos.y * -0.4}px) rotate(${-10 + mousePos.x * 0.1}deg)`,
                      transition: 'transform 0.15s ease-out'
                    }}
                  />
                  <img 
                    src={getFoodImage('royal_biryani.jpg')} 
                    className="split-img-2" 
                    alt="Chicken Biryani" 
                    style={{
                      transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px) rotate(${8 + mousePos.x * -0.1}deg)`,
                      transition: 'transform 0.15s ease-out'
                    }}
                  />
                </div>
              </div>
            </section>

            {/* --- Social Section --- */}
            <section className="social-section">
              <div className="watery-element" style={{ position: 'absolute', width: '250px', height: '250px', backgroundColor: 'rgba(255, 196, 0, 0.2)', right: '5%', top: '20%' }} />
              
              <div className="container">
                <div className="social-grid">
                  <div className="social-left">
                    <h2 className="social-title">
                      You Are<br />
                      <span>Cloud Rasoi</span>
                    </h2>
                    <p className="social-text">
                      There's plenty of room in our organic kitchen. Our community is great for sharing food ideas and recipes. Share your creations using #CloudRasoi on Instagram!
                    </p>
                    <MagneticButton onClick={() => setCurrentView('explore')}>
                      <button className="btn-outline-orange">Share Your Plate</button>
                    </MagneticButton>
                  </div>
                  
                  <div className="social-right">
                    <div className="social-card-stack">
                      <div className="social-post-card social-card-1" style={{ transform: `rotate(${-6 + mousePos.x * 0.1}deg) translate(${-20 + mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}>
                        <img src={getFoodImage('falafel_wrap.jpg')} alt="Post 1" />
                      </div>
                      <div className="social-post-card social-card-2" style={{ transform: `rotate(${4 + mousePos.x * -0.1}deg) translate(${20 + mousePos.x * -0.5}px, ${20 + mousePos.y * 0.5}px)` }}>
                        <img src={getFoodImage('paneer_flatbread.jpg')} alt="Post 2" />
                      </div>
                      <div className="social-post-card social-card-3" style={{ transform: `rotate(${-2 + mousePos.x * 0.05}deg) translate(${mousePos.x * 0.2}px, ${40 + mousePos.y * 0.6}px)` }}>
                        <img src={getFoodImage('dosa_rollup.jpg')} alt="Post 3" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* --- FAQ & Location Finder --- */}
            <section className="finder-section">
              <div className="container">
                <div className="finder-grid">
                  <div className="finder-card" style={{ backgroundColor: 'var(--color-sky-blue)' }}>
                    <div className="finder-card-content">
                      <h3 className="finder-card-title">Cloud Kitchen Finder</h3>
                      <p className="finder-card-text">
                        Cloud Rasoi is expanding rapidly! Click the button below to see if our kitchens deliver to your sector or neighborhood.
                      </p>
                      <MagneticButton onClick={() => setCurrentView('explore')}>
                        <button className="btn-white">Check Delivery Area</button>
                      </MagneticButton>
                    </div>
                  </div>

                  <div className="finder-card" style={{ backgroundColor: 'var(--color-warm-sand)' }}>
                    <div className="finder-card-content">
                      <h3 className="finder-card-title">Got Any Questions?</h3>
                      <p className="finder-card-text">
                        Want to know about our organic sourcing, allergy information, or clean-packaging standards? Read our detailed FAQ list.
                      </p>
                      <MagneticButton>
                        <button className="btn-white">Read FAQs</button>
                      </MagneticButton>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* --- Contact Form Section --- */}
            <section id="contact" className="contact-form-section-landing container">
              <div className="contact-card-landing">
                <div className="contact-left-landing">
                  <h2 className="contact-title-landing">Send Us a Message</h2>
                  <p>Have inquiries about party catering, organic ingredient sourcing, or partnership opportunities?</p>
                  <div className="contact-details-landing">
                    <p>📞 +91 11 4567 8910</p>
                    <p>✉️ hello@cloudrasoi.com</p>
                  </div>
                </div>
                <div className="contact-right-landing">
                  <form onSubmit={handleContactSubmit} className="landing-contact-form">
                    {contactSuccess && <div className="contact-success-msg">✓ {contactSuccess}</div>}
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      required 
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                    />
                    <input 
                      type="email" 
                      placeholder="Your Email" 
                      required 
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                    />
                    <input 
                      type="text" 
                      placeholder="Subject" 
                      required 
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                    />
                    <textarea 
                      placeholder="Your Message" 
                      required 
                      rows="4"
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                    />
                    <button type="submit" className="btn-submit-landing">Submit Message</button>
                  </form>
                </div>
              </div>
            </section>

            {/* --- Newsletter Sign-up --- */}
            <section className="newsletter-section">
              <div className="container">
                <div className="newsletter-content">
                  <h2 className="newsletter-title">Subscribe to our newsletter</h2>
                  <h3 className="newsletter-subtitle">to receive recipes, kitchen secrets, and discount codes.</h3>
                  <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                    <input 
                      type="email" 
                      placeholder="Your email address" 
                      required 
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                    />
                    <button type="submit" className="btn-subscribe">Subscribe</button>
                  </form>
                  {newsletterMessage && <p className="newsletter-msg">{newsletterMessage}</p>}
                </div>
              </div>
            </section>

          </div>
        )}

        {currentView === 'explore' && (
          /* ================= FOOD ORDERING EXPLORE VIEW ================= */
          <div className="explore-view container animate-fade-in">
            
            {/* Header Section */}
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h2 style={{ fontSize: '28px', color: 'var(--color-deep-indigo)' }}>
                  Best Kitchens Near You
                </h2>
                <p style={{ fontSize: '14px', color: 'var(--color-text-light)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                  <MapPin size={14} style={{ color: 'var(--color-burnt-orange)' }} /> Delivering to <strong>{activeLocationName}</strong>
                </p>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                {/* Veg Only Toggle Switch */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none' }} onClick={() => setVegOnly(!vegOnly)}>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: vegOnly ? '#24963f' : 'var(--color-text-light)', transition: 'color 0.2s' }}>Veg Only 🌿</span>
                  <div style={{
                    width: '40px',
                    height: '22px',
                    borderRadius: '11px',
                    backgroundColor: vegOnly ? '#24963f' : '#ccc',
                    position: 'relative',
                    transition: 'background-color 0.2s'
                  }}>
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: 'white',
                      position: 'absolute',
                      top: '2px',
                      left: vegOnly ? '20px' : '2px',
                      transition: 'left 0.2s'
                    }} />
                  </div>
                </div>

                <button 
                  onClick={() => setShowLocationModal(true)}
                  className="btn-outline-orange"
                  style={{ padding: '10px 20px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Navigation size={14} /> Change Location
                </button>
              </div>
            </div>

            {/* Category Carousel */}
            <section className="categories-section" style={{ marginBottom: '40px' }}>
              <h3 className="section-title-ordering">Inspiration for your organic meal</h3>
              <div className="categories-slider">
                {categories.map((cat, idx) => (
                  <div 
                    key={idx} 
                    className={`category-card ${selectedCategory === cat.name ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat.name)}
                  >
                    {cat.image ? (
                      <div className="category-img-wrapper">
                        <img src={cat.image} alt={cat.name} className="category-img" />
                      </div>
                    ) : (
                      <div className="category-icon-placeholder">{cat.icon}</div>
                    )}
                    <span className="category-name">{cat.name}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Dishes Search Results (Swiggy/Zomato Style Matcher) */}
            {searchQuery.trim() !== '' && searchDishesResults.length > 0 && (
              <section className="dishes-search-section" style={{ marginBottom: '48px' }}>
                <h3 className="section-title-ordering" style={{ borderBottom: '2px solid var(--color-border)', paddingBottom: '8px', marginBottom: '24px' }}>
                  Dishes Matching <span className="highlight-text">"{searchQuery}"</span>
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
                  {searchDishesResults.filter(dish => !vegOnly || (dish.isVeg !== undefined ? dish.isVeg : dish.veg)).map(dish => {
                    const parentRest = restaurants.find(r => r.id === dish.restaurantId);
                    const distance = parentRest ? getRestaurantDistance(parentRest.id) : '2.5';
                    const isVeg = dish.isVeg !== undefined ? dish.isVeg : dish.veg;
                    
                    return (
                      <div key={dish.id} className="dish-card" style={{ padding: '16px', position: 'relative' }}>
                        <div className="dish-details">
                          <span className={`veg-dot ${isVeg ? 'veg' : 'non-veg'}`} style={{ marginBottom: '6px' }} />
                          <h4 className="dish-name" style={{ fontSize: '16px' }}>{dish.name}</h4>
                          <span className="dish-price" style={{ fontSize: '14px', margin: '4px 0' }}>₹{dish.price}</span>
                          <p className="dish-desc" style={{ fontSize: '12px', margin: '8px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {dish.description}
                          </p>
                          {parentRest && (
                            <div 
                              onClick={() => handleSelectRestaurant(parentRest)}
                              style={{ 
                                fontSize: '11px', 
                                color: 'var(--color-primary)', 
                                fontWeight: 600, 
                                cursor: 'pointer', 
                                marginTop: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              🏪 {parentRest.name} • 📍 {distance} km away
                            </div>
                          )}
                        </div>
                        <div className="dish-img-container" style={{ width: '100px', height: '100px' }}>
                          <img src={getFoodImage(dish.imageName)} alt={dish.name} className="dish-img" />
                          <button className="add-to-cart-btn" onClick={() => addToCart(dish)}>
                            ADD
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Restaurants Grid */}
            <section className="restaurants-section">
              <h3 className="section-title-ordering">
                {searchQuery.trim() !== '' ? `Kitchens matching "${searchQuery}"` : selectedCategory === 'All' ? 'Best Cloud Kitchens' : `${selectedCategory} Kitchens`}
              </h3>
              
              {filteredRestaurants.filter(r => !vegOnly || r.cuisines.toLowerCase().includes('veg') || r.name.toLowerCase().includes('dosa') || r.name.toLowerCase().includes('dakshin') || r.name.toLowerCase().includes('sweet') || r.name.toLowerCase().includes('chaat')).length > 0 ? (
                <div className="restaurants-grid">
                  {filteredRestaurants.filter(r => !vegOnly || r.cuisines.toLowerCase().includes('veg') || r.name.toLowerCase().includes('dosa') || r.name.toLowerCase().includes('dakshin') || r.name.toLowerCase().includes('sweet') || r.name.toLowerCase().includes('chaat')).map(restaurant => {
                    const distance = getRestaurantDistance(restaurant.id);
                    return (
                      <div 
                        key={restaurant.id} 
                        className="restaurant-card"
                        onClick={() => handleSelectRestaurant(restaurant)}
                      >
                        <div className="restaurant-img-container">
                          <img src={getFoodImage(restaurant.imageName)} alt={restaurant.name} className="restaurant-img" />
                          <span className="promo-tag">50% OFF up to ₹100</span>
                          
                          {/* Clue Meter (Distance Tag) */}
                          <span 
                            className="distance-tag"
                            style={{
                              position: 'absolute',
                              top: '12px',
                              left: '12px',
                              backgroundColor: 'rgba(29, 66, 32, 0.9)',
                              color: 'white',
                              padding: '4px 10px',
                              borderRadius: '12px',
                              fontFamily: 'var(--font-ui)',
                              fontSize: '11px',
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              boxShadow: 'var(--shadow-sm)'
                            }}
                          >
                            <MapPin size={12} style={{ marginRight: '3px' }} />
                            {distance} km
                          </span>

                          <span className="delivery-time-tag">
                            <Clock size={12} style={{ marginRight: '3px' }} />
                            {restaurant.deliveryTimeMinutes} mins
                          </span>
                        </div>
                        <div className="restaurant-info">
                          <div className="restaurant-header">
                            <h3 className="restaurant-name">{restaurant.name}</h3>
                            <span className="rating-badge">
                              {restaurant.rating} <Star size={12} fill="white" style={{ marginLeft: '2px' }} />
                            </span>
                          </div>
                          <p className="restaurant-cuisines">{restaurant.cuisines}</p>
                          <div className="restaurant-footer">
                            <span className="restaurant-location">{restaurant.location}</span>
                            <span className="restaurant-price">₹{restaurant.costForTwo} for two</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="no-results">
                  <span className="no-results-emoji">🍜</span>
                  <h3>No Kitchens Found</h3>
                  <p>Try searching for another kitchen, dish or category.</p>
                </div>
              )}
            </section>
          </div>
        )}

        {currentView === 'menu' && (
          /* ================= RESTAURANT MENU VIEW ================= */
          <div className="menu-view container animate-fade-in">
            <button className="btn-back-link" onClick={() => setCurrentView('explore')}>
              <ArrowLeft size={16} /> Back to Kitchens
            </button>

            {selectedRestaurant && (
              <section className="restaurant-banner-card">
                <img src={getFoodImage(selectedRestaurant.imageName)} alt={selectedRestaurant.name} className="banner-bg-img" />
                <div className="banner-overlay" />
                <div className="banner-details">
                  <span className="banner-cuisines">{selectedRestaurant.cuisines}</span>
                  <h2 className="banner-title">{selectedRestaurant.name}</h2>
                  <p className="banner-location">📍 {selectedRestaurant.location} • 🚀 {getRestaurantDistance(selectedRestaurant.id)} km away</p>
                  
                  <div className="banner-meta">
                    <div className="meta-item">
                      <span className="meta-value-rating">
                        {selectedRestaurant.rating} <Star size={14} fill="white" />
                      </span>
                      <span className="meta-label">Ratings</span>
                    </div>
                    <div className="divider-vertical-light" />
                    <div className="meta-item">
                      <span className="meta-value">{selectedRestaurant.deliveryTimeMinutes} mins</span>
                      <span className="meta-label">Delivery Time</span>
                    </div>
                    <div className="divider-vertical-light" />
                    <div className="meta-item">
                      <span className="meta-value">₹{selectedRestaurant.costForTwo}</span>
                      <span className="meta-label">Cost for Two</span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '12px', borderBottom: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: '20px', color: 'var(--color-deep-indigo)' }}>Menu</h3>
              
              {/* Veg Only Toggle Switch in Menu */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none' }} onClick={() => setVegOnly(!vegOnly)}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: vegOnly ? '#24963f' : 'var(--color-text-light)', transition: 'color 0.2s' }}>Veg Only 🌿</span>
                <div style={{
                  width: '40px',
                  height: '22px',
                  borderRadius: '11px',
                  backgroundColor: vegOnly ? '#24963f' : '#ccc',
                  position: 'relative',
                  transition: 'background-color 0.2s'
                }}>
                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    position: 'absolute',
                    top: '2px',
                    left: vegOnly ? '20px' : '2px',
                    transition: 'left 0.2s'
                  }} />
                </div>
              </div>
            </div>

            <div className="menu-layout-grid">
              <aside className="menu-side-nav">
                <h4 className="side-nav-title">Menu Categories</h4>
                <ul className="side-nav-list">
                  {menuCategories.map((cat, idx) => {
                    const hasVegItems = menuItems.some(item => item.category === cat && (!vegOnly || (item.isVeg !== undefined ? item.isVeg : item.veg)));
                    if (!hasVegItems) return null;
                    return (
                      <li key={idx}>
                        <a href={`#category-${idx}`} className="side-nav-link">{cat}</a>
                      </li>
                    );
                  })}
                </ul>
              </aside>

              <div className="menu-dishes-list">
                {menuCategories.map((categoryName, catIdx) => {
                  const categoryDishes = menuItems.filter(item => item.category === categoryName && (!vegOnly || (item.isVeg !== undefined ? item.isVeg : item.veg)));
                  if (categoryDishes.length === 0) return null;
                  
                  return (
                    <div key={catIdx} id={`category-${catIdx}`} className="menu-category-group">
                      <h3 className="menu-category-title">{categoryName}</h3>
                      <div className="dishes-grid">
                        {categoryDishes.map(dish => {
                          const cartItem = cart.find(i => i.id === dish.id);
                          const isVeg = dish.isVeg !== undefined ? dish.isVeg : dish.veg;
                          return (
                            <div key={dish.id} className="dish-card">
                              <div className="dish-details">
                                <div className="dish-veg-tag">
                                  <span className={`veg-dot ${isVeg ? 'veg' : 'non-veg'}`} />
                                  <span className="veg-text">{isVeg ? 'VEG' : 'NON-VEG'}</span>
                                </div>
                                <h4 className="dish-name">{dish.name}</h4>
                                <div className="dish-price-rating">
                                  <span className="dish-price">₹{dish.price}</span>
                                  <span className="dish-rating">
                                    ★ {dish.rating}
                                  </span>
                                </div>
                                <p className="dish-desc">{dish.description}</p>
                              </div>
                              <div className="dish-img-container">
                                <img src={getFoodImage(dish.imageName)} alt={dish.name} className="dish-img" />
                                {cartItem ? (
                                  <div className="quantity-selector-btn">
                                    <button onClick={() => removeFromCart(dish.id)}><Minus size={12} /></button>
                                    <span>{cartItem.quantity}</span>
                                    <button onClick={() => addToCart(dish)}><Plus size={12} /></button>
                                  </div>
                                ) : (
                                  <button className="add-to-cart-btn" onClick={() => addToCart(dish)}>
                                    ADD
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {currentView === 'profile' && (
          /* ================= USER PROFILE VIEW ================= */
          <div className="profile-view container animate-fade-in">
            <h2>My Profile</h2>
            <div className="profile-layout-grid">
              <div className="profile-details-card">
                <div className="profile-avatar">
                  {currentUser ? currentUser.username.charAt(0).toUpperCase() : 'U'}
                </div>
                {currentUser && (
                  <>
                    <h3 className="profile-name">{currentUser.username}</h3>
                    <p className="profile-joined">Member since 2026</p>
                    
                    <div className="profile-info-list">
                      <div className="info-item">
                        <Mail size={16} />
                        <span>{currentUser.email}</span>
                      </div>
                      <div className="info-item">
                        <Phone size={16} />
                        <span>{currentUser.phone || 'No phone number'}</span>
                      </div>
                    </div>

                    <button className="btn-view-orders" onClick={() => setCurrentView('orders')} style={{ width: '100%' }}>
                      View Order History
                    </button>
                    <button 
                      className="btn-outline-orange" 
                      onClick={handleLogout}
                      style={{ 
                        width: '100%', 
                        marginTop: '12px', 
                        borderColor: '#cb202d', 
                        color: '#cb202d',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>

              <div className="profile-edit-section">
                <h3 className="edit-section-title">Manage Delivery Addresses</h3>
                
                {/* Saved Addresses List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                  {addresses.length > 0 ? (
                    addresses.map(addr => (
                      <div 
                        key={addr.id} 
                        style={{ 
                          border: '1px solid var(--color-border)', 
                          borderRadius: '12px', 
                          padding: '16px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          backgroundColor: 'var(--color-pure-white)'
                        }}
                      >
                        <div>
                          <span style={{ 
                            fontSize: '11px', 
                            fontWeight: 700, 
                            textTransform: 'uppercase', 
                            backgroundColor: 'rgba(29, 66, 32, 0.1)', 
                            color: 'var(--color-primary)', 
                            padding: '3px 8px', 
                            borderRadius: '4px',
                            marginRight: '8px'
                          }}>
                            {addr.label}
                          </span>
                          <p style={{ fontSize: '14px', marginTop: '8px', color: 'var(--color-text-light)' }}>
                            {addr.addressLine}
                          </p>
                        </div>
                        <button 
                          onClick={() => handleDeleteAddress(addr.id)}
                          style={{ background: 'transparent', border: 'none', color: '#cb202d', cursor: 'pointer' }}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p style={{ fontSize: '14px', color: 'var(--color-text-light)' }}>No saved addresses. Add one below!</p>
                  )}
                </div>

                {/* Add Address Form */}
                <form onSubmit={handleAddAddress} style={{ borderTop: '1px solid var(--color-border)', paddingTop: '20px' }}>
                  <h4 style={{ marginBottom: '16px', fontFamily: 'var(--font-ui)', textTransform: 'uppercase', fontSize: '14px', color: 'var(--color-deep-indigo)' }}>
                    Add New Address
                  </h4>
                  <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div className="form-group">
                      <label>Label</label>
                      <select 
                        value={newAddressLabel} 
                        onChange={(e) => setNewAddressLabel(e.target.value)}
                        style={{ padding: '10px', borderRadius: '8px', border: '1.5px solid var(--color-border)' }}
                      >
                        <option value="Home">Home</option>
                        <option value="Work">Work</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Address Line</label>
                      <input 
                        type="text" 
                        placeholder="Flat no, building, street, locality..."
                        required 
                        value={newAddressLine}
                        onChange={(e) => setNewAddressLine(e.target.value)}
                        style={{ padding: '10px', borderRadius: '8px', border: '1.5px solid var(--color-border)' }}
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn-save-profile" style={{ padding: '10px 20px' }}>
                    Save Address
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {currentView === 'orders' && (
          /* ================= ORDER HISTORY VIEW ================= */
          <div className="orders-view container animate-fade-in">
            <button className="btn-back-link" onClick={() => setCurrentView('explore')}>
              <ArrowLeft size={16} /> Back to Explorer
            </button>
            <h2 className="orders-title">My Orders</h2>
            
            {userOrders.length > 0 ? (
              <div className="orders-list">
                {userOrders.map(order => (
                  <div key={order.id} className="order-history-card">
                    <div className="order-history-header">
                      <div className="order-id-date">
                        <h4>Order #{order.id}</h4>
                        <span className="order-date">Placed on {new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>
                      <span className={`status-badge-tracking ${order.status.toLowerCase()}`}>
                        {order.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <div className="order-history-body">
                      <p className="order-meta-info">
                        <strong>Delivery Address: </strong> {order.address} <br />
                        <strong>Payment Method: </strong> {order.paymentMethod}
                      </p>
                      
                      <div className="order-actions-row">
                        {order.status !== 'DELIVERED' && order.status !== 'CANCELLED' && (
                          <button 
                            className="btn-track-active"
                            onClick={() => handleTrackOrder(order)}
                          >
                            Track Live Order
                          </button>
                        )}
                        <button 
                          className="btn-reorder"
                          onClick={() => {
                            // Fetch items and re-add to cart
                            fetch(`${API_BASE_URL}/api/orders/${order.id}`)
                              .then(res => res.json())
                              .then(data => {
                                data.items.forEach(item => {
                                  addToCart({ id: item.menuItemId, name: item.name, price: item.price, isVeg: true });
                                });
                                setIsCartOpen(true);
                              });
                          }}
                        >
                          Reorder Items
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <span className="no-results-emoji">📦</span>
                <h3>No Orders Found</h3>
                <p>You haven't placed any orders yet. Try ordering some delicious organic meals!</p>
              </div>
            )}
          </div>
        )}

      </main>

      {/* --- Sliding Cart Drawer (Checkout with Saved Addresses) --- */}
      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <div className="cart-title-wrapper">
                <ShoppingBag size={22} className="text-primary" />
                <h3>My Basket</h3>
              </div>
              <button className="btn-close-drawer" onClick={() => setIsCartOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {paymentStep === 'cart' && (
              cart.length > 0 ? (
                <div className="cart-body">
                  <div className="cart-items-list">
                    {cart.map(item => (
                      <div key={item.id} className="cart-item-row">
                        <div className="cart-item-info">
                          <span className={`veg-dot-small ${item.isVeg ? 'veg' : 'non-veg'}`} />
                          <img src={getFoodImage(item.imageName)} alt={item.name} className="cart-item-img" />
                          <div className="cart-item-details">
                            <span className="cart-item-name">{item.name}</span>
                            <span className="cart-item-price">₹{item.price}</span>
                          </div>
                        </div>
                        <div className="cart-item-actions">
                          <div className="cart-quantity-selector">
                            <button onClick={() => removeFromCart(item.id)}><Minus size={12} /></button>
                            <span>{item.quantity}</span>
                            <button onClick={() => addToCart(item)}><Plus size={12} /></button>
                          </div>
                          <span className="cart-item-total">₹{item.price * item.quantity}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bill-summary">
                    <h4>Bill Details</h4>
                    <div className="bill-row">
                      <span>Item Total</span>
                      <span>₹{getCartSubtotal()}</span>
                    </div>
                    <div className="bill-row">
                      <span>Delivery Partner Fee</span>
                      <span>₹40</span>
                    </div>
                    <div className="bill-row">
                      <span>Govt Taxes & charges</span>
                      <span>₹20</span>
                    </div>
                    <hr className="bill-divider" />
                    <div className="bill-row grand-total">
                      <span>To Pay</span>
                      <span>₹{getCartSubtotal() + 60}</span>
                    </div>
                  </div>

                  {/* Checkout Form with Multiple Saved Address Selectors */}
                  <form className="checkout-form" onSubmit={handleProceedToPayment}>
                    <h4>Delivery Details</h4>
                    <div className="form-group">
                      <label>Contact Name</label>
                      <input 
                        type="text" 
                        placeholder="Enter your name" 
                        required 
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label style={{ marginBottom: '8px' }}>Select Delivery Address</label>
                      
                      {currentUser && addresses.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '12px' }}>
                          {addresses.map(addr => (
                            <div 
                              key={addr.id}
                              onClick={() => {
                                setSelectedAddressId(addr.id);
                                setDeliveryAddress(addr.addressLine);
                              }}
                              style={{
                                border: '1.5px solid',
                                borderColor: selectedAddressId === addr.id ? 'var(--color-primary)' : 'var(--color-border)',
                                borderRadius: '10px',
                                padding: '12px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                backgroundColor: selectedAddressId === addr.id ? 'rgba(29, 66, 32, 0.03)' : 'white',
                                transition: 'all 0.2s'
                              }}
                            >
                              <input 
                                type="radio" 
                                name="delivery-address-selection"
                                checked={selectedAddressId === addr.id}
                                onChange={() => {}}
                                style={{ accentColor: 'var(--color-primary)' }}
                              />
                              <div>
                                <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary)' }}>
                                  {addr.label}
                                </span>
                                <p style={{ fontSize: '13px', color: 'var(--color-text-light)', marginTop: '2px' }}>
                                  {addr.addressLine}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : currentUser ? (
                        <p style={{ fontSize: '13px', color: 'var(--color-text-light)', marginBottom: '8px' }}>
                          No saved addresses. Please add one below.
                        </p>
                      ) : (
                        <p style={{ fontSize: '13px', color: 'var(--color-text-light)', marginBottom: '8px' }}>
                          Please Sign In to select from saved addresses.
                        </p>
                      )}

                      {/* Add New Address Toggle / Form in Checkout */}
                      {currentUser && (
                        <div>
                          {!showNewAddressForm ? (
                            <button 
                              type="button"
                              onClick={() => setShowNewAddressForm(true)}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--color-primary)',
                                fontWeight: 700,
                                fontSize: '12px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              + Add New Address
                            </button>
                          ) : (
                            <div style={{ border: '1px dashed var(--color-border)', padding: '12px', borderRadius: '10px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              <div style={{ display: 'flex', gap: '10px' }}>
                                <select 
                                  value={newAddressLabel} 
                                  onChange={(e) => setNewAddressLabel(e.target.value)}
                                  style={{ padding: '6px', borderRadius: '6px', border: '1px solid var(--color-border)', fontSize: '12px' }}
                                >
                                  <option value="Home">Home</option>
                                  <option value="Work">Work</option>
                                  <option value="Other">Other</option>
                                </select>
                                <button 
                                  type="button" 
                                  className="btn-logout-header" 
                                  onClick={() => setShowNewAddressForm(false)}
                                  style={{ marginLeft: 'auto' }}
                                >
                                  Cancel
                                </button>
                              </div>
                              <textarea 
                                placeholder="Enter flat no, street, locality..."
                                value={newAddressLine}
                                onChange={(e) => setNewAddressLine(e.target.value)}
                                rows="2"
                                style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--color-border)', fontSize: '12px', width: '100%' }}
                              />
                              <button 
                                type="button" 
                                onClick={handleAddAddress}
                                className="btn-filled-indigo" 
                                style={{ padding: '6px 12px', fontSize: '11px', width: 'fit-content' }}
                              >
                                Save Address
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Fallback Custom Address Textarea */}
                      {(!currentUser || !addresses.length) && (
                        <textarea 
                          placeholder="Enter your flat number, building, and street address" 
                          required 
                          rows="3"
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          style={{ marginTop: '8px' }}
                        />
                      )}
                    </div>
                    
                    <div className="safety-badge">
                      <Shield size={16} className="text-success" />
                      <span>100% Safe & Secure Payments (Cash on Delivery / Online)</span>
                    </div>

                    <button type="submit" className="btn-place-order">
                      Proceed to Payment
                    </button>
                  </form>
                </div>
              ) : (
                <div className="cart-empty-state">
                  <span className="empty-cart-emoji">🛒</span>
                  <h3>Your basket is empty</h3>
                  <p>Add delicious meals from your favorite restaurants to fill it up.</p>
                  <button className="btn-filled-indigo" onClick={() => setIsCartOpen(false)}>
                    Browse Restaurants
                  </button>
                </div>
              )
            )}

            {paymentStep === 'pay-select' && (
              <div className="cart-body">
                <button className="btn-back-payment" onClick={() => setPaymentStep('cart')}>
                  <ArrowLeft size={16} /> Back to Cart
                </button>

                <div className="payment-gateway-container">
                  <h3 className="gateway-title">Secure Payment Gateway</h3>
                  <p className="gateway-amount">Amount to Pay: <strong>₹{getCartSubtotal() + 60}</strong></p>
                  
                  {paymentError && (
                    <div className="payment-error-banner">
                      <AlertCircle size={18} />
                      <span>{paymentError}</span>
                    </div>
                  )}

                  <div className="payment-options">
                    <div 
                      className={`payment-option-card ${paymentMethod === 'COD' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('COD')}
                    >
                      <div className="option-header">
                        <Landmark size={20} />
                        <span>Cash on Delivery (COD)</span>
                      </div>
                      <p className="option-desc">Pay in cash or UPI when your food is delivered.</p>
                    </div>

                    <div 
                      className={`payment-option-card ${paymentMethod === 'CARD' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('CARD')}
                    >
                      <div className="option-header">
                        <CreditCard size={20} />
                        <span>Credit or Debit Card</span>
                      </div>
                      {paymentMethod === 'CARD' && (
                        <div className="card-input-fields">
                          <input 
                            type="text" 
                            placeholder="Card Number (16 Digits)" 
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            maxLength="16"
                          />
                          <div className="card-row">
                            <input 
                              type="text" 
                              placeholder="MM/YY" 
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              maxLength="5"
                            />
                            <input 
                              type="password" 
                              placeholder="CVV" 
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              maxLength="3"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div 
                      className={`payment-option-card ${paymentMethod === 'UPI' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('UPI')}
                    >
                      <div className="option-header">
                        <Landmark size={20} />
                        <span>Instant UPI Payment</span>
                      </div>
                      {paymentMethod === 'UPI' && (
                        <div className="upi-input-fields">
                          <input 
                            type="text" 
                            placeholder="Enter UPI ID (e.g. user@okhdfc)" 
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                          />
                          <div className="upi-qr-simulator">
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=cloudrasoi@pay&am=250" alt="UPI QR Code" />
                            <p>Scan to Pay using any UPI App</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <button className="btn-pay-now" onClick={handleExecutePayment}>
                    Pay & Place Order
                  </button>

                  <span className="secured-badge">
                    <Shield size={14} /> Secured by Cloud Rasoi Payment System
                  </span>
                </div>
              </div>
            )}

            {paymentStep === 'processing' && (
              <div className="payment-processing-state">
                <div className="payment-spinner" />
                <h3>Processing Payment</h3>
                <p>Please do not close this window or hit the back button. We are securing your transaction.</p>
              </div>
            )}

            {paymentStep === 'success' && (
              <div className="payment-success-state">
                <div className="success-checkmark-circle" style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#e6f7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={40} className="text-success" />
                </div>
                <h3>Order Placed Successfully!</h3>
                <p>Your order has been received. You can track its live preparation and delivery status.</p>
                <button 
                  className="btn-track-order-success"
                  onClick={() => {
                    setPaymentStep('cart');
                    setIsCartOpen(false);
                  }}
                >
                  Track My Order
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- Location Selector Modal (GPS / Preset) --- */}
      {showLocationModal && (
        <div className="auth-overlay" onClick={() => setShowLocationModal(false)}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()} style={{ width: '420px' }}>
            <div className="auth-header">
              <h3>Select Delivery Location</h3>
              <button className="btn-close-auth" onClick={() => setShowLocationModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <button 
                onClick={handleUseCurrentLocation}
                className="btn-filled-indigo"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px' }}
              >
                <Navigation size={16} /> Use Current Location (GPS)
              </button>

              <div style={{ textAlignment: 'center', fontSize: '12px', color: 'var(--color-text-light)', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
                OR SELECT MANUALLY
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', maxHeight: '200px', overflowY: 'auto' }}>
                {LOCATION_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectLocationPreset(preset)}
                    style={{
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-pure-white)',
                      fontFamily: 'var(--font-ui)',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    📍 {preset.name.split(',')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- User Authentication Modals --- */}
      {authModal && (
        <div className="auth-overlay" onClick={() => setAuthModal(null)}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            <div className="auth-header">
              <h3>{authModal === 'login' ? 'Welcome Back' : 'Create Account'}</h3>
              <button className="btn-close-auth" onClick={() => setAuthModal(null)}>
                <X size={20} />
              </button>
            </div>
            
            {authError && (
              <div className="auth-error-banner" style={{ marginBottom: '16px' }}>
                <AlertCircle size={16} />
                <span>{authError}</span>
              </div>
            )}

            {authModal === 'login' ? (
              <form onSubmit={handleLogin} className="auth-form">
                <div className="input-with-icon">
                  <UserIcon size={16} />
                  <input 
                    type="text" 
                    placeholder="Username" 
                    required 
                    value={authUsername}
                    onChange={(e) => setAuthUsername(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid var(--color-border)' }}
                  />
                </div>
                <div className="input-with-icon">
                  <Lock size={16} />
                  <input 
                    type="password" 
                    placeholder="Password" 
                    required 
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid var(--color-border)' }}
                  />
                </div>
                <button type="submit" className="btn-auth-submit">Sign In</button>
                <p className="auth-toggle-text">
                  Don't have an account? <span onClick={() => { setAuthModal('register'); setAuthError(''); }}>Sign Up</span>
                </p>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="auth-form">
                <div className="input-with-icon">
                  <UserIcon size={16} />
                  <input 
                    type="text" 
                    placeholder="Username" 
                    required 
                    value={authUsername}
                    onChange={(e) => setAuthUsername(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid var(--color-border)' }}
                  />
                </div>
                <div className="input-with-icon">
                  <Lock size={16} />
                  <input 
                    type="password" 
                    placeholder="Password" 
                    required 
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid var(--color-border)' }}
                  />
                </div>
                <div className="input-with-icon">
                  <Mail size={16} />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    required 
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid var(--color-border)' }}
                  />
                </div>
                <div className="input-with-icon">
                  <Phone size={16} />
                  <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    required 
                    value={authPhone}
                    onChange={(e) => setAuthPhone(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid var(--color-border)' }}
                  />
                </div>
                <div className="input-with-icon">
                  <MapPin size={16} />
                  <input 
                    type="text" 
                    placeholder="Default Delivery Address" 
                    required 
                    value={authAddress}
                    onChange={(e) => setAuthAddress(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid var(--color-border)' }}
                  />
                </div>
                <button type="submit" className="btn-auth-submit">Sign Up</button>
                <p className="auth-toggle-text">
                  Already have an account? <span onClick={() => { setAuthModal('login'); setAuthError(''); }}>Sign In</span>
                </p>
              </form>
            )}
          </div>
        </div>
      )}

      {/* --- Live Order Tracking Modal --- */}
      {activeOrder && (
        <div className="order-tracking-overlay">
          <div className="order-tracking-modal">
            <div className="tracking-header">
              <div className="tracking-brand">
                <span style={{ fontSize: '20px' }}>🍲</span>
                <h3>Live Track Order #{activeOrder.id}</h3>
              </div>
              <button className="btn-close-tracking" onClick={() => setActiveOrder(null)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="tracking-body">
              <div className="delivery-animation-box">
                <span className="food-cooking-icon">👩‍🍳</span>
                <p className="tracking-status-text">
                  Status: <strong>{orderStatus.replace(/_/g, ' ')}</strong>
                </p>
              </div>

              <div className="progress-timeline">
                <div className={`timeline-step ${orderStatus === 'PENDING' || orderStatus === 'PREPARING' || orderStatus === 'OUT_FOR_DELIVERY' || orderStatus === 'DELIVERED' ? 'completed' : ''}`}>
                  <span className="step-marker"><Check size={12} /></span>
                  <div className="step-details">
                    <h5>Order Confirmed</h5>
                    <p>Kitchen has accepted your order</p>
                  </div>
                </div>
                <div className={`timeline-step ${orderStatus === 'PREPARING' || orderStatus === 'OUT_FOR_DELIVERY' || orderStatus === 'DELIVERED' ? 'completed' : ''}`}>
                  <span className="step-marker"><Check size={12} /></span>
                  <div className="step-details">
                    <h5>Cooking in Progress</h5>
                    <p>Chef is preparing your fresh organic meal</p>
                  </div>
                </div>
                <div className={`timeline-step ${orderStatus === 'OUT_FOR_DELIVERY' || orderStatus === 'DELIVERED' ? 'completed' : ''}`}>
                  <span className="step-marker"><Check size={12} /></span>
                  <div className="step-details">
                    <h5>Out for Delivery</h5>
                    <p>Delivery rider is heading to your address</p>
                  </div>
                </div>
                <div className={`timeline-step ${orderStatus === 'DELIVERED' ? 'completed' : ''}`}>
                  <span className="step-marker"><Check size={12} /></span>
                  <div className="step-details">
                    <h5>Arrived & Delivered</h5>
                    <p>Enjoy your warm organic food!</p>
                  </div>
                </div>
              </div>

              <div className="order-summary-box">
                <h5>Items Summary</h5>
                <div className="order-items-summary">
                  {orderItemsList.map((item, idx) => (
                    <div key={idx} className="summary-item-row">
                      <span>{item.name} x {item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  <hr className="summary-divider" />
                  <div className="summary-total-row">
                    <span>Total Paid</span>
                    <span>₹{orderItemsList.reduce((acc, i) => acc + (i.price * i.quantity), 0) + 60}</span>
                  </div>
                </div>
              </div>

              <div className="tracking-footer">
                <button className="btn-close-tracking-full" onClick={() => setActiveOrder(null)}>
                  Close Tracker
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Brand Product Info Modal --- */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)}>&times;</button>
            <div className="product-modal-grid">
              <img src={getFoodImage(selectedProduct.imageName)} alt={selectedProduct.name} className="product-modal-img" />
              <div>
                <span className="product-modal-category">{selectedProduct.category}</span>
                <h2 className="modal-title">{selectedProduct.name}</h2>
                <p className="product-modal-subtitle">{selectedProduct.subtitle}</p>
                
                <div className="product-info-section">
                  <h3>Description</h3>
                  <p>{selectedProduct.description}</p>
                </div>
                
                <div className="product-info-section">
                  <h3>Organic Ingredients</h3>
                  <p>{selectedProduct.ingredients || 'Organic raw cashews, water, salt, cultures'}</p>
                </div>

                <div className="product-info-section">
                  <h3>Nutritional Information</h3>
                  <table className="nutrition-table">
                    <tbody>
                      <tr><td>Energy</td><td>{selectedProduct.nutritionEnergy || '310 kcal'}</td></tr>
                      <tr><td>Fats</td><td>{selectedProduct.nutritionFat || '28 g'}</td></tr>
                      <tr><td>Carbohydrates</td><td>{selectedProduct.nutritionCarbs || '12 g'}</td></tr>
                      <tr><td>Proteins</td><td>{selectedProduct.nutritionProtein || '7.5 g'}</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Brand Recipe Detail Modal --- */}
      {selectedRecipe && (
        <div className="modal-overlay" onClick={() => setSelectedRecipe(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedRecipe(null)}>&times;</button>
            <img src={getFoodImage(selectedRecipe.imageName)} alt={selectedRecipe.title} className="modal-hero-img" />
            <div className="recipe-meta">
              <span>⏱️ Cooking Time: {selectedRecipe.timeBadge}</span>
              <span>• Difficulty: {selectedRecipe.difficulty === 1 ? 'Easy' : selectedRecipe.difficulty === 2 ? 'Medium' : 'Hard'}</span>
            </div>
            <h2 className="modal-title">{selectedRecipe.title}</h2>
            
            <div className="recipe-badges-modal">
              {selectedRecipe.badges ? selectedRecipe.badges.split(',').map((badge, idx) => (
                <span key={idx} className="badge-tag">{badge}</span>
              )) : <span className="badge-tag">Organic</span>}
            </div>

            <p className="modal-desc">{selectedRecipe.description}</p>

            <div className="recipe-sections">
              <div className="recipe-ingredients">
                <h3>Ingredients</h3>
                <ul>
                  {selectedRecipe.ingredients ? selectedRecipe.ingredients.split(';').map((ing, idx) => (
                    <li key={idx}>{ing}</li>
                  )) : (
                    <>
                      <li>1 ready-made flatbread</li>
                      <li>4 tbsp Cloud Rasoi Garlic Spread</li>
                      <li>Chopped fresh veggies</li>
                    </>
                  )}
                </ul>
              </div>
              <div className="recipe-instructions">
                <h3>Preparation</h3>
                <ol>
                  {selectedRecipe.instructions ? selectedRecipe.instructions.split(';').map((step, idx) => (
                    <li key={idx}>{step}</li>
                  )) : (
                    <>
                      <li>Spread the cheese base on the flatbread.</li>
                      <li>Arrange the sliced vegetables on top.</li>
                      <li>Bake for 8 minutes at 200°C. Serve warm.</li>
                    </>
                  )}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Footer --- */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h3 className="footer-brand-title">Cloud Rasoi</h3>
              <p className="footer-brand-desc">
                Artisanal, 100% organic, and plant-based kitchen delicacies crafted to bring pure joy to your table.
              </p>
            </div>
            <div className="footer-col">
              <h4>Explore</h4>
              <ul>
                <li onClick={() => setCurrentView('home')}>Home</li>
                <li onClick={() => setCurrentView('explore')}>Order Online</li>
                <li onClick={() => { setCurrentView('home'); window.location.hash = '#about'; }}>Our Story</li>
                <li onClick={() => { setCurrentView('home'); window.location.hash = '#recipes'; }}>Recipes</li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact & FAQ</h4>
              <p>📍 Indiranagar, Bangalore, India</p>
              <p>✉️ hello@cloudrasoi.com</p>
              <p>📞 +91 11 4567 8910</p>
            </div>
          </div>
          <div className="footer-bottom-text">
            © {new Date().getFullYear()} Cloud Rasoi. All Rights Reserved. Made with love for healthy dining.
          </div>
        </div>
      </footer>

    </div>
  );
}
