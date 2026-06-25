import { getCloudinaryUrl } from './lib/cloudinary';
import React, { useState, useEffect, useRef, FormEvent, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Lenis from 'lenis';
import emailjs from '@emailjs/browser';
import VisionMissionSection from './components/VisionMissionSection';
import ProductsPage from './components/ProductsPage';
import { 
  Menu, 
  X, 
  ArrowRight, 
  ArrowLeft,
  ArrowDown, 
  ArrowUp,
  Linkedin, 
  Instagram, 
  Twitter, 
  Dribbble, 
  Github, 
  ExternalLink,
  Users,
  Briefcase,
  Monitor,
  Layout,
  PenTool,
  Search,
  Zap,
  Layers,
  FileText,
  Play,
  Smartphone,
  Globe,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  Plus,
  Minus,
  Send,
  Clapperboard,
  Clock,
  Video,
  MessageCircle,
  MessageSquare,
  Cpu,
  Settings,
  ShieldCheck,
  Package,
  Warehouse,
  Truck,
  MapPin,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

// --- Global Components ---

const CustomCursor = () => {
  const followerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number>();

  useEffect(() => {
    // Check if the device supports touch, if so, skip cursor functionality
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const follower = followerRef.current;
    if (!follower) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const lerpFactor = 0.2; // Faster lerp for more reactivity
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * lerpFactor;
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * lerpFactor;

      // GPU-accelerated transform
      follower.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0)`;

      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <div 
      id="cursor-follower" 
      ref={followerRef} 
      className="fixed w-5 h-5 bg-black/10 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      style={{ willChange: 'transform' }}
    ></div>
  );
};

const Navbar = ({ toggleMenu }: { toggleMenu: () => void }) => {
  const location = useLocation();

  return (
    <nav 
      className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4 flex items-center justify-between bg-white/90 backdrop-blur-md border-b border-[var(--primary-blue)]/10"
    >
      <Link to="/" className="flex items-center gap-2">
        <img 
          src={getCloudinaryUrl('logo44.png')} 
          alt="Prime Crop Icon" 
          className="hidden md:block h-8 w-auto object-contain" 
        />
        <img 
          src={getCloudinaryUrl('logo44.png')} 
          alt="Prime Crop Icon" 
          className="md:hidden h-8 w-auto object-contain" 
        />
      </Link>
      
      <div className="hidden lg:flex items-center gap-8 text-[13px] font-medium text-gray-600">
        <Link to="/" className={`hover:text-black transition-colors ${location.pathname === '/' ? 'text-black' : ''}`}>Home</Link>
        <Link to="/about" className={`hover:text-black transition-colors ${location.pathname === '/about' ? 'text-black' : ''}`}>About</Link>
        
        <Link to="/products" className={`hover:text-black transition-colors ${location.pathname === '/products' ? 'text-black' : ''}`}>Products</Link>

        <Link to="/contacts" className={`hover:text-black transition-colors ${location.pathname === '/contacts' ? 'text-black' : ''}`}>Contact</Link>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleMenu}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Menu size={20} />
        </button>
        <a 
          href="https://wa.me/255724164726?text=Hello%20Prime%20Crop%2C%20I%20would%20like%20to%20order" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hidden md:flex bg-[#bded04] text-[#085b20] px-5 py-2 rounded-full text-[13px] font-bold hover:bg-[#a5d003] transition-all items-center gap-2"
        >
          <MessageCircle size={14} />
          Order via WhatsApp
        </a>
      </div>

      {/* Menu Overlay */}
    </nav>
  );
};

const MenuOverlay = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-[60] bg-white p-6 flex flex-col md:flex-row overflow-y-auto"
        >
          <Link to="/" onClick={onClose} className="absolute top-6 left-6 flex items-center gap-2">
            <img 
              src={getCloudinaryUrl('logo44.png')} 
              alt="Prime Crop Icon" 
              className="h-8 w-auto object-contain" 
            />
          </Link>
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>

          <div className="flex-none flex flex-col justify-center items-center md:items-start md:pl-20">
            {/* Removed image as requested */}
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pt-10 md:pt-0">
            <div>
              <h3 className="text-gray-400 text-xs md:text-sm uppercase tracking-widest mb-4 md:mb-6">Menu</h3>
              <ul className="space-y-3 md:space-y-4 text-xl md:text-2xl font-medium">
                <li><Link to="/" onClick={onClose} className="hover:text-gray-500 transition-colors">Home</Link></li>
                <li><Link to="/about" onClick={onClose} className="hover:text-gray-500 transition-colors">About</Link></li>
                <li><Link to="/products" onClick={onClose} className="hover:text-gray-500 transition-colors">Products</Link></li>
                <li><Link to="/contacts" onClick={onClose} className="hover:text-gray-500 transition-colors">Contact</Link></li>
              </ul>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const MainFooter = () => {
  return (
    <footer className="bg-[#0b3815] pt-24 pb-10 px-6 text-[#fdfcf8]">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
          <div>
            <h4 className="font-bold text-[14px] uppercase tracking-widest mb-6 text-white">Company</h4>
            <ul className="space-y-4 text-[14px] font-medium text-white/70">
              <li><Link to="/about" className="hover:text-[#bded04] transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-[#bded04] transition-colors">Export Services</Link></li>
              <li><Link to="/projects" className="hover:text-[#bded04] transition-colors">Our Quality</Link></li>
              <li><Link to="#contact" className="hover:text-[#bded04] transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-[#bded04] transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[14px] uppercase tracking-widest mb-6 text-white">Crops</h4>
            <ul className="space-y-4 text-[14px] font-medium text-white/70">
              <li>White & Yellow Maize</li>
              <li>Tanzanian Sesame</li>
              <li>Dry Beans</li>
              <li>Sorghum</li>
              <li>Raw Cashews</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[14px] uppercase tracking-widest mb-6 text-white">Contact</h4>
            <ul className="space-y-4 text-[14px] font-medium text-white/70">
              <li>+255 746 336 541</li>
              <li>info@primecropltd.com</li>
              <li>www.primecropltd.com</li>
              <li className="mt-6 pt-4 border-t border-white/10 text-white/50 text-[13px]">Dar es Salaam<br />Tanzania</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[14px] uppercase tracking-widest mb-6 text-white">Follow us</h4>
            <div className="flex flex-wrap gap-3">
              {[
                { Icon: Linkedin, url: "#" },
                { Icon: Instagram, url: "#" },
                { Icon: Twitter, url: "#" },
                { Icon: MessageCircle, url: "https://wa.me/255724164726?text=Hello%20Prime%20Crop%2C%20I%20would%20like%20to%20order" }
              ].map(({ Icon, url }, i) => (
                <a 
                  key={i} 
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#bded04] hover:border-[#bded04] hover:text-[#0b3815] transition-all cursor-pointer text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row gap-8 justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[24px] tracking-tight text-white flex gap-2 items-center">
               <span className="w-8 h-8 rounded-full bg-[#bded04] flex items-center justify-center text-[#0b3815]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
               </span>
               PRIME CROP LTD.
            </span>
          </div>
          <div className="flex items-center gap-8 text-[11px] text-white/50">
            <span>© {new Date().getFullYear()} Prime Crop LTD. All rights reserved.</span>
            <Link to="/contacts" className="hover:text-white transition-colors flex items-center gap-2">
              <div className="w-1 h-1 bg-[#bded04] rounded-full"></div> Privacy Policy
            </Link>
          </div>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 bg-[#bded04] text-[#0b3815] rounded-full flex items-center justify-center hover:bg-[#a5d003] transition-all"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

// --- Shared Components ---

const HeroBackground = ({ src, alt }: { src: string, alt: string }) => {
  return (
    <>
      <img 
        src={src} 
        alt={alt} 
        className="absolute inset-0 w-full h-full object-cover opacity-100"
        loading="eager"
      />
      <div className="absolute inset-0 bg-[#085b20]/50"></div>
    </>
  );
};

const ProjectDetailPage = () => {
  const { id } = useParams();
  
  const projectData: Record<string, any> = {
        "01": { title: "Fibre Works", desc: "On-site fibre cable inspection and pulling operations, carefully handling and routing fibre reels to ensure signal integrity during installation.", client: "[Client Name]", date: "2024", cat: "Telecom Services", assoc: "Eco-Engineering Solutions Ltd", loc: "Kanisani Road, Dar es Salaam", images: [getCloudinaryUrl('v1777413775/fu11.png'), getCloudinaryUrl('fu2.png')] },
    "02": { title: "Solar Energy Storage Installation", desc: "Installation of Freedom Won Lite LiFePO4 battery banks paired with Victron inverters and charge controllers, delivering a complete off-grid solar energy storage solution.", client: "[Client Name]", date: "2024", cat: "Power & Electrical Services", assoc: "Eco-Engineering Solutions Ltd", loc: "Dar es Salaam", images: [getCloudinaryUrl('v1777413780/fu13.webp'), getCloudinaryUrl('v1777413780/fu13.webp')] },
    "03": { title: "Overhead Pole Cable Intallation", desc: "Skilled technician climbing a utility pole to perform overhead cable installation, extending network connectivity to new areas of the city.", client: "[Client Name]", date: "2024", cat: "Telecom Services", assoc: "Eco-Engineering Solutions Ltd", loc: "Dar es Salaam", images: [getCloudinaryUrl('v1777413784/fu1.png'), getCloudinaryUrl('fu3.png')] },
    "04": { title: "CT-Scan Repair", desc: "Diagnosis and full repair of a CT-Scan unit, restoring critical imaging capability at a regional hospital.", client: "Regional Hospital", date: "2024", cat: "Biomedical Equipment Services", assoc: "Eco-Engineering Solutions Ltd", loc: "Dodoma", images: [getCloudinaryUrl('v1777413783/fu12.jpg'), getCloudinaryUrl('lab5.jpg')] },
    "05": { title: "Telecom Tower Deployment", desc: "Installation and commissioning of telecom towers to extend mobile and data network coverage across Tanzania.", client: "[Client Name]", date: "2024", cat: "Telecom Services", assoc: "Eco-Engineering Solutions Ltd", loc: "Tanzania", images: [getCloudinaryUrl('v1777413784/fu15.jpg'), getCloudinaryUrl('v1777413784/fu15.jpg')] },
    "06": { title: "Telecom Equipment Room Setup", desc: "Full rack installation and structured cabling of a telecom equipment room, integrating switches, routers, and patch panels for reliable network operation.", client: "[Client Name]", date: "2024", cat: "ICT Solutions", assoc: "Eco-Engineering Solutions Ltd", loc: "Tanzania", images: [getCloudinaryUrl('v1777413783/fu14.webp'), getCloudinaryUrl('v1777413783/fu14.webp')] },
    "07": { title: "Power Supply Unit Repair", desc: "Component-level diagnosis and repair of a power supply board, replacing faulty inductors and capacitors to restore full functionality.", client: "[Client Name]", date: "2024", cat: "Power & Electrical Services", assoc: "Eco-Engineering Solutions Ltd", loc: "Dar es Salaam", images: [getCloudinaryUrl('v1777413689/BACKUP1.jpg'), getCloudinaryUrl('v1777413689/BACKUP1.jpg')] },
    "08": { title: "E-waste Management", desc: "Responsible collection and processing of end-of-life electronic components and circuit boards, reducing environmental hazards through proper e-waste disposal and recycling.", client: "[Client Name]", date: "2024", cat: "Environmental Solutions", assoc: "Eco-Engineering Solutions Ltd", loc: "Tanzania", images: [getCloudinaryUrl('v1777413690/e1.jpg'), getCloudinaryUrl('v1777413690/e1.jpg')] }
  };
  
  const project = projectData[id as string] || projectData["01"];

  return (
    <div className="pb-16 bg-white text-[var(--primary-blue)]">
      {/* Project Hero */}
      <section className="px-6 md:px-12 mb-20 bg-[var(--primary-blue)] text-white pt-32 pb-20" data-aos="fade-up">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-medium leading-tight mb-8">{project.title}</h1>
          <p className="text-white/70 mb-4">{project.loc}</p>
          <div className="flex gap-4">
            <span className="px-4 py-2 border rounded-full text-sm">{project.cat}</span>
          </div>
        </div>
      </section>

      {/* Project Information & Image Section */}
      <section className="px-6 md:px-12 mb-24" data-aos="fade-up" data-aos-delay="200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl font-bold mb-8">Project Information</h2>
            <p className="text-gray-600 mb-12 leading-relaxed">
              {project.desc}
            </p>

            <div className="space-y-6">
              {[
                { label: "Client", value: project.client },
                { label: "Date", value: project.date },
                { label: "Categories", value: project.cat },
                { label: "Associate", value: project.assoc }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-4 border-b border-gray-100" data-aos="fade-up" data-aos-delay={300 + (i * 100)}>
                  <div>
                    <div className="font-bold">{item.label}</div>
                    <div className="text-gray-600">{item.value}</div>
                  </div>
                  <div className="text-[var(--primary-orange)]"><div className="w-6 h-6 bg-[var(--primary-orange)] rounded flex items-center justify-center text-white font-bold">✓</div></div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative" data-aos="fade-left" data-aos-delay="400">
            <div className="grid grid-cols-1 gap-6">
                <div className="aspect-video bg-gray-200 rounded-3xl overflow-hidden"><img src={project.images[0]} className="w-full h-full object-cover" loading="lazy" /></div>
                <div className="aspect-video bg-gray-200 rounded-3xl overflow-hidden"><img src={project.images[1]} className="w-full h-full object-cover" loading="lazy" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* Client voices & Gallery placeholder for consistency */}
      {/* (Other sections remain unchanged for now) */}
    </div>
  );
};


// --- Home Page Components ---

const HomeHero = () => {
  return (
    <section className="pt-32 md:pt-52 pb-16 md:pb-24 px-6 text-center relative overflow-hidden" data-aos="fade-up">
      <HeroBackground src={getCloudinaryUrl('hero3.webp')} alt="Home background" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex justify-center mb-8 md:mb-12">
        </div>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-[84px] font-medium tracking-tight mb-6 leading-[1.1] text-white"
        >
          Connecting Tanzania's Harvest to the World
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/70 text-sm md:text-base max-w-2xl mx-auto mb-10 font-normal"
        >
          PRIME CROP LTD is a premier Tanzanian exporter of agricultural commodities, connecting local farmers to global markets with integrity, quality, and transparency.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <a 
            href="https://wa.me/255724164726?text=Hello%20Prime%20Crop%2C%20I%20would%20like%20to%20order" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-[#bded04] text-[#085b20] px-8 py-3 rounded-full text-sm font-bold hover:bg-[#a5d003] transition-all flex items-center gap-2 mx-auto w-fit shadow-lg shadow-[#bded04]/20"
          >
            <MessageCircle size={18} /> Order via WhatsApp
          </a>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 flex justify-center"
        >
          <div className="w-10 h-10 rounded-full bg-white text-[var(--primary-blue)] flex items-center justify-center">
            <ArrowDown size={16} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Ticker = () => {
  return (
    <div className="ticker-wrap w-full overflow-hidden bg-[#085b20] py-6 border-y border-white/10" data-aos="fade-up">
      <div className="ticker flex whitespace-nowrap animate-[ticker_10s_linear_infinite] md:animate-[ticker_20s_linear_infinite]">
        {[1, 2, 3, 4].map((_, i) => (
          <div key={i} className="flex">
            <div className="px-12 text-lg font-medium uppercase tracking-wider text-white">/ FARM SOURCING / QUALITY PROCESSING / SECURE PACKAGING / GLOBAL EXPORT / SUSTAINABLE AGRICULTURE / TANZANIA /</div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

const WhoWeAre = () => {
  return (
    <section className="who-we-are-section" data-aos="fade-up">
      <div className="max-w-7xl mx-auto who-we-are-card" data-aos="fade-up" data-aos-delay="100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="who-we-are-label">
              <div className="w-1.5 h-1.5 bg-[#bded04] rounded-full"></div>
              <span className="text-white/80">Who we are</span>
            </div>
            <div className="relative rounded-[1.5rem] overflow-hidden aspect-video bg-gray-800 group cursor-pointer">
              <img src="/mkulima.jpeg" alt="Prime Crop" className="relative z-10 w-full h-full object-cover" />
              <div className="absolute inset-0 z-20 bg-black/10 group-hover:bg-black/20 transition-all"></div>
              <div className="absolute bottom-4 left-6 z-20 text-white text-sm font-medium">
                Prime Crop Ltd
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mb-6 md:mb-8 text-white max-w-xl">Tanzania's Premier Agricultural Export Partner</h2>
            <p className="text-white/70 text-[15px] leading-relaxed mb-6 font-normal">
              PRIME CROP LTD is a premier Tanzanian commodity exporter. We specialize in sourcing, grading, processing, and shipping premium agricultural commodities to international food processors, distributors, and buyers.
            </p>
            <p className="text-white/70 text-[15px] leading-relaxed mb-10 font-normal">
              By combining modern grading facilities with direct farmer relationships, we ensure every shipment meets strict international standards.
            </p>
            <Link to="/about" className="bg-[#bded04] text-[#085b20] px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#a5d003] transition-all flex items-center gap-2 w-fit">
              Our Story <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </div>
      <style>{`
        .who-we-are-section {
          background: #ffffff;
          padding: 64px 16px;
        }
        @media (min-width: 768px) {
          .who-we-are-section {
            padding: 96px 24px;
          }
        }
        .who-we-are-card {
          background: #085b20;
          border-radius: 1.5rem;
          padding: 32px;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        }
        @media (min-width: 768px) {
          .who-we-are-card {
            border-radius: 2.5rem;
            padding: 64px;
          }
        }
        .who-we-are-label {
          font-size: 13px;
          font-weight: 400;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 24px;
        }
        .who-we-are-heading {
          font-size: 28px;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 32px;
        }
      `}</style>
    </section>
  );
};

const FeaturedWorks = () => {
  const [activeCategory, setActiveCategory] = useState('Grains');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = ['Grains', 'Nuts & Seeds', 'Pulses', 'Animal Feed'];

  const allProducts = [
    // Grains
    {
      id: "01",
      name: "Millet",
      category: "Grains",
      image: new URL('./public/millet.jpeg', import.meta.url).href,
      specs: "Grade A",
      purity: "Low Moisture"
    },
    {
      id: "02",
      name: "White cotton",
      category: "Grains",
      image: new URL('./public/cotton.jpeg', import.meta.url).href,
      specs: "Grade A / Animal Feed",
      purity: "Max 12% Moisture"
    },
    {
      id: "03",
      name: "Sorghum",
      category: "Grains",
      image: new URL('./public/sorghum.jpeg', import.meta.url).href,
      specs: "Premium Quality",
      purity: "High Protein"
    },
    // Nuts & Seeds
    {
      id: "04",
      name: "Sesame Seeds",
      category: "Nuts & Seeds",
      image: new URL('./public/sesame seeds.jpeg', import.meta.url).href,
      specs: "Min 50% Oil Content",
      purity: "99.5% Purity"
    },
    {
      id: "05",
      name: "Raw Cashew Nuts",
      category: "Nuts & Seeds",
      image: new URL('./public/cashew nuts.jpeg', import.meta.url).href,
      specs: "48-52 lbs Out-turn",
      purity: "Max 8% Moisture"
    },
    {
      id: "06",
      name: "Groundnuts (Peanuts)",
      category: "Nuts & Seeds",
      image: new URL('./public/ground nuts.jpeg', import.meta.url).href,
      specs: "Export Grade",
      purity: "Aflatoxin Safe"
    },
    // Pulses
    {
      id: "07",
      name: "Soya Beans",
      category: "Pulses",
      image: new URL('./public/soya beans.jpeg', import.meta.url).href,
      specs: "Non-GMO",
      purity: "Max 12% Moisture"
    },
    {
      id: "08",
      name: "Yellow Beans",
      category: "Pulses",
      image: new URL('./public/yellow beans.jpeg', import.meta.url).href,
      specs: "Large Size",
      purity: "99% Purity"
    },
    {
      id: "09",
      name: "Pigeon Peas",
      category: "Pulses",
      image: new URL('./public/pigeon peas.jpeg', import.meta.url).href,
      specs: "Premium Grade",
      purity: "Clean Sorted"
    },
    // Animal Feed
    {
      id: "10",
      name: "Rice Bran",
      category: "Animal Feed",
      image: new URL('./public/Rice bran.jpeg', import.meta.url).href,
      specs: "13-15% Protein",
      purity: "18-22% Fat"
    },
    {
      id: "11",
      name: "White Maize",
      category: "Animal Feed",
      image: new URL('./public/white maize.jpeg', import.meta.url).href,
      specs: "High Protein Content",
      purity: "Ideal for Livestock"
    },
    {
      id: "12",
      name: "Sunflower meal",
      category: "Animal Feed",
      image: new URL('./public/sunflower meal.jpeg', import.meta.url).href,
      specs: "Rich in Fiber",
      purity: "Nutrient Dense"
    }
  ];

  const filteredProducts = allProducts.filter(p => p.category === activeCategory);

  return (
    <section className="bg-[#eef8eb] py-24 px-6 md:px-12" data-aos="fade-up">
      <div className="max-w-[1400px] mx-auto">
        {/* Header and Filter Buttons */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-10 mb-16">
          <div className="max-w-xl">
            <h2 className="text-[20px] md:text-3xl lg:text-[36px] font-medium leading-[1.2] text-[#1a3819]">
              Discover Our Premium<br />Agricultural Commodities
            </h2>
          </div>
          
          <div className="relative">
            {/* Desktop Filter (Existing Buttons) */}
            <div className="hidden md:flex flex-nowrap gap-3 justify-end">
              {categories.map((cat, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-[15px] transition-all duration-300 border font-medium ${
                    activeCategory === cat 
                      ? 'bg-[#c5f03d] border-[#c5f03d] text-[#1a3819]' 
                      : 'bg-transparent border-[#1a3819]/20 text-[#1a3819] hover:border-[#1a3819]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Mobile Filter (Dropdown) */}
            <div className="md:hidden relative w-full">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex justify-between items-center bg-[#f2efe3] p-4 rounded-2xl font-medium text-[#1a3819]"
              >
                {activeCategory}
                {isDropdownOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {isDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="w-full mt-2 bg-[#f2efe3] rounded-2xl p-4"
                >
                  {categories.map((cat, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveCategory(cat);
                        setIsDropdownOpen(false);
                      }}
                      className={`block w-full text-left py-2 px-2 rounded-xl transition-colors ${
                        activeCategory === cat ? "bg-[#c5f03d] text-[#1a3819]" : "hover:bg-white/50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Product Horizontal Scroll */}
        <div className="flex gap-6 mb-16 overflow-x-auto pb-6 snap-x snap-mandatory no-scrollbar">
          {filteredProducts.map((product, i) => (
            <div 
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="min-w-[300px] sm:min-w-[350px] bg-[#fdfcf8] rounded-[32px] p-3 shadow-sm hover:shadow-md transition-shadow duration-300 group cursor-pointer border border-black/5 snap-start"
            >
              <div className="relative rounded-[24px] overflow-hidden aspect-[4/5] bg-[#E8E8E8] mb-4">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                
                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-[#426C4E] text-white px-4 py-2 rounded-full text-[13px] font-medium leading-none flex items-center justify-center">Premium Grade</span>
                  <span className="bg-[#f2efe3] text-[#2D2D2D] px-4 py-2 rounded-full text-[13px] font-medium leading-none flex items-center justify-center">Tanzania</span>
                </div>


              </div>

              <div className="px-3 pb-3 pt-1">
                <div className="text-[13px] tracking-widest text-[#7a7a7a] uppercase font-medium mb-1.5">
                  {product.category}
                </div>
                <h3 className="text-[28px] leading-none font-bold tracking-tight text-[#0b3815]">
                  {product.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div className="flex justify-center mt-12">
          <Link to="/products" className="bg-[#bded04] text-[#085b20] px-10 py-4 rounded-full font-bold text-[15px] hover:bg-[#a5d003] transition-all shadow-lg shadow-[#bded04]/20">
            See More Product
          </Link>
        </div>
      </div>
    </section>
  );
};

const HowWeBuildSolutions = () => {
  return (
    <section className="py-24 px-6 bg-[#eef8eb] overflow-visible" data-aos="fade-up">
      <div className="max-w-[1400px] mx-auto md:px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="text-[13px] font-medium tracking-widest uppercase text-[#7a7a7a] mb-4">Process</div>
          <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight mb-4 text-[#0b3815]">How we build solutions</h2>
          <p className="text-[#4a4a4a] text-[15px] sm:text-[17px]">From cooperative to port, each step matters.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-12 lg:space-y-24 order-2 lg:order-1">
            <div className="text-center lg:text-right" data-aos="fade-right" data-aos-delay="100">
              <div className="inline-flex items-center justify-center w-[60px] h-[60px] bg-white rounded-2xl mb-5 text-[#085b20] shadow-sm border border-black/5">
                <Briefcase size={28} strokeWidth={1.5} className="mt-[-2px]" />
              </div>
              <h3 className="text-[18px] font-bold text-[#0b3815] mb-3 tracking-tight leading-[1.3]">Ethical Sourcing From<br/>Cooperatives</h3>
              <p className="text-[#7a7a7a] text-[14px] font-medium leading-relaxed">Direct partnerships with farmer cooperatives<br className="hidden lg:block"/>across Tanzania.</p>
            </div>
            
            <div className="text-center lg:text-right" data-aos="fade-right" data-aos-delay="200">
              <div className="inline-flex items-center justify-center w-[60px] h-[60px] bg-white rounded-2xl mb-5 text-[#085b20] shadow-sm border border-black/5">
                <Warehouse size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-[18px] font-bold text-[#0b3815] mb-3 tracking-tight leading-[1.3]">Sieving And Grading In<br/>Warehouse</h3>
              <p className="text-[#7a7a7a] text-[14px] font-medium leading-relaxed">Rigorous quality control meets international<br className="hidden lg:block"/>B2B standards.</p>
            </div>
          </div>

          {/* Center Column - Image */}
          <div className="relative aspect-square md:aspect-[4/3] lg:aspect-[4/5] rounded-[32px] overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow border border-black/5 order-1 lg:order-2 mb-8 lg:mb-0" data-aos="zoom-in" data-aos-delay="300">
            <img src="/about.jpeg" alt="About Prime Crop" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>

          {/* Right Column */}
          <div className="space-y-12 lg:space-y-24 order-3">
            <div className="text-center lg:text-left" data-aos="fade-left" data-aos-delay="400">
              <div className="inline-flex items-center justify-center w-[60px] h-[60px] bg-white rounded-2xl mb-5 text-[#085b20] shadow-sm border border-black/5">
                <Package size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-[18px] font-bold text-[#0b3815] mb-3 tracking-tight leading-[1.3]">Secure Packaging In<br/>Fifty Kilogram Bags</h3>
              <p className="text-[#7a7a7a] text-[14px] font-medium leading-relaxed">Food-grade materials protect crops during<br className="hidden lg:block"/>transit.</p>
            </div>
            
            <div className="text-center lg:text-left" data-aos="fade-left" data-aos-delay="500">
              <div className="inline-flex items-center justify-center w-[60px] h-[60px] bg-white rounded-2xl mb-5 text-[#085b20] shadow-sm border border-black/5">
                <Truck size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-[18px] font-bold text-[#0b3815] mb-3 tracking-tight leading-[1.3]">Port Logistics And<br/>Export Shipping</h3>
              <p className="text-[#7a7a7a] text-[14px] font-medium leading-relaxed">Dar es Salaam port handles worldwide<br className="hidden lg:block"/>distribution.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      text: "ECO-ENGINEERING SOLUTIONS LTD transformed our telecom infrastructure. Their team was proactive, detail-oriented, and genuinely invested in our network's stability. A top-tier engineering firm we'd happily recommend.",
      name: "Eng. Joseph M.",
      role: "Technical Director",
      image: "https://i.pravatar.cc/100?u=joseph"
    },
    {
      text: "They delivered a robust power solution for our factory that exceeded expectations. They communicated clearly, stayed flexible, and delivered on time. Our operations are now more efficient than ever.",
      name: "Tayler S.",
      role: "Operations Manager",
      image: "https://i.pravatar.cc/100?u=tayler"
    },
    {
      text: "An incredibly talented engineering team, thoughtful, collaborative, and laser-focused on creating excellent technical solutions.",
      name: "Rei C.",
      role: "Project Lead",
      image: "https://i.pravatar.cc/100?u=rei"
    }
  ];

  return (
    <section className="py-16 md:py-24 px-6 bg-[var(--primary-blue)]/5" data-aos="fade-up">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-8 md:mb-12" data-aos="fade-up">
          <div className="w-1.5 h-1.5 bg-[var(--primary-orange)] rounded-full"></div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--primary-blue)]/60">Testimonials</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-sm" data-aos="fade-up" data-aos-delay={i * 100}>
              <p className="text-[var(--primary-blue)]/70 text-sm md:text-[15px] leading-relaxed mb-6 md:mb-8 font-normal">
                {t.text}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary-blue)]/10 overflow-hidden"><img src={t.image} className="w-full h-full object-cover" /></div>
                  <div>
                    <h4 className="font-medium text-sm text-[var(--primary-blue)]">{t.name}</h4>
                    <p className="text-[11px] text-[var(--primary-blue)]/50">{t.role}</p>
                  </div>
                </div>
                <Linkedin size={16} className="text-[var(--primary-blue)]/20" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-8">
          <div className="flex-1 h-1 bg-[var(--primary-blue)]/10 rounded-full overflow-hidden">
            <div className="w-1/3 h-full bg-[var(--primary-blue)]"></div>
          </div>
          <div className="flex gap-3 md:gap-4">
            <button className="w-10 h-10 rounded-full border border-[var(--primary-blue)]/10 flex items-center justify-center hover:bg-[var(--primary-blue)] hover:text-white transition-all text-[var(--primary-blue)]"><ChevronLeft size={16} /></button>
            <button className="w-10 h-10 rounded-full border border-[var(--primary-blue)]/10 flex items-center justify-center hover:bg-[var(--primary-blue)] hover:text-white transition-all text-[var(--primary-blue)]"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </section>
  );
};


const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();

    if (!form.current) return;
    setStatus('sending');

    const serviceId = (import.meta as any).env.VITE_EMAILJS_SERVICE_ID;
    const templateId = (import.meta as any).env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = (import.meta as any).env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS configuration missing');
      setStatus('error');
      return;
    }

    emailjs
      .sendForm(
        serviceId,
        templateId,
        form.current,
        publicKey
      )
      .then(
        () => {
          setStatus('success');
          form.current?.reset();
        },
        (error) => {
          console.error('EmailJS error:', error);
          setStatus('error');
        }
      );
  };

  return (
    <section id="contact" className="py-24 px-6 bg-white" data-aos="fade-up">
      <div className="max-w-[1100px] mx-auto bg-[#0b3815] rounded-[2rem] md:rounded-[32px] p-8 md:p-16 text-white shadow-xl shadow-[#0b3815]/10" data-aos="fade-up" data-aos-delay="100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          <div>
            <div className="text-[13px] font-medium tracking-widest uppercase text-[#bded04]/80 mb-4">Contact</div>
            <h2 className="text-[24px] md:text-[32px] font-bold tracking-tight mb-6 leading-[1.2]">
              Let's partner for your next export.
            </h2>
            <p className="text-white/70 text-[15px] sm:text-[17px] leading-relaxed mb-8 max-w-md">
              Whether you need a single container or an ongoing supply chain, Prime Crop LTD delivers quality Tanzania crops directly to you.
            </p>
            <div className="space-y-4 text-sm text-white/70">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-[#bded04]">
                     <MapPin size={18} />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Headquarters</div>
                    <div>Dar es Salaam, Tanzania</div>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-[#bded04]">
                     <Mail size={18} />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Email Us</div>
                    <div>info@primecropltd.com</div>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-[#bded04]">
                     <Phone size={18} />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Call Us</div>
                    <div>+255 746 336 541</div>
                  </div>
               </div>
            </div>
          </div>
          
          <div>
            <div className="mb-8 md:mb-10">
              <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-2 text-white">Ready to take the next step?</h3>
            </div>
            <form ref={form} onSubmit={sendEmail} className="space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div><label className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2 block">Name</label><input type="text" name="user_name" placeholder="John Doe" className="w-full border-b border-white/20 py-3 text-sm outline-none focus:border-[#bded04] transition-all bg-transparent text-white placeholder:text-white/20" required /></div>
                <div><label className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2 block">Company</label><input type="text" name="user_company" placeholder="Acme Logistics" className="w-full border-b border-white/20 py-3 text-sm outline-none focus:border-[#bded04] transition-all bg-transparent text-white placeholder:text-white/20" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div><label className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2 block">Your Email</label><input type="email" name="user_email" placeholder="john@acme.com" className="w-full border-b border-white/20 py-3 text-sm outline-none focus:border-[#bded04] transition-all bg-transparent text-white placeholder:text-white/20" required /></div>
                <div><label className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2 block">Your Phone</label><input type="text" name="user_phone" placeholder="+255 xxxxxxx" className="w-full border-b border-white/20 py-3 text-sm outline-none focus:border-[#bded04] transition-all bg-transparent text-white placeholder:text-white/20" /></div>
              </div>
              
              <div>
                <label className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-4 md:mb-5 block">What crops are you interested in?</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
                  {["Sesame", "Maize", "Cashews", "Beans", "Pulses", "Other"].map((tag, i) => (
                    <label key={i} className="cursor-pointer">
                      <input type="checkbox" name="services" value={tag} className="sr-only peer" />
                      <span className="block text-center px-4 py-2.5 rounded-full border border-white/20 text-[12px] font-medium transition-all peer-checked:bg-[#bded04] peer-checked:border-[#bded04] peer-checked:text-[#0b3815] hover:border-[#bded04] hover:text-[#bded04] bg-transparent text-white">{tag}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-4 md:mb-5 block">Estimated Volume</label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
                  {["1-5x 20ft", "5-10x 20ft", "10-20x 20ft", "20+ 20ft"].map((vol, i) => (
                      <label key={i} className="flex-1 cursor-pointer">
                        <input type="radio" name="timeline" value={vol} className="sr-only peer" />
                        <div className="text-center py-2.5 px-1 rounded-full border border-white/20 text-[12px] font-medium transition-all peer-checked:bg-[#bded04] peer-checked:border-[#bded04] peer-checked:text-[#0b3815] hover:border-[#bded04] hover:text-[#bded04] bg-transparent text-white">{vol}</div>
                      </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-3 block">Tell us about your requirements.</label>
                <textarea name="message" placeholder="Write something concise..." rows={4} className="w-full border-b border-white/20 py-3 text-sm outline-none focus:border-[#bded04] transition-all bg-transparent text-white placeholder:text-white/20" required></textarea>
              </div>

              <button type="submit" disabled={status === 'sending'} className="bg-[#bded04] text-[#085b20] w-full py-4 rounded-full font-bold text-base hover:bg-[#a5d003] transition-all disabled:opacity-50">
                {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Submit Request'}
              </button>
              {status === 'error' && <p className="text-red-400 text-sm">Failed to send message. Please try again.</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Services Page Components ---

const ServicesHero = () => {
  return (
    <section className="pt-40 md:pt-60 pb-24 md:pb-40 px-6 text-center relative overflow-hidden" data-aos="fade-up">
      <HeroBackground src={getCloudinaryUrl('ugu.webp')} alt="Services background" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-8 md:mb-12"
        >
          <div className="w-1.5 h-1.5 bg-[var(--primary-orange)] rounded-full"></div>
          <span className="text-[12px] md:text-[13px] font-medium text-white uppercase tracking-widest">Services</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl sm:text-6xl md:text-[100px] font-medium tracking-tight mb-8 md:mb-12 leading-[1.1] md:leading-[0.95] text-white"
        >
          Explore Our Services
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-white/70 text-base md:text-xl max-w-xl mx-auto mb-12 md:mb-16 font-normal"
        >
          Five engineering domains. One trusted partner.
        </motion.p>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center"
        >
          <div className="w-12 h-12 bg-[var(--primary-orange)] rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
            <ArrowDown size={20} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const CoreOfferings = () => {
  const offerings = [
    { 
      id: "01", 
      title: "Telecom Services", 
      desc: "Installation and maintenance of microwave, fiber optic and GSM/WCDMA networks." 
    },
    { 
      id: "02", 
      title: "ICT Solutions", 
      desc: "CCTV, access control, structured cabling and enterprise wireless." 
    },
    { 
      id: "03", 
      title: "Power & Electrical", 
      desc: "Generators, solar systems, LV/MV lines and electrical design." 
    },
    { 
      id: "04", 
      title: "Environmental Solutions", 
      desc: "E-waste collection, electronic recycling and battery disposal programs." 
    },
    { 
      id: "05", 
      title: "Biomedical Equipment", 
      desc: "Medical equipment installation, maintenance and repair for healthcare facilities." 
    },
    { 
      id: "06", 
      title: "Software Development", 
      desc: "Custom web, mobile, and enterprise software built to automate and scale your business operations." 
    },
    { 
      id: "07", 
      title: "Electronics", 
      desc: "Circuit design, embedded systems, and electronic component integration, plus repair services and responsible e-waste management for industrial and commercial use." 
    },
  ];

  return (
    <section className="py-16 md:py-24 px-6 bg-[#f4f5f9] overflow-hidden" data-aos="fade-up">
      <div className="max-w-7xl mx-auto bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 shadow-sm" data-aos="fade-up" data-aos-delay="100">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 md:mb-16">
          <div className="text-[12px] md:text-[13px] text-[#333] font-normal uppercase tracking-widest mb-4 md:mb-0">
            • Our Services
          </div>
          <h2 className="text-[20px] md:text-[28px] font-bold leading-[1.3] max-w-[520px] text-black">Our Core Engineering Services</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {offerings.map((item, i) => (
            <div key={item.id} className="card-container h-[220px] md:h-[240px]" data-aos="fade-up" data-aos-delay={i * 50}>
              <div className="card h-full w-full">
                {/* Front Side */}
                <div className="front bg-[var(--primary-blue)]/5 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 flex flex-col justify-between shadow-sm">
                  <span className="text-xs md:text-sm font-medium text-[var(--primary-blue)]/40">{item.id}</span>
                  <h3 className="text-lg md:text-xl font-bold text-[var(--primary-blue)]">{item.title}</h3>
                </div>
                {/* Back Side */}
                <div className="back bg-[var(--primary-blue)] rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 flex flex-col justify-between text-white shadow-xl">
                  <h3 className="text-lg md:text-xl font-bold">{item.title}</h3>
                  <div className="flex flex-col items-start gap-3 md:gap-4">
                    <p className="text-[11px] md:text-[12px] text-white/70 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .card-container {
          perspective: 1000px;
        }
        .card {
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          width: 100%;
          height: 100%;
        }
        .card-container:hover .card {
          transform: rotateY(180deg);
        }
        .front, .back {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          width: 100%;
          height: 100%;
        }
        .back {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
};

const LogoTicker = () => {
  const images = [getCloudinaryUrl('1.png'), getCloudinaryUrl('2.png'), getCloudinaryUrl('3.png'), getCloudinaryUrl('4.png'), getCloudinaryUrl('5.png'), getCloudinaryUrl('6.png'), getCloudinaryUrl('7.png'), getCloudinaryUrl('8.png')];

  return (
    <section className="py-20 bg-white overflow-hidden" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h2 className="text-xl md:text-2xl font-medium text-[var(--primary-blue)] text-center">Trusted By Our Partners & Clients</h2>
      </div>
      <div className="flex overflow-hidden">
        <motion.div 
          className="flex gap-16 min-w-full"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {[...images, ...images].map((img, i) => (
            <div key={i} className="flex-none flex items-center justify-center">
              <img src={img} alt="Partner Logo" className="h-12 md:h-16 w-auto opacity-70 hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const FeaturedProjectsCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const projects = [
    {
      id: "01",
      title: "Fiber Works",
      year: "2024",
      tags: ["Telecom", "Infra"],
      image: getCloudinaryUrl('fu11.png')
    },
    {
      id: "02",
      title: "Solar Energy Storage Installation",
      year: "2024",
      tags: ["Power", "Renewable"],
      image: getCloudinaryUrl('fu13.webp')
    },
    {
      id: "03",
      title: "Overhead Pole Cable Installation",
      year: "2024",
      tags: ["Telecom", "Splicing"],
      image: getCloudinaryUrl('fu1.png')
    },
    {
      id: "04",
      title: "CT-Scan Repair & Maintenance",
      year: "2023",
      tags: ["Biomedical", "Repair"],
      image: getCloudinaryUrl('fu12.jpg')
    },
    {
      id: "05",
      title: "Telecom Tower Deployment",
      year: "2024",
      tags: ["Telecom", "Infrastructure"],
      image: getCloudinaryUrl('fu15.jpg')
    },
    {
      id: "06",
      title: "Telecom Equipment Room Setup",
      year: "2024",
      tags: ["Telecom", "ICT"],
      image: getCloudinaryUrl('fu14.webp')
    }
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(progress);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 px-6 bg-[var(--primary-blue)] overflow-hidden" data-aos="fade-up">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 md:mb-16" data-aos="fade-up">
          <div className="text-[12px] md:text-[14px] text-[var(--primary-orange)] font-normal uppercase tracking-widest mb-4 md:mb-0">
            • Our Works
          </div>
          <h2 className="text-[20px] md:text-[54px] font-medium leading-[1.1] max-w-2xl md:text-right text-white">Check Our Featured Projects</h2>
        </div>

        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 md:gap-10 overflow-x-auto no-scrollbar pb-12 snap-x snap-mandatory"
        >
          {projects.map((project, i) => (
            <div key={i} className="min-w-[85vw] md:min-w-[800px] snap-start" data-aos="fade-up" data-aos-delay={i * 100}>
            <div className="rounded-[2rem] md:rounded-[3rem] overflow-hidden aspect-[16/10] bg-[#f5f5f5] p-6 md:p-12 mb-6 md:mb-8 group cursor-pointer shadow-xl border border-gray-200/50">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover rounded-2xl md:rounded-[2rem] group-hover:scale-105 transition-transform duration-700 shadow-2xl" loading="lazy" />
              </div>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-6 px-2">
                <h3 className="text-2xl md:text-[36px] font-medium text-white">
                  {project.title} <span className="text-[var(--primary-blue)]/30">- {project.year}</span>
                </h3>
                <div className="flex flex-wrap gap-2 md:justify-end max-w-full md:max-w-[320px]">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-4 md:px-6 py-2 md:py-2.5 rounded-lg border border-[var(--primary-blue)]/10 bg-white text-[11px] md:text-[13px] font-medium text-[var(--primary-blue)]/70 shadow-sm">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Scrollbar and Navigation */}
        <div className="flex items-center justify-between gap-12 mt-16">
          <div className="flex-1 h-[4px] bg-[var(--primary-blue)]/20 relative rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-[var(--primary-orange)] transition-all duration-300 ease-out"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
          
          <div className="flex gap-4">
            <button onClick={() => scroll('left')} className="w-16 h-16 rounded-full bg-[var(--primary-blue)]/20 flex items-center justify-center hover:bg-[var(--primary-orange)] hover:text-white transition-all text-white">
              <ArrowLeft size={24} />
            </button>
            <button onClick={() => scroll('right')} className="w-16 h-16 rounded-full bg-[var(--primary-blue)]/20 flex items-center justify-center hover:bg-[var(--primary-orange)] hover:text-white transition-all text-white">
              <ArrowRight size={24} />
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-24">
          <Link to="/projects" className="bg-[var(--primary-orange)] text-white px-12 py-4 rounded-full font-medium text-sm hover:bg-[var(--primary-orange)]/90 transition-all shadow-lg">
            All projects
          </Link>
        </div>
      </div>
    </section>
  );
};

const TrustStrip = () => {
  const items = [
    "✔ Quality Workmanship",
    "✔ End-to-End Project Delivery",
    "✔ Certified Engineers",
    "✔ On-Time Completion"
  ];

  return (
    <section className="py-12 md:py-16 px-4 md:px-6 bg-white overflow-hidden border-t border-[var(--primary-blue)]/10" data-aos="fade-up">
      <div className="max-w-7xl mx-auto">
        <div className="ticker-wrap w-full overflow-hidden">
          <div className="ticker flex whitespace-nowrap animate-[ticker_30s_linear_infinite]">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center">
                {items.map((item, j) => (
                  <div key={j} className="px-8 md:px-12 text-lg md:text-xl font-medium text-[var(--primary-blue)]/60 flex items-center gap-2">
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ExpertiseSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-[var(--primary-blue)]/5 overflow-hidden" data-aos="fade-up">
      <div className="max-w-7xl mx-auto bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 shadow-sm relative" data-aos="fade-up" data-aos-delay="100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 text-[13px] text-[var(--primary-orange)] font-medium uppercase tracking-widest mb-8 md:mb-12">
              <span className="text-[var(--primary-orange)]">•</span> Experise
            </div>
            <h2 className="text-[20px] sm:text-4xl md:text-[52px] font-medium leading-[1.1] mb-8 md:mb-10 text-[var(--primary-blue)] max-w-xl">We solve real engineering problems</h2>
            <p className="text-[var(--primary-blue)]/60 text-base md:text-lg leading-relaxed mb-8 md:mb-12 max-w-lg font-normal">
              From fiber optic networks to biomedical equipment — we deliver complete engineering solutions across Tanzania.
            </p>
            <Link to="/contacts" className="bg-[var(--primary-orange)] text-white px-8 py-3.5 rounded-full font-medium text-sm hover:bg-[var(--primary-orange)]/90 transition-all flex items-center gap-2 w-fit">
              Contact Us
            </Link>
          </div>
          <div className="relative">
            <div className="rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden aspect-video bg-[var(--primary-blue)]/5 shadow-2xl">
              <img src={getCloudinaryUrl('f14.png')} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl max-w-[280px] text-center">
                  <h4 className="text-lg font-medium mb-2 text-[var(--primary-blue)]">Project Excellence</h4>
                  <div className="w-full h-1 bg-[var(--primary-blue)]/10 rounded-full overflow-hidden mt-4">
                    <div className="w-full h-full bg-[var(--primary-orange)]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  const stats = [
    { id: "01", value: "5", label: "Engineering Service Domains" },
    { id: "02", value: "24/7", label: "Technical Support Available" },
    { id: "03", value: "100%", label: "Commitment To Quality" },
    { id: "04", value: "3+", label: "Service Locations Tanzania" },
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-[var(--primary-blue)] overflow-hidden" data-aos="fade-up">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20" data-aos="fade-up">
          <div>
            <div className="flex items-center gap-2 text-[13px] text-[var(--primary-orange)] font-medium uppercase tracking-widest mb-8 md:mb-12">
              <span className="text-[var(--primary-orange)]">•</span> What makes us different?
            </div>
            <h2 className="text-[20px] sm:text-4xl md:text-[64px] font-medium leading-[1] mb-8 md:mb-10 text-white">EES Ltd At A Glance</h2>
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8 md:mb-12 max-w-md font-normal">
              Engineering is more than just technical specs—it's about delivering reliable solutions that power progress.
            </p>
            <Link to="/contacts" className="bg-[var(--primary-orange)] text-white px-8 py-3.5 rounded-full font-medium text-sm hover:bg-[var(--primary-orange)]/90 transition-all flex items-center gap-2 w-fit">
              Contact Us
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-[2rem] p-8 md:p-10 flex flex-col justify-between h-auto min-h-[220px] md:h-[240px] shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-sm font-medium text-[var(--primary-orange)] self-end">{stat.id}</span>
                <div>
                  <div className="text-4xl md:text-[48px] font-medium leading-none mb-4 tracking-tight text-[var(--primary-blue)]">{stat.value}</div>
                  <div className="text-[var(--primary-blue)]/60 font-medium text-sm">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const SCRAMBLE_CHARS = "0123456789+%";

interface ScrambleRevealProps {
    text: string;
    duration?: number;
}

const ScrambleReveal = ({
    text = "",
    duration = 1.8,
}: ScrambleRevealProps) => {
    const [display, setDisplay] = useState(() =>
        text.split("").map((c) => (c === " " ? " " : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]))
    );
    const containerRef = useRef<HTMLSpanElement>(null);
    const hasRun = useRef(false);
    const rafRef = useRef(0);

    const scramble = useCallback(() => {
        const letters = text.split("");
        const totalMs = duration * 1000;
        const start = performance.now();

        const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / totalMs, 1);
            const resolvedCount = Math.floor(progress * letters.length);

            setDisplay(
                letters.map((c, i) => {
                    if (c === " ") return " ";
                    if (i < resolvedCount) return c;
                    return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
                })
            );

            if (progress < 1) {
                rafRef.current = requestAnimationFrame(tick);
            } else {
                setDisplay(letters);
            }
        };

        rafRef.current = requestAnimationFrame(tick);
    }, [text, duration]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasRun.current) {
                    hasRun.current = true;
                    scramble();
                }
            },
            { threshold: 0.3 }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => {
            observer.disconnect();
            cancelAnimationFrame(rafRef.current);
        };
    }, [scramble]);

    return (
        <span
            ref={containerRef}
            className="inline-block"
            style={{ fontVariantNumeric: "tabular-nums" }}
        >
            {display.map((char, i) => (
                <span
                    key={i}
                    style={{
                        color: char === text[i] ? "inherit" : "#085b2060",
                        transition: "color 0.1s",
                        display: "inline-block",
                        minWidth: char === " " ? "0.4em" : undefined,
                    }}
                >
                    {char}
                </span>
            ))}
        </span>
    );
};

const ImpactNumbers = () => {
  return (
    <section className="py-24 px-6 bg-[#085b20] overflow-hidden" data-aos="fade-up">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-stretch">
        {/* Left Content */}
        <div data-aos="fade-right" className="flex flex-col h-full">
          <div className="mb-10">
            <div className="text-[13px] font-medium tracking-widest uppercase text-[#bded04] mb-4">Impact</div>
            <h2 className="text-[20px] md:text-3xl lg:text-[36px] font-medium leading-[1.2] mb-4 text-white">
              Numbers that matter in agriculture
            </h2>
            <p className="text-white/80 text-[15px] sm:text-[17px] leading-relaxed">
              Prime Crop LTD moves volume with precision. Our commitment to quality never wavers from farm to export.
            </p>
          </div>
          
          <div className="flex-1 w-full relative min-h-[350px]">
            <img 
              src={new URL('./public/new.jpeg', import.meta.url).href} 
              alt="Maize crops" 
              className="absolute inset-0 w-full h-full object-cover rounded-[32px] shadow-sm border border-black/5"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="flex flex-col gap-6 h-full pt-0 md:pt-[34px]" data-aos="fade-left">
          {/* Stat Card 1 */}
          <div className="bg-white p-8 md:p-10 rounded-[32px] border border-black/5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between flex-1 min-h-[200px]">
            <div className="text-[48px] md:text-[56px] font-bold text-[#085b20] leading-none tracking-tight">
              <ScrambleReveal text="5+" duration={1.5} />
            </div>
            <div className="mt-8">
              <h3 className="text-[16px] md:text-[18px] font-bold text-[#0b3815] mb-2 tracking-tight">Crop categories</h3>
              <p className="text-[#7a7a7a] text-[14px] font-medium">Sesame, cashews, beans, and maize.</p>
            </div>
          </div>
          
          {/* Stat Card 2 */}
          <div className="bg-white p-8 md:p-10 rounded-[32px] border border-black/5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between flex-1 min-h-[200px]">
            <div className="text-[48px] md:text-[56px] font-bold text-[#085b20] leading-none tracking-tight">
              <ScrambleReveal text="100%" duration={1.2} />
            </div>
            <div className="mt-8">
              <h3 className="text-[16px] md:text-[18px] font-bold text-[#0b3815] mb-2 tracking-tight">Quality inspected</h3>
              <p className="text-[#7a7a7a] text-[14px] font-medium">Every batch tested before shipment.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: "What crops does Prime Crop LTD export?", a: "We primarily export high-quality sesame, cashews, beans, and maize sourced directly from Tanzanian farmer cooperatives." },
    { q: "Are your crops quality tested?", a: "Yes, 100% of our batches undergo rigorous quality inspection and grading before shipment to meet international standards." },
    { q: "Where does Prime Crop LTD operate?", a: "We operate across Tanzania, partnering with various cooperatives, and we distribute globally through the Dar es Salaam port." },
    { q: "How do you package your exports?", a: "We use secure, food-grade fifty-kilogram bags to ensure our crops are fully protected during transit." },
    { q: "Do you supply for both human consumption and animal feed?", a: "Yes, depending on the crop and grading, we provide products suitable for both human consumption and animal feed uses." },
    { q: "How can I request a quote or order?", a: "You can contact our sales team through our Contact form, email, or direct phone. We will respond promptly with pricing and availability." }
  ];

  return (
    <section className="py-24 px-6 bg-[#fafaf9] overflow-hidden" data-aos="fade-up">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-[13px] font-medium tracking-widest uppercase text-[#7a7a7a] mb-4">
          FAQ
        </div>
        <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight mb-12 md:mb-16 text-[#0b3815] leading-[1.1]">Frequently Asked Questions</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-4 lg:gap-y-0">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-black/10 py-6" data-aos="fade-up" data-aos-delay={i * 50}>
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between text-left group"
              >
                <span className="text-[16px] md:text-[18px] font-bold tracking-tight group-hover:text-[#085b20] transition-colors text-[#1a1a1a] pr-4">{faq.q}</span>
                <div className="w-10 h-10 shrink-0 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-[#bded04] group-hover:border-[#bded04] group-hover:text-[#085b20] transition-all text-[#1a1a1a]">
                  {openIndex === i ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-[#4a4a4a] text-[15px] leading-relaxed mt-4 font-medium max-w-md">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-[var(--primary-blue)]/5 overflow-hidden" data-aos="fade-up">
      <div className="max-w-7xl mx-auto bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 shadow-sm" data-aos="fade-up" data-aos-delay="100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 text-[13px] text-[var(--primary-orange)] font-medium uppercase tracking-widest mb-8 md:mb-12">
              <span className="text-[var(--primary-orange)]">•</span> Interested?
            </div>
            <h2 className="text-[20px] sm:text-4xl md:text-[64px] font-medium leading-[1] mb-8 md:mb-10 text-[var(--primary-blue)]">Let's build the future together!</h2>
          </div>
          <div>
            <p className="text-[var(--primary-blue)]/60 text-lg md:text-xl leading-relaxed mb-8 md:mb-12 font-normal">
              Contact us today and our engineers will assess your requirements and deliver the right solution for your project.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contacts" className="bg-[var(--primary-orange)] text-white px-6 md:px-8 py-3 md:py-3.5 rounded-full font-medium text-sm hover:bg-[var(--primary-orange)]/90 transition-all flex items-center gap-2">
                Request a Quote
              </Link>
              <Link to="/contacts" className="bg-white text-[var(--primary-blue)] border border-[var(--primary-blue)]/10 px-6 md:px-8 py-3 md:py-3.5 rounded-full font-medium text-sm hover:bg-[var(--primary-blue)]/5 transition-all flex items-center gap-2">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Projects Page Components ---

// --- About Page Components ---

const AboutHero = () => {
  return (
    <section className="pt-32 md:pt-52 pb-16 md:pb-24 px-6 text-center relative overflow-hidden" data-aos="fade-up">
      <HeroBackground src={getCloudinaryUrl('Ubuntu-Towers-jpg-webp.webp')} alt="About background" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-[84px] font-medium tracking-tight mb-6 leading-[1.1] text-white"
          >
            We are Tanzania's trusted agricultural partner
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center gap-8"
          >
            <div className="w-12 h-12 rounded-full bg-[#bded04] flex items-center justify-center text-[#0b3815] font-bold cursor-pointer hover:scale-110 transition-transform">
              <ArrowDown size={20} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const WhoWeAreAbout = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-white overflow-hidden" data-aos="fade-up">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 md:mb-20 gap-8 md:gap-12" data-aos="fade-up">
          <div className="flex items-center gap-2 text-[14px] text-[var(--primary-orange)] font-normal uppercase tracking-widest">
            • Who we are
          </div>
          <h2 className="text-lg sm:text-xl md:text-[22px] font-medium leading-relaxed max-w-3xl text-[var(--primary-blue)]">
            ECO-ENGINEERING SOLUTIONS LTD is a dynamic firm specializing in providing comprehensive Environmental, Electrical, Telecom and ICT solutions. We have rapidly grown into a trusted partner for a diverse range of clients.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* CEO & Founder Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[var(--primary-blue)]/5 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-sm group"
            data-aos="fade-up"
          >
            <div className="rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden aspect-[4/5] mb-6 md:mb-8 bg-gray-100">
              <img src={getCloudinaryUrl('ceo.png')} alt="CEO & Founder" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm md:text-2xl font-medium text-[var(--primary-blue)] mb-1">Eng. Kalebo Nashon Mashinga</h3>
                <p className="text-[var(--primary-blue)]/50 text-sm">CEO & Founder</p>
              </div>
              <a href="#" className="hidden md:flex w-10 h-10 rounded-full bg-[var(--primary-blue)] items-center justify-center text-white hover:scale-110 transition-transform">
                <Linkedin size={18} />
              </a>
            </div>
          </motion.div>

          {/* CEO Message Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[var(--primary-blue)]/5 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-sm flex flex-col justify-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="flex items-center gap-2 text-[14px] text-[var(--primary-orange)] font-normal uppercase tracking-widest mb-8">
              • CEO Message
            </div>
            <p className="text-xl md:text-[26px] font-medium leading-relaxed text-[var(--primary-blue)] italic">
              "ECO-ENGINEERING SOLUTIONS LTD is a dynamic firm specializing in providing comprehensive Environmental, Electrical, Telecom and ICT solutions. We have rapidly grown into a trusted partner for a diverse range of clients."
            </p>
            <div className="mt-12 pt-8 border-t border-[var(--primary-blue)]/10">
              <p className="text-[var(--primary-blue)] font-bold text-lg">CEO & Founder</p>
              <p className="text-[var(--primary-blue)]/50 text-sm">ECO-ENGINEERING SOLUTIONS LTD</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const AboutStudio = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-white overflow-hidden" data-aos="fade-up">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[var(--primary-blue)]/5 rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center" data-aos="fade-up" data-aos-delay="100">
          <div>
            <h2 className="text-xl sm:text-4xl md:text-[42px] font-medium leading-[1.2] mb-8 md:mb-10 text-[var(--primary-blue)] max-w-xl" data-aos="fade-up" data-aos-delay="50">We are Tanzania's premier engineering solutions firm</h2>
            <p className="text-[var(--primary-blue)]/60 text-base md:text-lg leading-relaxed mb-8 md:mb-12 font-normal">
              ECO-ENGINEERING SOLUTIONS LTD is a dynamic firm specializing in providing comprehensive Environmental, Electrical, Telecom and ICT solutions. Our commitment to excellence, reliability, and technological expertise ensures cutting-edge solutions that empower businesses and communities alike.
            </p>
            <Link to="/contacts" className="bg-[var(--primary-orange)] text-white px-8 md:px-10 py-3.5 md:py-4 rounded-full font-medium text-sm hover:bg-[var(--primary-orange)]/90 transition-all flex items-center gap-2 w-fit">
              Contact Us <ArrowRight size={18} />
            </Link>
          </div>
          <div className="rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden aspect-video bg-[var(--primary-blue)] relative group">
            <video 
              src={getCloudinaryUrl('0411.mp4', true)} 
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const OurExportProcess = () => {
  const steps = [
    { id: "01", title: "Sustainable Sourcing", desc: "Collaborating directly with local farms to source high-quality produce sustainably." },
    { id: "02", title: "Quality Control", desc: "Rigorous inspection and grading standards to meet global requirements." },
    { id: "03", title: "Packaging", desc: "Eco-friendly and secure packaging to maintain freshness and integrity." },
    { id: "04", title: "Global Shipping", desc: "Efficient logistics network to ensure timely delivery to global markets." }
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-[#085b20] overflow-hidden" data-aos="fade-up">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 md:mb-20 gap-8 md:gap-12" data-aos="fade-up">
          <div className="flex items-center gap-2 text-[14px] text-[#bded04] font-normal uppercase tracking-widest">
            • Our Export Process
          </div>
          <h2 className="text-xl sm:text-2xl md:text-[32px] font-medium leading-tight max-w-xl text-white">
            From local farms directly to the global market.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-[2rem] p-8 flex flex-col justify-between h-auto min-h-[280px] shadow-sm"
              data-aos="fade-up"
              data-aos-delay={i * 50}
            >
              <h3 className="text-lg font-bold text-[#0b3815] mb-4">{step.title}</h3>
              <div>
                <div className="w-full h-px bg-[#0b3815]/10 mb-6"></div>
                <div className="flex justify-between items-end">
                  <p className="text-[12px] text-[#0b3815]/60 leading-relaxed max-w-[140px]">{step.desc}</p>
                  <span className="text-sm font-medium text-[#bded04]">{step.id}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const OurExportCommitment = () => {
  const standards = [
    { title: "ISO Certified", desc: "Global standards for Quality Management Systems." },
    { title: "GAP Compliant", desc: "Adhering to strict Good Agricultural Practices." },
    { title: "Fair Trade", desc: "Empowering our local farming network fairly." },
    { title: "Organic Ready", desc: "Prioritizing natural farming techniques." }
  ];

  return (
    <section className="py-20 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Side */}
          <div data-aos="fade-right">
             <div className="text-[13px] font-semibold text-[#085b20] uppercase tracking-widest mb-4">
              • Global Benchmarks
            </div>
            <h2 className="text-[32px] md:text-[48px] font-bold text-[#0b3815] leading-[1.1] mb-8">
              Commitment to Quality & Sustainability
            </h2>
            <p className="text-[#0b3815]/70 text-lg leading-relaxed mb-8">
              Our farmers ensure that every step of the journey — from seed prep to final export — adheres strictly to international agricultural standards, guaranteeing freshness, safety, and fairness.
            </p>
            <div className="border-t border-[#0b3815]/20 pt-8 mt-8">
                <p className="font-semibold text-[#0b3815]">We export to:</p>
                <p className="text-[#0b3815]/60">EU, Asia-Pacific, North America</p>
            </div>
          </div>

          {/* Right Side */}
          <div className="grid sm:grid-cols-2 gap-6">
            {standards.map((s, i) => (
              <div key={i} className="bg-[#0b3815] p-8 rounded-3xl" data-aos="fade-up" data-aos-delay={i * 100}>
                <h3 className="text-[#bded04] font-bold text-xl mb-3">{s.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const OurMission = () => {
  const values = [
    { id: "01", title: "Expertise", desc: "Our team of skilled Artisans, Technicians and Engineers brings extensive experience in electrical engineering, Telecoms and ICT solutions." },
    { id: "02", title: "Quality Assurance", desc: "We adhere to industry standards and best practices, ensuring high-quality service delivery." },
    { id: "03", title: "Customer Satisfaction", desc: "Our commitment to customer satisfaction drives us to exceed expectations and build long-term relationships." },
    { id: "04", title: "Innovation", desc: "We stay updated with the latest technological advancements to provide cutting-edge solutions." }
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-white overflow-hidden" data-aos="fade-up">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 md:mb-32 gap-8 md:gap-12" data-aos="fade-up">
          <div className="flex items-center gap-2 text-[14px] text-[var(--primary-orange)] font-normal uppercase tracking-widest">
            • Our Mission
          </div>
          <h2 className="text-[20px] sm:text-3xl md:text-4xl font-medium leading-tight max-w-2xl text-left md:text-right text-[var(--primary-blue)]">
            To deliver engineering solutions that enhance connectivity, efficiency and safety.
          </h2>
        </div>

        <div className="bg-[var(--primary-blue)]/5 rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
            <div>
              <h2 className="text-[20px] sm:text-3xl md:text-[54px] font-medium leading-[1.1] mb-8 md:mb-10 text-[var(--primary-blue)]">Our values and commitments</h2>
            </div>
            <div className="space-y-12 md:space-y-16">
              {values.map((value, i) => (
                <div key={i} className="flex gap-8" data-aos="fade-up" data-aos-delay={i * 100}>
                  <span className="text-sm font-medium text-[var(--primary-orange)] mt-1">{value.id}</span>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--primary-blue)] mb-4">{value.title}</h3>
                    <p className="text-[var(--primary-blue)]/60 text-[15px] leading-relaxed font-normal">
                      {value.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const LeadershipAndFarmingNetwork = () => {
  const teamPhotos = [
    "/f1.png",
    "/f2.png",
    "/f3.png",
    "/f4.png",
    "/lab4.jpeg",
    "/lab5.jpg",
    "/lab6.jpg",
    "/lab7.jpg"
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-[#fdfcf8] overflow-hidden" data-aos="fade-up">
      <div className="max-w-7xl mx-auto bg-[#0b3815] rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 text-center relative shadow-sm border border-[#085b20]/10" data-aos="fade-up" data-aos-delay="100">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
          {teamPhotos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="absolute w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden border-[3px] border-[#085b20] shadow-lg"
              style={{
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
                zIndex: 0
              }}
            >
              <img src={photo} alt="Team" className="w-full h-full object-cover grayscale brightness-110" />
            </motion.div>
          ))}
        </div>
        
        <div className="relative z-10">
          <h2 className="text-[20px] sm:text-4xl md:text-[64px] font-medium leading-[1.1] mb-6 md:mb-8 text-white">Leadership & Farming Network</h2>
          <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto mb-8 md:mb-12 font-normal">
            United leadership and local farming communities committed to global export standards.
          </p>
          <Link to="/about" className="bg-[#bded04] text-[#0b3815] px-10 py-4 rounded-full font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 mx-auto w-fit">
            Our Network <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

const JoinOurTeam = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-white overflow-hidden" data-aos="fade-up">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#0b3815]/5 rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center" data-aos="fade-up" data-aos-delay="100">
          <div>
            <div className="flex items-center gap-2 text-[14px] text-[#085b20] font-semibold uppercase tracking-widest mb-8 md:mb-12">
              • Careers
            </div>
            <h2 className="text-[20px] sm:text-4xl md:text-[64px] font-medium leading-[1.1] mb-6 md:mb-8 text-[#0b3815]">Join Our Team</h2>
            <p className="text-[#0b3815]/70 text-base md:text-lg leading-relaxed mb-8 md:mb-12 font-normal">
              We are always looking for skilled engineers and technicians to join our growing team in Dar es Salaam, Tanzania.
            </p>
            <Link to="/contacts" className="bg-[#bded04] text-[#0b3815] px-8 md:px-10 py-3.5 md:py-4 rounded-full font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 w-fit">
              See Job Openings <ArrowRight size={18} />
            </Link>
          </div>
          <div className="rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden aspect-square bg-[#0b3815] relative group shadow-2xl">
            <img src={getCloudinaryUrl('f13.jpeg')} alt="Careers" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="w-full h-full border border-white/20 rounded-[2rem] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-[#0b3815] mx-auto mb-6 shadow-xl">
                    <Briefcase size={32} />
                  </div>
                  <span className="text-white font-medium tracking-widest uppercase text-xs">Join eloqwnt</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectsHero = () => {
  return (
    <section className="pt-32 md:pt-48 pb-16 md:pb-24 px-4 md:px-6 text-center relative overflow-hidden" data-aos="fade-up">
      <HeroBackground src={getCloudinaryUrl('proje.jpg')} alt="Projects background" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-4xl mx-auto" data-aos="fade-up">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl sm:text-5xl md:text-[54px] font-medium leading-[1.1] mb-8 md:mb-12 text-white max-w-4xl mx-auto"
          >
            Good engineering looks simple, <br className="hidden md:block" />but great engineering solves real problems.
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center gap-8"
          >
            <p className="text-white/70 text-sm font-normal">See the projects we delivered</p>
            <div className="w-12 h-12 rounded-full bg-[var(--primary-orange)] flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
              <ArrowDown size={20} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ProjectsGrid = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const filters = ["All", "Telecom", "ICT", "Power", "Environmental", "Biomedical"];
  
  const projects = [
    { id: "01", title: "Fiber Works", location: "Tanzania", tags: ["Telecom"], image: getCloudinaryUrl('v1777413775/fu11.png'), category: "Telecom" },
    { id: "02", title: "Solar Energy Storage Installation", location: "Tanzania", tags: ["Power"], image: getCloudinaryUrl('v1777413780/fu13.webp'), category: "Power" },
    { id: "03", title: "Overhead Pole Cable Installation", location: "Tanzania", tags: ["Telecom"], image: getCloudinaryUrl('v1777413784/fu1.png'), category: "Telecom" },
    { id: "04", title: "CT-Scan Repair & Maintenance", location: "Tanzania", tags: ["Biomedical"], image: getCloudinaryUrl('v1777413783/fu12.jpg'), category: "Biomedical" },
    { id: "05", title: "Telecom Tower Deployment", location: "Tanzania", tags: ["Telecom"], image: getCloudinaryUrl('v1777413784/fu15.jpg'), category: "Telecom" },
    { id: "06", title: "Telecom Equipment Room Setup", location: "Tanzania", tags: ["Telecom"], image: getCloudinaryUrl('v1777413783/fu14.webp'), category: "Telecom" },
    { id: "07", title: "Power Supply Unit Repair", location: "Tanzania", tags: ["Power"], image: getCloudinaryUrl('v1777413689/BACKUP1.jpg'), category: "Power" },
    { id: "08", title: "E-waste Management", location: "Tanzania", tags: ["Environmental"], image: getCloudinaryUrl('v1777413690/e1.jpg'), category: "Environmental" }
  ];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.tags.includes(activeFilter) || p.category === activeFilter);
  
  const displayProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-white overflow-hidden" data-aos="fade-up">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-16 gap-6 md:gap-8" data-aos="fade-up">
          <div className="flex items-center gap-2 text-[14px] text-[var(--primary-orange)] font-normal uppercase tracking-widest">
            • Our projects
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2.5 md:p-3 rounded-lg bg-[var(--primary-blue)] text-white">
              <Layout size={18} />
            </button>
            <button className="p-2.5 md:p-3 rounded-lg border border-[var(--primary-blue)]/10 text-[var(--primary-blue)]/40 hover:bg-[var(--primary-blue)]/5">
              <Menu size={18} />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 md:gap-4 mb-12 md:mb-20">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => { setActiveFilter(filter); setShowAll(false); }}
              className={`px-6 md:px-8 py-2.5 md:py-3 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter 
                  ? "bg-[var(--primary-blue)] text-white" 
                  : "text-[var(--primary-blue)]/50 hover:text-[var(--primary-blue)]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-20">
          {displayProjects.map((project, i) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group"
            >
              <Link to={`/projects/${project.id}`} className="block rounded-[2rem] overflow-hidden bg-[#f5f5f5] p-5 md:p-8 mb-6 cursor-pointer relative shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="rounded-2xl overflow-hidden aspect-[16/10] shadow-md">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" 
                  />
                </div>
              </Link>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <Link to={`/projects/${project.id}`} className="text-xl font-medium text-[var(--primary-blue)] hover:text-[var(--primary-orange)] transition-colors">
                    {project.title}
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-4 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-[12px] font-medium text-gray-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length > 6 && !showAll && (
          <div className="flex justify-center mt-24">
            <button 
              onClick={() => setShowAll(true)}
              className="bg-[var(--primary-orange)] text-white px-12 py-4 rounded-full font-medium text-sm hover:bg-[var(--primary-orange)]/90 transition-all shadow-lg"
            >
              Show more
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// --- Pages ---

// --- Contacts Page Components ---

const ContactsHero = () => {
  return (
    <section className="pt-32 md:pt-48 pb-16 md:pb-24 px-4 md:px-6 text-center relative overflow-hidden" data-aos="fade-up">
      <HeroBackground src={getCloudinaryUrl('f18.png')} alt="Contacts background" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-4xl mx-auto" data-aos="fade-up">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl sm:text-5xl md:text-[64px] font-medium leading-[1.1] mb-8 md:mb-12 text-white"
          >
            Empowering Trade, Connecting Farms
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center gap-8"
          >
            <p className="text-[var(--primary-orange)] text-sm font-normal uppercase tracking-widest">• Get in Touch</p>
            <div className="w-12 h-12 rounded-full bg-[var(--primary-orange)] flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
              <ArrowDown size={20} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ScheduleCall = () => {
  const [selectedDate, setSelectedDate] = useState(23);
  const [selectedTime, setSelectedTime] = useState("11:30am");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const times = ["11:30am", "12:00pm", "12:30pm", "6:00am", "6:30am", "7:00am", "7:30am", "4:00pm"];

  const handleConfirm = () => {
    if (!name || !email) {
      alert("Please enter your name and email.");
      return;
    }

    setStatus('sending');

    const templateParams = {
      name: name,
      email: email,
      title: "New Appointment Request",
      time: `March ${selectedDate}, 2026 at ${selectedTime}`,
      message: `Appointment request on March ${selectedDate}, 2026 at ${selectedTime}.`,
    };

    emailjs
      .send(
        (import.meta as any).env.VITE_EMAILJS_SERVICE_ID,
        (import.meta as any).env.VITE_EMAILJS_TEMPLATE_ID_APPOINTMENT,
        templateParams,
        (import.meta as any).env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setStatus('success');
          alert('Appointment scheduled successfully!');
        },
        (error) => {
          console.error('EmailJS error:', error);
          setStatus('error');
          alert('Failed to schedule appointment. Please try again.');
        }
      );
  };

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-[var(--primary-blue)]/5 overflow-hidden" data-aos="fade-up">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-[14px] text-[var(--primary-orange)] font-normal uppercase tracking-widest mb-12 md:mb-20" data-aos="fade-up">
          • Get in touch
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-[64px] font-medium leading-[1.1] mb-8 flex items-center flex-wrap gap-x-4 text-[var(--primary-blue)]">
              Interested in our agricultural commodities?
            </h2>
          </div>

          <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-sm border border-[var(--primary-blue)]/10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--primary-blue)] flex items-center justify-center text-white font-bold text-lg md:text-xl">PC</div>
              <div>
                <h3 className="font-bold text-base md:text-lg text-[var(--primary-blue)]">Prime Crop Sales Team</h3>
                <p className="text-[var(--primary-blue)]/50 text-xs md:text-sm">Available Mon-Fri</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-xs md:text-sm text-[var(--primary-blue)]/60 mb-8 pb-8 border-b border-[var(--primary-blue)]/10">
              <div className="flex items-center gap-2"><Clock size={16} /> 30 min appointments</div>
              <div className="flex items-center gap-2"><Video size={16} /> Google Meet video</div>
            </div>

            <div className="mb-8 p-4 bg-gray-50 rounded-xl space-y-4">
                <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:border-[var(--primary-blue)]" />
                <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:border-[var(--primary-blue)]" />
            </div>

            <div className="mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2">
                <h4 className="font-bold text-sm md:text-base text-[var(--primary-blue)]">Select an appointment time</h4>
                <span className="text-[10px] md:text-xs text-[var(--primary-blue)]/40">(GMT+00:00) UTC</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-sm text-[var(--primary-blue)]">March 2026</span>
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-[var(--primary-blue)]/5 rounded-full text-[var(--primary-blue)]"><ChevronLeft size={16} /></button>
                      <button className="p-1 hover:bg-[var(--primary-blue)]/5 rounded-full text-[var(--primary-blue)]"><ChevronRight size={16} /></button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-[var(--primary-blue)]/30 mb-2">
                    <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                      <button 
                        key={day}
                        onClick={() => setSelectedDate(day)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all ${
                          selectedDate === day 
                            ? "bg-[var(--primary-blue)] text-white font-bold" 
                            : "hover:bg-[var(--primary-blue)]/5 text-[var(--primary-blue)]"
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-sm uppercase tracking-widest text-gray-400">Tue 24</span>
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded-full"><ChevronLeft size={16} /></button>
                      <button className="p-1 hover:bg-gray-100 rounded-full"><ChevronRight size={16} /></button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-2 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                    {times.map(time => (
                      <button 
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`w-full py-3 rounded-xl border text-sm font-medium transition-all ${
                          selectedTime === time 
                            ? "bg-[#0055ff] border-[#0055ff] text-white" 
                            : "border-gray-200 hover:border-black text-gray-700"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button onClick={handleConfirm} disabled={status === 'sending'} className="w-full bg-black text-white py-4 rounded-full font-medium hover:bg-gray-800 transition-all disabled:opacity-50">
              {status === 'sending' ? 'Scheduling...' : 'Confirm Appointment'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const HomePage = () => (
  <>
    <HomeHero />
    <Ticker />
    {/* <LogoTicker /> */}
    <WhoWeAre />
    <FeaturedWorks />
    <HowWeBuildSolutions />
    <ImpactNumbers />
    <FAQSection />
    <ContactForm />
  </>
);

const ServicesPage = () => (
  <>
    <ServicesHero />
    <CoreOfferings />
    <FeaturedProjectsCarousel />
    <LogoTicker />
    <TrustStrip />
    <ExpertiseSection />
    <StatsSection />
    <Testimonials />
    <FAQSection />
    <CTASection />
    <ContactForm />
  </>
);

const PartnerWithUs = () => {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();

    if (!form.current) return;
    setStatus('sending');

    const serviceId = (import.meta as any).env.VITE_EMAILJS_SERVICE_ID;
    const templateId = (import.meta as any).env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = (import.meta as any).env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS configuration missing');
      setStatus('error');
      return;
    }

    emailjs
      .sendForm(
        serviceId,
        templateId,
        form.current,
        publicKey
      )
      .then(
        () => {
          setStatus('success');
          form.current?.reset();
        },
        (error) => {
          console.error('EmailJS error:', error);
          setStatus('error');
        }
      );
  };

  return (
    <section id="partner" className="py-24 px-6 bg-white" data-aos="fade-up">
      <div className="max-w-[1100px] mx-auto bg-[#0b3815] rounded-[2rem] md:rounded-[32px] p-8 md:p-16 text-white shadow-xl shadow-[#0b3815]/10" data-aos="fade-up" data-aos-delay="100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          <div>
            <div className="text-[13px] font-medium tracking-widest uppercase text-[#bded04]/80 mb-4">Partner With Us</div>
            <h2 className="text-[24px] md:text-[32px] font-bold tracking-tight mb-6 leading-[1.2]">
              Let's partner for your next export.
            </h2>
            <p className="text-white/70 text-[15px] sm:text-[17px] leading-relaxed mb-8 max-w-md">
              Whether you need a single container or an ongoing supply chain, Prime Crop LTD delivers quality Tanzania crops directly to you.
            </p>
            <div className="space-y-4 text-sm text-white/70">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-[#bded04]">
                     <MapPin size={18} />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Headquarters</div>
                    <div>Dar es Salaam, Tanzania</div>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-[#bded04]">
                     <Mail size={18} />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Email Us</div>
                    <div>info@primecropltd.com</div>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-[#bded04]">
                     <Phone size={18} />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Call Us</div>
                    <div>+255 746 336 541</div>
                  </div>
               </div>
            </div>
          </div>
          
          <form ref={form} onSubmit={sendEmail} className="bg-white/5 rounded-2xl p-6 md:p-8 space-y-4">
            <input type="text" name="user_name" required placeholder="Your Name" className="w-full bg-white/10 border border-white/10 rounded-lg p-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#bded04]" />
            <input type="email" name="user_email" required placeholder="Your Email" className="w-full bg-white/10 border border-white/10 rounded-lg p-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#bded04]" />
            <textarea name="message" required placeholder="Your Message" rows={4} className="w-full bg-white/10 border border-white/10 rounded-lg p-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#bded04]" />
            <button type="submit" disabled={status === 'sending'} className="w-full bg-[#bded04] text-[#0b3815] font-bold py-3 rounded-lg hover:opacity-90 transition-all disabled:opacity-50">
              {status === 'sending' ? 'Sending...' : 'Send Inquiry'}
            </button>
            {status === 'success' && <p className="text-[#bded04] text-sm text-center">Inquiry sent successfully!</p>}
            {status === 'error' && <p className="text-red-400 text-sm text-center">Failed to send inquiry.</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

import farmer2Image from '/src/public/farmer2.jpeg';

const ImpactSection = () => (
  <section className="py-20 px-6 bg-[#085b20] text-white">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
           <div className="text-[13px] font-semibold text-[#bded04] uppercase tracking-widest mb-4">
            • Our Impact
          </div>
          <h2 className="text-[32px] md:text-[48px] font-bold leading-[1.1] mb-8">
            Empowering Tanzanian Farming Communities
          </h2>
          <p className="text-white/80 text-lg leading-relaxed mb-6">
            We believe that high-quality export produce starts with prosperous farming communities. Through our fair-trade initiatives and sustainable training, we ensure that agricultural prosperity reaches those who work the land daily.
          </p>
          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
            <div>
               <div className="text-[#bded04] text-4xl font-bold mb-2">500+</div>
               <p className="text-sm text-white/60">Farming Families Supported</p>
            </div>
            <div>
               <div className="text-[#bded04] text-4xl font-bold mb-2">85%</div>
               <p className="text-sm text-white/60">Community reinvestment</p>
            </div>
          </div>
        </div>
        <div className="rounded-[2rem] overflow-hidden relative">
             <img src={farmer2Image} alt="Farmers" className="w-full h-full object-cover aspect-square" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#085b20] via-transparent to-transparent"></div>
        </div>
      </div>
    </div>
  </section>
);

const AboutPage = () => (
  <>
    <AboutHero />
    <VisionMissionSection />
    {/* <WhoWeAreAbout /> */}
    {/* <AboutStudio /> */}
    <OurExportProcess />
    <OurExportCommitment />
    {/* <OurMission /> */}
    <ImpactSection />
    <ContactForm />
  </>
);

const ContactsPage = () => (
  <>
    <ContactsHero />
    <ScheduleCall />
    <ContactForm />
  </>
);

const ProjectsPage = () => (
  <>
    <ProjectsHero />
    <TrustStrip />
    <ProjectsGrid />
    <ContactForm />
  </>
);

// --- Scroll To Top ---

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force scroll to top immediately for standard scroll
    window.scrollTo(0, 0);
    document.body.scrollTo(0, 0);
    document.documentElement.scrollTo(0, 0);
    
    // If Lenis is initialized globally, use it to scroll to top immediately
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: true });
    }
    
    // Refresh AOS more robustly
    setTimeout(() => {
      AOS.refresh();
      AOS.refreshHard();
    }, 500);
  }, [pathname]);

  return null;
};

// --- Main App ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Store lenis globally so ScrollToTop can access it
    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Initialize AOS
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50, // Reduced offset for better mobile experience
      delay: 0,
      mirror: false,
      anchorPlacement: 'top-bottom',
    });

    // Force a refresh after a short delay
    const timeout = setTimeout(() => {
      AOS.refresh();
    }, 500);

    // Handle scroll progress
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white selection:bg-black selection:text-white font-sans">
        <div 
          className="fixed top-0 left-0 h-[3px] bg-black z-[1000] transition-all duration-100" 
          style={{ width: `${scrollProgress}%` }}
        ></div>
        <CustomCursor />
        <Navbar toggleMenu={() => setIsMenuOpen(true)} />
        <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
          </Routes>
        </main>

        <MainFooter />
      </div>
    </Router>
  );
}
