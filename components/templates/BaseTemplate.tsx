import React from 'react';
import { Phone, Mail, MapPin, Clock, Star, ChevronRight, Menu, X } from 'lucide-react';

interface BaseTemplateProps {
  data: {
    businessName: string;
    tagline: string;
    description: string;
    services: string[];
    phone?: string;
    email?: string;
    address?: string;
    primaryColor: string;
    accentColor: string;
    heroImage?: string;
    industry: string;
  };
  children?: React.ReactNode;
}

export default function BaseTemplate({ data, children }: BaseTemplateProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold" style={{ color: data.primaryColor }}>
                {data.businessName}
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-gray-900 transition">Home</a>
              <a href="#about" className="text-gray-700 hover:text-gray-900 transition">About</a>
              <a href="#services" className="text-gray-700 hover:text-gray-900 transition">Services</a>
              <a href="#contact" className="text-gray-700 hover:text-gray-900 transition">Contact</a>
              <button 
                className="px-4 py-2 rounded-lg text-white transition-transform hover:scale-105"
                style={{ backgroundColor: data.primaryColor }}
              >
                Book Now
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#home" className="block px-3 py-2 text-gray-700">Home</a>
              <a href="#about" className="block px-3 py-2 text-gray-700">About</a>
              <a href="#services" className="block px-3 py-2 text-gray-700">Services</a>
              <a href="#contact" className="block px-3 py-2 text-gray-700">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - This can be customized per industry */}
      {children}

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Professional solutions tailored to your needs</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.services.map((service, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${data.accentColor}20` }}
                >
                  <div 
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: data.accentColor }}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service}</h3>
                <p className="text-gray-600 mb-4">
                  Professional {service.toLowerCase()} services delivered with excellence and care.
                </p>
                <a 
                  href="#" 
                  className="inline-flex items-center font-medium transition-colors"
                  style={{ color: data.primaryColor }}
                >
                  Learn more <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Don't just take our word for it</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">
                  "Exceptional service and outstanding results. Highly recommend to anyone looking for quality and professionalism."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <p className="font-semibold">Client Name</p>
                    <p className="text-sm text-gray-600">Satisfied Customer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: `${data.primaryColor}10` }}>
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Contact us today and discover how we can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="px-8 py-4 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              style={{ backgroundColor: data.primaryColor }}
            >
              Get Started Today
            </button>
            <button className="px-8 py-4 bg-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">{data.businessName}</h2>
              <p className="text-gray-300 mb-8">{data.tagline}</p>
              
              <div className="space-y-4">
                {data.phone && (
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3" style={{ color: data.accentColor }} />
                    <span>{data.phone}</span>
                  </div>
                )}
                {data.email && (
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-3" style={{ color: data.accentColor }} />
                    <span>{data.email}</span>
                  </div>
                )}
                {data.address && (
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-3" style={{ color: data.accentColor }} />
                    <span>{data.address}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-3" style={{ color: data.accentColor }} />
                  <span>Mon-Fri: 9AM-6PM</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-6">Send us a message</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2"
                  style={{ focusRingColor: data.accentColor }}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2"
                />
                <button 
                  type="submit"
                  className="w-full py-3 font-semibold rounded-lg transition-colors"
                  style={{ backgroundColor: data.primaryColor }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Mode Banner */}
      <div className="fixed bottom-4 right-4 bg-black/90 text-white px-6 py-3 rounded-lg shadow-lg backdrop-blur-sm">
        <p className="text-sm font-medium">🚀 Preview Mode</p>
        <p className="text-xs opacity-75">This site expires in 7 days</p>
      </div>
    </div>
  );
}
