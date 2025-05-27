# 🦷 Subha Dental Care Website

A modern, responsive dental clinic website built with React, Vite, and Tailwind CSS. This professional healthcare website provides comprehensive information about dental services, online appointment booking, and patient resources.

![Subha Dental Care](https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=400&fit=crop&crop=center&auto=format&q=80)

## 🌟 Features

### 🏥 **Core Functionality**
- **Modern Responsive Design** - Mobile-first approach with Tailwind CSS
- **Service Showcase** - Comprehensive dental services with professional imagery
- **Online Appointment Booking** - Integrated booking system with form validation
- **Contact Management** - Multiple contact methods with Google Maps integration
- **Interactive Chatbot** - AI-powered dental assistant for patient queries
- **Dark/Light Theme** - User preference-based theme switching

### 🎨 **User Experience**
- **Smooth Animations** - Framer Motion powered transitions and effects
- **Professional Medical Design** - Healthcare-focused UI/UX design
- **Accessibility Features** - WCAG compliant with proper contrast and navigation
- **SEO Optimized** - Meta tags, structured data, and semantic HTML
- **Fast Loading** - Optimized images and lazy loading implementation

### 📱 **Technical Features**
- **React 18** - Latest React features with hooks and context
- **Vite Build Tool** - Fast development and optimized production builds
- **React Router** - Client-side routing with scroll restoration
- **Form Validation** - React Hook Form with Yup schema validation
- **Toast Notifications** - User feedback with React Hot Toast
- **Icon System** - Lucide React icons throughout the interface

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd subha-dental-care
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Start development server**
```bash
npm run dev
# or
yarn dev
```

4. **Open in browser**
```
http://localhost:5173
```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI components (Button, Card, etc.)
│   ├── layout/          # Layout components (Navbar, Footer)
│   ├── common/          # Common components (ScrollToTop)
│   └── Chatbot/         # Chatbot functionality
├── pages/               # Page components
│   ├── Home.jsx         # Homepage with hero and services
│   ├── About.jsx        # About us and team information
│   ├── Services.jsx     # Detailed services showcase
│   ├── Contact.jsx      # Contact form and information
│   ├── BookAppointment.jsx # Appointment booking
│   ├── Login.jsx        # User authentication
│   ├── Signup.jsx       # User registration
│   └── Dashboard.jsx    # User dashboard
├── contexts/            # React Context providers
│   ├── ThemeContext.jsx # Dark/Light theme management
│   └── AuthContext.jsx  # Authentication state
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── assets/              # Static assets
└── styles/              # CSS and styling files
```

## 🛠️ Technology Stack

### **Frontend Framework**
- **React 18** - Component-based UI library
- **Vite** - Next-generation frontend build tool
- **React Router DOM** - Client-side routing

### **Styling & UI**
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation and gesture library
- **Lucide React** - Beautiful & consistent icon pack

### **Form Management**
- **React Hook Form** - Performant forms with easy validation
- **Yup** - Schema validation library
- **React Hot Toast** - Notification system

### **Development Tools**
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📋 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Deployment
npm run deploy       # Deploy to production
```

## 🏥 Clinic Information

### **Subha Dental Care**
- **📍 Address**: Buddha chowk, Bhairahawa, Nepal
- **📱 Mobile**: +977 9864467519
- **☎️ Tel**: 071-5745194
- **🕒 Hours**: Sunday - Saturday, 9:00 AM - 6:00 PM
- **📧 Email**: info@subhadentalcare.com
- **🌐 Facebook**: [Subha Dental Care](https://www.facebook.com/profile.php?id=61574498425766)

## 🦷 Services Offered

### **General Dentistry**
- Dental Checkup & Cleaning
- Digital X-ray (RVG)
- Scaling & Polishing
- Dental Restoration (Fillings)

### **Surgical Procedures**
- Dental Extraction
- Dental Implants
- Oral Surgery

### **Restorative Dentistry**
- Crown & Bridge
- Removable Dentures
- Cosmetic Dentistry

### **Specialized Care**
- Orthodontic Treatment
- Root Canal Therapy
- Emergency Dental Care

## 🎨 Design Features

### **Color Scheme**
- **Primary**: Blue (#2563eb) - Trust and professionalism
- **Secondary**: White/Gray - Clean medical aesthetic
- **Accent**: Green - Health and wellness
- **Dark Mode**: Full dark theme support

### **Typography**
- **Primary Font**: Inter - Modern, readable
- **Heading Font**: Poppins - Professional, bold
- **Font Features**: Optimized for medical content

### **Responsive Design**
- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Enhanced tablet experience
- **Desktop**: Full-featured desktop layout
- **4K Ready**: Scales beautifully on large screens

## 🔧 Configuration

### **Environment Variables**
Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_URL=your_api_url_here
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key

# Email Configuration
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

# Analytics
VITE_GA_TRACKING_ID=your_google_analytics_id
```

### **Customization**

#### **Clinic Information**
Update clinic details in:
- `src/components/layout/Footer.jsx` - Contact information
- `src/pages/Contact.jsx` - Contact page details
- `src/pages/About.jsx` - Clinic description

#### **Services**
Modify services in:
- `src/pages/Services.jsx` - Service listings and details
- `src/pages/Home.jsx` - Featured services section

#### **Styling**
Customize colors in:
- `tailwind.config.js` - Theme configuration
- `src/index.css` - Global styles

## 📱 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+
- **Mobile Safari** iOS 14+
- **Chrome Mobile** Android 90+

## 🚀 Deployment

### **Build for Production**
```bash
npm run build
```

### **Deploy to Netlify**
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

### **Deploy to Vercel**
```bash
npm install -g vercel
vercel --prod
```

### **Deploy to GitHub Pages**
```bash
npm install --save-dev gh-pages
npm run build
npm run deploy
```

## 🔒 Security Features

- **Form Validation** - Client and server-side validation
- **XSS Protection** - Sanitized user inputs
- **HTTPS Ready** - SSL/TLS encryption support
- **Privacy Compliant** - GDPR considerations
- **Secure Headers** - Security-focused HTTP headers

## 📈 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: Optimized for Google's ranking factors
- **Image Optimization**: WebP format with fallbacks
- **Code Splitting**: Lazy loading for optimal bundle size
- **Caching Strategy**: Efficient browser caching

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Made by [Abhesh Kurmi](https://github.com/abheshkurmi)**

- 🌐 Portfolio: [abheshkurmi.dev](https://abheshkurmi.dev)
- 📧 Email: abhesh@example.com
- 💼 LinkedIn: [Abhesh Kurmi](https://linkedin.com/in/abheshkurmi)

## 🙏 Acknowledgments

- **Subha Dental Care** - For trusting us with their digital presence
- **React Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For smooth animations
- **Unsplash** - For high-quality medical imagery
- **Lucide** - For beautiful icons

## 📞 Support

For support, email info@subhadentalcare.com or contact the developer.

---

<div align="center">

**🦷 Subha Dental Care - Your Smile, Our Priority 🦷**

Made with ❤️ for better smiles

</div>
