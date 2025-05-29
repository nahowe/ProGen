import React, { useState, useEffect } from 'react';
import Script from 'next/script';

interface DietitianTemplateProps {
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
  };
}

export default function DietitianTemplate({ data }: DietitianTemplateProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  // Use the cream/beige color scheme from Walder Wellness
  const bgCream = darkMode ? '#1A1A1A' : '#FAF7F2';
  const textDark = darkMode ? '#F5F5F5' : '#2C2C2C';
  const cardBg = darkMode ? '#2A2A2A' : '#FFFFFF';

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`} style={{ backgroundColor: bgCream }}>
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600&display=swap');
          
          body {
            font-family: 'Inter', sans-serif;
          }
          
          .font-serif {
            font-family: 'Playfair Display', serif;
          }
          
          .text-cream {
            color: ${bgCream};
          }
          
          .bg-cream {
            background-color: ${bgCream};
          }
          
          .hover-lift:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          }
          
          .recipe-scroll::-webkit-scrollbar {
            height: 6px;
          }
          
          .recipe-scroll::-webkit-scrollbar-track {
            background: #f1f1f1;
          }
          
          .recipe-scroll::-webkit-scrollbar-thumb {
            background: ${data.primaryColor || '#D4A574'};
            border-radius: 3px;
          }
        `}</style>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="fixed top-24 right-4 z-50 p-3 rounded-full shadow-lg transition-all"
          style={{ backgroundColor: data.primaryColor || '#D4A574' }}
        >
          <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} text-white`}></i>
        </button>

        {/* Top Banner */}
        <div 
          className="w-full py-3 text-center text-sm text-white"
          style={{ backgroundColor: data.primaryColor || '#D4A574' }}
        >
          NEW! Get Your No More Boring Salads Ebook NOW! →
        </div>

        {/* Navigation */}
        <nav className="sticky top-0 z-40 backdrop-blur-sm" style={{ backgroundColor: `${bgCream}E6` }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <a href="/" className="flex items-center space-x-3">
                <div className="relative">
                  <div 
                    className="w-12 h-12 rounded-full opacity-30"
                    style={{ backgroundColor: data.primaryColor || '#D4A574' }}
                  />
                  <i 
                    className="fas fa-leaf absolute top-3 left-3 text-2xl"
                    style={{ color: data.accentColor || '#8B7355' }}
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold font-serif" style={{ color: textDark }}>
                    {data.businessName}
                  </h1>
                  <p className="text-xs uppercase tracking-widest" style={{ color: darkMode ? '#999' : '#666' }}>
                    Wellness
                  </p>
                </div>
              </a>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-8">
                {['about', 'recipes', 'articles', 'shop', 'newsletter', 'start here'].map((item) => (
                  <a 
                    key={item}
                    href={`#${item.replace(' ', '-')}`} 
                    className={`hover:opacity-70 transition ${item === 'start here' ? 'font-semibold' : ''}`}
                    style={{ color: textDark }}
                  >
                    {item}
                  </a>
                ))}
              </div>

              {/* Social & Search */}
              <div className="hidden lg:flex items-center space-x-4">
                <a href="#" className="hover:opacity-70"><i className="fab fa-instagram" style={{ color: textDark }}></i></a>
                <a href="#" className="hover:opacity-70"><i className="fab fa-facebook" style={{ color: textDark }}></i></a>
                <a href="#" className="hover:opacity-70"><i className="fab fa-pinterest" style={{ color: textDark }}></i></a>
                <a href="#" className="hover:opacity-70"><i className="fab fa-tiktok" style={{ color: textDark }}></i></a>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="search..." 
                    className="pl-4 pr-10 py-2 rounded-full text-sm border"
                    style={{ 
                      backgroundColor: cardBg,
                      borderColor: darkMode ? '#333' : '#E5E5E5',
                      color: textDark
                    }}
                  />
                  <i className="fas fa-search absolute right-3 top-2.5 text-gray-400"></i>
                </div>
              </div>

              {/* Mobile Menu */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden"
              >
                <i className="fas fa-bars text-2xl" style={{ color: textDark }}></i>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black opacity-50" onClick={() => setMobileMenuOpen(false)}></div>
            <div className="absolute left-0 top-0 w-64 h-full shadow-xl" style={{ backgroundColor: bgCream }}>
              <div className="p-6">
                <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6">
                  <i className="fas fa-times text-2xl" style={{ color: textDark }}></i>
                </button>
                <div className="mt-12 space-y-6">
                  {['about', 'recipes', 'articles', 'shop', 'newsletter', 'start here'].map((item) => (
                    <a 
                      key={item}
                      href={`#${item.replace(' ', '-')}`} 
                      className="block text-lg"
                      style={{ color: textDark }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recipe Cards Section */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {[
                {
                  title: "Celery Apple Salad",
                  category: "SALADS",
                  image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                  description: "This celery apple salad is paired with a creamy tahini dressing for a refreshing crunch."
                },
                {
                  title: "Mango Orange Smoothie",
                  category: "BEVERAGES & SMOOTHIES",
                  image: "https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400&h=300&fit=crop",
                  description: "Start your day with this vitamin-packed tropical smoothie."
                },
                {
                  title: "Raspberry Oatmeal",
                  category: "BREAKFASTS",
                  image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
                  description: "A go-to healthy breakfast full of fiber and antioxidants."
                }
              ].map((recipe, index) => (
                <div 
                  key={index}
                  className="rounded-2xl overflow-hidden transition-all duration-300 hover-lift cursor-pointer"
                  style={{ backgroundColor: cardBg }}
                >
                  <div className="relative">
                    <img 
                      src={recipe.image} 
                      alt={recipe.title}
                      className="w-full h-64 object-cover"
                    />
                    <span 
                      className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider"
                      style={{ backgroundColor: `${cardBg}E6`, color: textDark }}
                    >
                      {recipe.category}
                    </span>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-2xl mb-3 font-serif" style={{ color: textDark }}>
                      {recipe.title}
                    </h3>
                    <div className="flex justify-center items-center space-x-2 mb-4">
                      <span className="text-xl" style={{ color: data.primaryColor || '#D4A574' }}>❦</span>
                      <span className="text-sm italic" style={{ color: darkMode ? '#999' : '#666' }}>
                        Walder Wellness
                      </span>
                      <span className="text-xl" style={{ color: data.primaryColor || '#D4A574' }}>❦</span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: darkMode ? '#AAA' : '#666' }}>
                      {recipe.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Read More Button */}
            <div className="text-center mb-16">
              <button 
                className="px-6 py-3 rounded-full border-2 text-sm font-medium uppercase tracking-wider hover:opacity-80 transition"
                style={{ 
                  borderColor: data.accentColor || '#8B7355',
                  color: data.accentColor || '#8B7355'
                }}
              >
                Read More →
              </button>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center space-x-4 text-sm" style={{ color: textDark }}>
              <span className="font-medium">1</span>
              {[2, 3, 4, 5].map(num => (
                <a key={num} href="#" className="hover:font-medium transition">{num}</a>
              ))}
              <span>...</span>
              <a href="#" className="hover:font-medium transition">42</a>
              <a href="#" className="hover:font-medium transition">next »</a>
            </div>
          </div>
        </section>

        {/* Welcome Section */}
        <section id="about" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Background circle */}
              <div 
                className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-20 blur-3xl"
                style={{ backgroundColor: data.primaryColor || '#D4A574' }}
              />
              
              <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                <div className="order-2 md:order-1">
                  <img 
                    src="https://images.unsplash.com/photo-1604467794349-0b74285de7e7?w=600&h=800&fit=crop"
                    alt={data.businessName}
                    className="rounded-2xl shadow-2xl"
                  />
                </div>
                <div className="order-1 md:order-2">
                  <h2 className="text-5xl mb-6 font-serif" style={{ color: textDark }}>Welcome!</h2>
                  <p className="mb-4 leading-relaxed" style={{ color: darkMode ? '#CCC' : '#444' }}>
                    Hi, I'm Carrie Walder, MS, RD! I'm a Registered Dietitian in both Canada and the United States. 
                    Here, and on my Instagram (@walderwellness), I share ways to add more whole foods into your 
                    everyday life in a simple, realistic, and nutritionally balanced way.
                  </p>
                  <p className="italic" style={{ color: darkMode ? '#CCC' : '#444' }}>
                    Thanks so much for stopping by!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recipe Carousel */}
        <section className="py-12 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex overflow-x-auto space-x-4 pb-4 recipe-scroll">
              {[
                "Roasted Green Beans With Garlic & Parmesan",
                "Simple Oven Baked Shrimp",
                "Cottage Cheese Pasta Bake",
                "5-Minute Yogurt Fruit Dip",
                "Easy Honey Garlic Tofu With Soy & Sesame",
                "Summer Salad With Corn, Strawberries & Avocado",
                "30-Minute Mediterranean Canned Mac & Cheese",
                "Roasted Peppers & Zucchini",
                "Roasted Sweet Potatoes & Carrots",
                "Healthy Homemade Greek Frozen Yogurt",
                "Lemon Garlic Shrimp Pasta With Spinach"
              ].map((recipe, index) => (
                <div key={index} className="flex-none w-48 cursor-pointer">
                  <img 
                    src={`https://images.unsplash.com/photo-${1546069901 + index * 1000}-acdba7d4c477?w=200&h=150&fit=crop`}
                    alt={recipe}
                    className="rounded-lg mb-2 hover:opacity-90 transition"
                  />
                  <p className="text-sm font-medium" style={{ color: textDark }}>{recipe}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section id="newsletter" className="py-20 relative">
          <div 
            className="absolute inset-0 z-0 opacity-10"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1920&h=600&fit=crop)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <div 
              className="rounded-3xl py-16 px-8 text-center shadow-xl"
              style={{ backgroundColor: `${cardBg}F2` }}
            >
              <div 
                className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-8"
                style={{ backgroundColor: data.primaryColor || '#D4A574' }}
              >
                <i className="fas fa-envelope text-3xl text-white"></i>
              </div>
              
              <h2 className="text-4xl mb-4 font-serif" style={{ color: textDark }}>
                Want more simple, nutritious recipes?
              </h2>
              <p className="mb-8 text-lg" style={{ color: darkMode ? '#CCC' : '#444' }}>
                Join the Walder Wellness email list and get a FREE copy of our 15 Top Recipes E-book!
              </p>
              
              <form className="max-w-2xl mx-auto">
                <div className="flex flex-col md:flex-row gap-4">
                  <input 
                    type="text" 
                    placeholder="First Name"
                    className="flex-1 px-6 py-3 rounded-full border text-base"
                    style={{ 
                      backgroundColor: cardBg,
                      borderColor: darkMode ? '#333' : '#E5E5E5',
                      color: textDark
                    }}
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address"
                    className="flex-1 px-6 py-3 rounded-full border text-base"
                    style={{ 
                      backgroundColor: cardBg,
                      borderColor: darkMode ? '#333' : '#E5E5E5',
                      color: textDark
                    }}
                  />
                  <button 
                    type="submit"
                    className="px-8 py-3 rounded-full text-white font-medium uppercase tracking-wider hover:opacity-90 transition"
                    style={{ backgroundColor: data.primaryColor || '#D4A574' }}
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Recipe Categories */}
        <section id="recipes" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Seafood Dinners",
                  items: ["Baked cod", "Stuffed salmon", "Baked sablefish", "Mackerel recipe", "Coconut shrimp", "Baked halibut", "Seared scallops"]
                },
                {
                  title: "Vegetable Side Dishes",
                  items: ["Roasted carrots", "Mashed sweet potatoes", "Roasted green beans", "Roasted delicata squash", "Sautéed celery", "Vegetarian stuffed peppers", "Crispy potatoes"]
                },
                {
                  title: "Popular Pastas & Pasta Salads",
                  items: ["Tofu pasta", "Vegan pasta", "Shrimp pesto pasta", "Tuna noodle casserole", "Baked penne pasta", "Orzo salad", "Tuna pasta salad"]
                },
                {
                  title: "Healthy Breakfasts",
                  items: ["Healthy smoothie recipes", "Greek yogurt recipes", "Oat recipes", "Breakfast cookies", "Chia seed recipes", "Tofu scramble", "Egg recipes"]
                }
              ].map((category, index) => (
                <div key={index}>
                  <h3 className="text-2xl mb-6 font-serif" style={{ color: textDark }}>
                    {category.title}
                  </h3>
                  <ul className="space-y-3">
                    {category.items.map((item, idx) => (
                      <li key={idx}>
                        <a 
                          href="#" 
                          className="hover:underline transition"
                          style={{ color: darkMode ? '#AAA' : '#666' }}
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-4 border-t" style={{ borderColor: darkMode ? '#333' : '#E5E5E5' }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div>
                <h4 className="text-lg font-semibold mb-4 uppercase tracking-wider" style={{ color: textDark }}>
                  Info
                </h4>
                <ul className="space-y-2">
                  {['About', 'Contact', 'Work with Me', 'FAQ'].map(item => (
                    <li key={item}>
                      <a href="#" className="hover:underline" style={{ color: darkMode ? '#AAA' : '#666' }}>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 uppercase tracking-wider" style={{ color: textDark }}>
                  Browse
                </h4>
                <ul className="space-y-2">
                  {['Start Here', 'Recipes', 'Nutrition Articles', 'Shop'].map(item => (
                    <li key={item}>
                      <a href="#" className="hover:underline" style={{ color: darkMode ? '#AAA' : '#666' }}>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 uppercase tracking-wider" style={{ color: textDark }}>
                  Follow
                </h4>
                <ul className="space-y-2">
                  {['Instagram', 'Facebook', 'Pinterest', 'TikTok'].map(item => (
                    <li key={item}>
                      <a href="#" className="hover:underline" style={{ color: darkMode ? '#AAA' : '#666' }}>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 uppercase tracking-wider" style={{ color: textDark }}>
                  Instagram
                </h4>
                <div className="flex items-center space-x-2 mb-4">
                  <i className="fab fa-instagram" style={{ color: darkMode ? '#AAA' : '#666' }}></i>
                  <span style={{ color: darkMode ? '#AAA' : '#666' }}>Follow @walderwellness</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {[1,2,3].map(i => (
                    <div key={i} className="aspect-square rounded" style={{ backgroundColor: darkMode ? '#333' : '#E5E5E5' }}></div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm" style={{ color: darkMode ? '#AAA' : '#666' }}>
                © 2024 {data.businessName}. All rights reserved.
              </p>
            </div>
          </div>
        </footer>

        {/* Preview Mode Banner */}
        <div className="fixed bottom-4 right-4 bg-black/90 text-white px-6 py-3 rounded-lg shadow-lg backdrop-blur-sm z-50">
          <p className="text-sm font-medium">🚀 Preview Mode</p>
          <p className="text-xs opacity-75">This site expires in 7 days</p>
        </div>
      </div>
    </>
  );
}
