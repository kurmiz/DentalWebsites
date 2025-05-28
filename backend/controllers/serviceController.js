// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getServices = async (req, res) => {
  try {
    const services = [
      {
        id: 'dental-checkup',
        icon: '🦷',
        title: 'Dental Checkup',
        description: 'Comprehensive oral health examination and professional cleaning to maintain optimal dental health',
        detailedDescription: 'Our comprehensive dental checkup is the foundation of preventive oral healthcare. During your visit, our experienced dentists will thoroughly examine your teeth, gums, and mouth to detect any potential issues early. This proactive approach helps prevent minor problems from becoming major dental concerns, saving you time, discomfort, and money in the long run.',
        price: 'From $80',
        duration: '45-60 minutes',
        category: 'Preventive',
        featured: true,
        features: [
          'Complete oral examination',
          'Professional teeth cleaning',
          'Plaque and tartar removal',
          'Gum health assessment',
          'Oral cancer screening',
          'Digital X-rays (if needed)',
          'Personalized treatment plan',
          'Oral hygiene education'
        ],
        process: [
          'Medical history review and discussion of concerns',
          'Visual examination of teeth, gums, and oral tissues',
          'Digital X-rays to detect hidden problems',
          'Professional cleaning and plaque removal',
          'Gum health evaluation and periodontal screening',
          'Oral cancer screening and soft tissue examination',
          'Discussion of findings and treatment recommendations',
          'Scheduling follow-up appointments if needed'
        ],
        benefits: [
          'Early detection of dental problems',
          'Prevention of tooth decay and gum disease',
          'Fresher breath and cleaner teeth',
          'Reduced risk of serious dental issues',
          'Professional oral hygiene guidance',
          'Peace of mind about oral health'
        ]
      },
      {
        id: 'dental-xray',
        icon: '📷',
        title: 'Dental X-ray (RVG)',
        description: 'Advanced digital radiography for accurate diagnosis and treatment planning',
        detailedDescription: 'Our state-of-the-art digital X-ray technology (RVG - RadioVisioGraphy) provides high-quality images with minimal radiation exposure. These detailed images allow our dentists to see what\'s happening beneath the surface of your teeth and gums, enabling accurate diagnosis and precise treatment planning for optimal oral health outcomes.',
        price: 'From $50',
        duration: '15-20 minutes',
        category: 'Diagnostic',
        features: [
          'Digital radiography technology',
          'Minimal radiation exposure',
          'Instant image processing',
          'High-resolution imaging',
          'Detailed diagnosis report',
          'Treatment planning guidance'
        ],
        process: [
          'Positioning and preparation for X-ray',
          'Digital sensor placement for optimal imaging',
          'Quick and comfortable X-ray capture',
          'Immediate image processing and review',
          'Detailed analysis and interpretation',
          'Discussion of findings with patient'
        ],
        benefits: [
          'Accurate diagnosis of hidden problems',
          '90% less radiation than traditional X-rays',
          'Immediate results and faster treatment',
          'Better treatment planning',
          'Early detection of cavities and bone loss',
          'Environmentally friendly digital process'
        ]
      },
      {
        id: 'scaling-polishing',
        icon: '✨',
        title: 'Scaling & Polishing',
        description: 'Professional teeth cleaning and plaque removal for healthier gums and brighter smile',
        detailedDescription: 'Professional scaling and polishing is a deep cleaning procedure that removes plaque, tartar, and stains that regular brushing and flossing cannot eliminate. This treatment not only improves the appearance of your teeth but also promotes gum health and prevents periodontal disease, ensuring your smile stays healthy and beautiful.',
        price: 'From $120',
        duration: '30-45 minutes',
        category: 'Preventive',
        featured: true,
        features: [
          'Ultrasonic scaling technology',
          'Plaque and tartar removal',
          'Stain removal and polishing',
          'Gum line cleaning',
          'Fluoride treatment',
          'Oral hygiene instructions'
        ],
        process: [
          'Initial examination and assessment',
          'Ultrasonic scaling to remove tartar',
          'Manual scaling for detailed cleaning',
          'Polishing with specialized paste',
          'Fluoride treatment application',
          'Post-treatment care instructions'
        ],
        benefits: [
          'Removes stubborn plaque and tartar',
          'Prevents gum disease and tooth loss',
          'Fresher breath and cleaner feeling',
          'Brighter, more attractive smile',
          'Improved overall oral health',
          'Reduced risk of cavities'
        ]
      },
      {
        id: 'dental-restoration',
        icon: '🔧',
        title: 'Dental Restoration',
        description: 'Advanced restorative treatments to repair and strengthen damaged teeth',
        detailedDescription: 'Our dental restoration services focus on repairing damaged, decayed, or missing teeth using the latest materials and techniques. Whether you need a simple filling or a complex restoration, we provide durable, natural-looking solutions that restore both function and aesthetics to your smile.',
        price: 'From $150',
        duration: '60-90 minutes',
        category: 'Restorative',
        features: [
          'Composite resin fillings',
          'Ceramic restorations',
          'Tooth-colored materials',
          'Precision bonding techniques',
          'Long-lasting results',
          'Natural appearance'
        ],
        process: [
          'Comprehensive examination and diagnosis',
          'Local anesthesia for comfort',
          'Removal of decay or damaged tissue',
          'Tooth preparation and cleaning',
          'Restoration placement and shaping',
          'Final polishing and bite adjustment'
        ],
        benefits: [
          'Restores tooth function and strength',
          'Natural-looking appearance',
          'Prevents further decay',
          'Long-lasting durability',
          'Improved chewing ability',
          'Enhanced smile aesthetics'
        ]
      },
      {
        id: 'dental-extraction',
        icon: '🦷',
        title: 'Dental Extraction',
        description: 'Safe and comfortable tooth removal procedures when necessary',
        detailedDescription: 'When a tooth cannot be saved through other treatments, extraction may be necessary. Our gentle extraction procedures prioritize your comfort and safety, using advanced techniques and proper anesthesia to ensure a smooth experience with minimal discomfort and optimal healing.',
        price: 'From $200',
        duration: '30-60 minutes',
        category: 'Surgical',
        features: [
          'Local anesthesia for comfort',
          'Gentle extraction techniques',
          'Post-operative care instructions',
          'Pain management guidance',
          'Follow-up appointments',
          'Healing monitoring'
        ],
        process: [
          'Pre-extraction examination and X-rays',
          'Administration of local anesthesia',
          'Gentle tooth loosening and removal',
          'Socket cleaning and inspection',
          'Gauze placement for bleeding control',
          'Post-operative instructions and care'
        ],
        benefits: [
          'Relief from tooth pain',
          'Prevention of infection spread',
          'Improved oral health',
          'Space for orthodontic treatment',
          'Elimination of crowding issues',
          'Better overall dental function'
        ]
      },
      {
        id: 'emergency-care',
        icon: '🚨',
        title: 'Emergency Care',
        description: 'Immediate dental care for urgent situations and dental emergencies',
        detailedDescription: 'Dental emergencies can happen at any time and require immediate attention. Our emergency dental care services provide prompt relief for severe tooth pain, dental trauma, infections, and other urgent dental situations. We prioritize emergency cases to ensure you receive the care you need when you need it most.',
        price: 'From $100',
        duration: '30-90 minutes',
        category: 'Emergency',
        features: [
          'Same-day appointments',
          'Pain relief treatment',
          'Trauma assessment',
          'Infection management',
          'Temporary restorations',
          '24/7 emergency contact'
        ],
        process: [
          'Immediate triage and pain assessment',
          'Emergency examination and diagnosis',
          'Pain management and stabilization',
          'Urgent treatment or temporary solution',
          'Prescription of medications if needed',
          'Follow-up appointment scheduling'
        ],
        benefits: [
          'Immediate pain relief',
          'Prevention of complications',
          'Preservation of natural teeth',
          'Quick resolution of urgent issues',
          'Peace of mind in emergencies',
          'Professional emergency care'
        ]
      }
    ];

    // Filter services based on query parameters
    let filteredServices = services;
    
    if (req.query.category) {
      filteredServices = services.filter(service => 
        service.category.toLowerCase() === req.query.category.toLowerCase()
      );
    }

    if (req.query.featured === 'true') {
      filteredServices = filteredServices.filter(service => service.featured);
    }

    res.status(200).json({
      success: true,
      data: {
        services: filteredServices,
        total: filteredServices.length,
        categories: ['Preventive', 'Diagnostic', 'Restorative', 'Surgical', 'Emergency']
      }
    });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching services'
    });
  }
};

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
const getService = async (req, res) => {
  try {
    // This would typically fetch from database, but for now using static data
    const services = await getServices({ query: {} }, { status: () => ({ json: (data) => data }) });
    const service = services.data.services.find(s => s.id === req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { service }
    });
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching service'
    });
  }
};

module.exports = {
  getServices,
  getService
};
