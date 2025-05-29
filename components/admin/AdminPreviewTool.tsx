import React, { useState, useEffect } from 'react';
import { Wand2, Eye, Copy, Check, Loader2, Building2, Phone, Mail, MapPin, Globe, Palette, Type, Image, Sparkles } from 'lucide-react';

const AdminPreviewTool = () => {
  const [previewData, setPreviewData] = useState({
    businessName: '',
    industry: '',
    phone: '',
    email: '',
    address: '',
    tagline: '',
    primaryColor: '#3B82F6',
    accentColor: '#10B981',
    description: '',
    services: [],
    heroImage: 'modern-office',
    fontPair: 'modern'
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [generatedContent, setGeneratedContent] = useState(null);

  const industries = [
    { value: 'dentist', label: 'Dental Practice', icon: '🦷' },
    { value: 'real_estate', label: 'Real Estate', icon: '🏡' },
    { value: 'restaurant', label: 'Restaurant', icon: '🍽️' },
    { value: 'law_firm', label: 'Law Firm', icon: '⚖️' },
    { value: 'fitness', label: 'Fitness/Gym', icon: '💪' },
    { value: 'salon', label: 'Beauty Salon', icon: '💇‍♀️' },
    { value: 'dietitian', label: 'Dietitian/Nutrition', icon: '🥗' },
    { value: 'medical', label: 'Medical Clinic', icon: '🏥' },
    { value: 'accounting', label: 'Accounting', icon: '📊' },
    { value: 'photography', label: 'Photography', icon: '📸' }
  ];

  const colorSchemes = {
    dentist: { primary: '#00A6FB', accent: '#00D9FF' },
    real_estate: { primary: '#2E5266', accent: '#6E8898' },
    restaurant: { primary: '#D32F2F', accent: '#FF6659' },
    law_firm: { primary: '#1A237E', accent: '#283593' },
    fitness: { primary: '#FF6B35', accent: '#F7931E' },
    salon: { primary: '#E91E63', accent: '#F06292' },
    dietitian: { primary: '#4CAF50', accent: '#8BC34A' },
    medical: { primary: '#0288D1', accent: '#03A9F4' },
    accounting: { primary: '#00695C', accent: '#00897B' },
    photography: { primary: '#5E35B1', accent: '#7E57C2' }
  };

  const fontPairs = [
    { value: 'modern', label: 'Modern', heading: 'Inter', body: 'Inter' },
    { value: 'elegant', label: 'Elegant', heading: 'Playfair Display', body: 'Lato' },
    { value: 'professional', label: 'Professional', heading: 'Montserrat', body: 'Open Sans' },
    { value: 'friendly', label: 'Friendly', heading: 'Poppins', body: 'Source Sans Pro' },
    { value: 'bold', label: 'Bold', heading: 'Bebas Neue', body: 'Roboto' }
  ];

  const heroImages = [
    { value: 'modern-office', label: 'Modern Office' },
    { value: 'professional-team', label: 'Professional Team' },
    { value: 'abstract-gradient', label: 'Abstract Gradient' },
    { value: 'industry-specific', label: 'Industry Specific' }
  ];

  // Mock AI content generation
  // AI content generation with OpenAI
  // AI content generation with OpenAI
  const generateAIContent = async () => {
    setIsGenerating(true);
    
    try {
      // Call the AI API
      const response = await fetch('/api/ai/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessName: previewData.businessName,
          industry: previewData.industry,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      const aiContent = await response.json();
      
      setGeneratedContent(aiContent);
      setPreviewData(prev => ({
        ...prev,
        tagline: aiContent.tagline,
        description: aiContent.description,
        services: aiContent.services
      }));

      // Generate preview URL
      const subdomain = previewData.businessName.toLowerCase().replace(/[^a-z0-9]/g, '-');
      setPreviewUrl(`https://${subdomain}-preview.yourdomain.com`);

    } catch (error) {
      console.error('Error generating content:', error);
      
      // Fallback to mock content if API fails
      const industryContent = {
        dietitian: {
          tagline: "Nourish Your Body, Transform Your Life",
          description: "Expert nutrition guidance tailored to your unique needs. We help you build sustainable, healthy eating habits that support your wellness goals and lifestyle.",
          services: [
            "Personalized Meal Planning",
            "Weight Management Programs",
            "Sports Nutrition Counseling",
            "Medical Nutrition Therapy",
            "Group Nutrition Workshops",
            "Virtual Consultations"
          ]
        },
        dentist: {
          tagline: "Your Smile, Our Passion",
          description: "Experience exceptional dental care in a comfortable, modern environment. Our team of skilled professionals is dedicated to helping you achieve optimal oral health.",
          services: [
            "General Dentistry",
            "Cosmetic Dentistry", 
            "Orthodontics",
            "Oral Surgery",
            "Teeth Whitening",
            "Dental Implants"
          ]
        },
        // Add other industries as needed...
      };

      const fallbackContent = industryContent[previewData.industry] || industryContent.dietitian;
      
      setGeneratedContent(fallbackContent);
      setPreviewData(prev => ({
        ...prev,
        tagline: fallbackContent.tagline,
        description: fallbackContent.description,
        services: fallbackContent.services
      }));

      // Generate preview URL
      const subdomain = previewData.businessName.toLowerCase().replace(/[^a-z0-9]/g, '-');
      setPreviewUrl(`https://${subdomain}-preview.yourdomain.com`);
    }

    setIsGenerating(false);
  };

  const handleIndustryChange = (industry) => {
    setPreviewData(prev => ({
      ...prev,
      industry,
      primaryColor: colorSchemes[industry]?.primary || '#3B82F6',
      accentColor: colorSchemes[industry]?.accent || '#10B981'
    }));
  };

  const copyPreviewUrl = () => {
    navigator.clipboard.writeText(previewUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const savePreview = async () => {
    // Here you would save to Supabase
    console.log('Saving preview data:', previewData);
    alert('Preview saved! This would save to Supabase in production.');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Preview Generator</h1>
          <p className="text-gray-600">Create instant website previews for potential clients</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Business Information</h2>
            
            <div className="space-y-4">
              {/* Business Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Building2 className="inline w-4 h-4 mr-1" />
                  Business Name *
                </label>
                <input
                  type="text"
                  value={previewData.businessName}
                  onChange={(e) => setPreviewData(prev => ({ ...prev, businessName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Smith Family Dental"
                />
              </div>

              {/* Industry */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Industry *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {industries.map((ind) => (
                    <button
                      key={ind.value}
                      onClick={() => handleIndustryChange(ind.value)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        previewData.industry === ind.value
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <span className="mr-2">{ind.icon}</span>
                      {ind.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Phone className="inline w-4 h-4 mr-1" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={previewData.phone}
                    onChange={(e) => setPreviewData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Mail className="inline w-4 h-4 mr-1" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={previewData.email}
                    onChange={(e) => setPreviewData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="info@business.com"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <MapPin className="inline w-4 h-4 mr-1" />
                  Address
                </label>
                <input
                  type="text"
                  value={previewData.address}
                  onChange={(e) => setPreviewData(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="123 Main St, City, State 12345"
                />
              </div>

              {/* Design Options */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Design Options</h3>
                
                {/* Colors */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Palette className="inline w-4 h-4 mr-1" />
                      Primary Color
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={previewData.primaryColor}
                        onChange={(e) => setPreviewData(prev => ({ ...prev, primaryColor: e.target.value }))}
                        className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                      />
                      <span className="text-sm text-gray-600">{previewData.primaryColor}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Palette className="inline w-4 h-4 mr-1" />
                      Accent Color
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={previewData.accentColor}
                        onChange={(e) => setPreviewData(prev => ({ ...prev, accentColor: e.target.value }))}
                        className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                      />
                      <span className="text-sm text-gray-600">{previewData.accentColor}</span>
                    </div>
                  </div>
                </div>

                {/* Font Pair */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Type className="inline w-4 h-4 mr-1" />
                    Typography
                  </label>
                  <select
                    value={previewData.fontPair}
                    onChange={(e) => setPreviewData(prev => ({ ...prev, fontPair: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {fontPairs.map(pair => (
                      <option key={pair.value} value={pair.value}>
                        {pair.label} ({pair.heading} + {pair.body})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Hero Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Image className="inline w-4 h-4 mr-1" />
                    Hero Image Style
                  </label>
                  <select
                    value={previewData.heroImage}
                    onChange={(e) => setPreviewData(prev => ({ ...prev, heroImage: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {heroImages.map(img => (
                      <option key={img.value} value={img.value}>{img.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateAIContent}
                disabled={!previewData.businessName || !previewData.industry || isGenerating}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-md font-medium hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5 mr-2" />
                    Generating AI Content...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate AI Content & Preview
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Generated Content</h2>
            
            {generatedContent ? (
              <div className="space-y-4">
                {/* Tagline */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
                  <input
                    type="text"
                    value={previewData.tagline}
                    onChange={(e) => setPreviewData(prev => ({ ...prev, tagline: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={previewData.description}
                    onChange={(e) => setPreviewData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Services */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Services</label>
                  <div className="space-y-2">
                    {previewData.services.map((service, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={service}
                          onChange={(e) => {
                            const newServices = [...previewData.services];
                            newServices[index] = e.target.value;
                            setPreviewData(prev => ({ ...prev, services: newServices }));
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          onClick={() => {
                            const newServices = previewData.services.filter((_, i) => i !== index);
                            setPreviewData(prev => ({ ...prev, services: newServices }));
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => setPreviewData(prev => ({ ...prev, services: [...prev.services, ''] }))}
                      className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                    >
                      + Add Service
                    </button>
                  </div>
                </div>

                {/* Preview URL */}
                {previewUrl && (
                  <div className="border-t pt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Globe className="inline w-4 h-4 mr-1" />
                      Preview URL
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={previewUrl}
                        readOnly
                        className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"
                      />
                      <button
                        onClick={copyPreviewUrl}
                        className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {copiedUrl ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={savePreview}
                    className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md font-medium hover:bg-green-600 transition-colors"
                  >
                    Save Preview
                  </button>
                  <a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-800 text-white py-2 px-4 rounded-md font-medium hover:bg-gray-900 transition-colors flex items-center justify-center"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Preview
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Wand2 className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p>Fill in business details and generate content to see preview</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-sm font-medium text-gray-600">Active Previews</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-sm font-medium text-gray-600">Converted This Month</h3>
            <p className="text-2xl font-bold text-green-600 mt-1">3</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-sm font-medium text-gray-600">Conversion Rate</h3>
            <p className="text-2xl font-bold text-blue-600 mt-1">25%</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-sm font-medium text-gray-600">Templates Available</h3>
            <p className="text-2xl font-bold text-purple-600 mt-1">10</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPreviewTool;
