// Mock Data for the application to simulate a database/CMS

export const categories = [
  { id: 'outdoor', name: 'Outdoor Displays', image: 'cat-outdoor.png', desc: 'High brightness LED screens built for all weather conditions.' },
  { id: 'indoor', name: 'Indoor Displays', image: 'cat-indoor.png', desc: 'Ultra-high resolution LCD & LED displays for premium indoor environments.' },
  { id: 'mesh', name: 'Mesh & Clear Screens', image: 'cat-mesh.png', desc: 'Transparent LED technology that transforms glass into a canvas.' },
  { id: 'hologram', name: '3D Holograms', image: 'cat-hologram.png', desc: 'Cutting-edge volumetric displays for unforgettable visual impact.' },
  { id: 'street', name: 'Street Furniture', image: 'cat-street.png', desc: 'Smart city integrated kiosks and interactive public displays.' },
  { id: 'hospitality', name: 'Hospitality / Home', image: 'cat-indoor.png', desc: 'Bespoke digital signage tailored for luxury hotels and residences.' } // Reusing indoor image as fallback
];

export const products = [
  { id: 'p1', name: 'VENT Series', category: 'Outdoor', type: 'LED', desc: 'Ultra-lightweight mesh LED for outdoor facades.' },
  { id: 'p2', name: 'MX Series', category: 'Outdoor', type: 'LED', desc: 'Standard high-brightness outdoor cabinet.' },
  { id: 'p3', name: 'HDR Series', category: 'Outdoor', type: 'LED', desc: 'High Dynamic Range screens for maximum contrast.' },
  { id: 'p4', name: 'FIT Series', category: 'Outdoor', type: 'LED', desc: 'Customizable form-factor outdoor modules.' },
  { id: 'p5', name: 'CVENT Series', category: 'Outdoor', type: 'LED', desc: 'Curved and flexible outdoor mesh.' },
  { id: 'p6', name: 'COURT Series', category: 'Outdoor', type: 'LED', desc: 'Perimeter signage designed for sports stadiums.' },
  
  { id: 'p7', name: 'ICE Series', category: 'Indoor', type: 'LED', desc: 'Fine-pitch LED for broadcast and control rooms.' },
  { id: 'p8', name: 'IC Series', category: 'Indoor', type: 'LCD', desc: 'Ultra-thin bezel video wall displays.' },
  { id: 'p9', name: 'C-MESH', category: 'Indoor', type: 'LED', desc: 'Indoor transparent mesh for retail windows.' },
  { id: 'p10', name: 'C-BANNERS', category: 'Indoor', type: 'LED', desc: 'Standalone digital poster banners.' },
  { id: 'p11', name: 'Self Standing', category: 'Indoor', type: 'LCD', desc: 'Interactive touch kiosks for wayfinding.' },
  
  { id: 'p12', name: 'C-VENT Serie', category: 'Mesh & Clear', type: 'LED', desc: 'High transparency window screens.' },
  { id: 'p13', name: 'C-BANNERS Clear', category: 'Mesh & Clear', type: 'LED', desc: 'Transparent hanging digital banners.' },
  
  { id: 'p14', name: 'Smart Kiosk Pro', category: 'Street Furniture', type: 'LCD', desc: 'IP65 rated interactive city guide with cooling.' },
  { id: 'p15', name: 'Transit Shelter', category: 'Street Furniture', type: 'LCD', desc: 'Bus shelter integrated digital advertising network.' },
  
  { id: 'p16', name: 'HoloPod POS', category: '3D Holograms', type: 'Holo', desc: 'Point of sale volumetric display for product launches.' },
  { id: 'p17', name: 'HoloWall', category: '3D Holograms', type: 'Holo', desc: 'Large scale window 3D projection system.' }
];

export const clients = [
  { name: 'Pepsi', logo: 'Pepsi' },
  { name: 'P&G', logo: 'P&G' },
  { name: 'M&M\'s', logo: 'M&M\'s' },
  { name: 'L\'Oreal', logo: "L'Oréal" },
  { name: 'Kraft', logo: 'Kraft' },
  { name: 'Coors', logo: 'Coors' }
];

export const locations = [
  { 
    region: 'Asia Office', 
    address: 'No455, Zhongshan East Road, Jiangdong District, Ningbo, Zhejiang, CHINA.',
    contact: 'Rose Wu',
    phone: '15336667021'
  },
  { 
    region: 'North America', 
    address: '105 East Atlantic Ave., Suite 200, Delray Beach, FL 33444',
    contact: 'Eddy Rodriguez',
    phone: '1-888-376-2781'
  },
  { 
    region: 'LATAM & Caribbean', 
    address: 'PMB 171 #1353 Luis Vigoreaux, Guyanabo, PR 00966',
    contact: 'Jay Cerame',
    phone: '1-888-376-2781'
  },
  { 
    region: 'Dominican Republic', 
    address: 'Calle Flerida de Nolasco No. 22, Santo Domingo',
    contact: 'Ivan Valdez',
    phone: '(809) 683-2426'
  },
  { 
    region: 'Spain', 
    address: 'Paseo Marítimo Ciudad de Melilla 23, 9-2, 29016 Málaga, España',
    contact: 'Jorge C. Soler Ortega',
    phone: '+34 660 339 266'
  }
];
