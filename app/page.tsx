'use client';

import { useRouter } from 'next/navigation';
import { Sparkles, Eye, Rocket, Shield } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            SAAS Website Builder
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Build beautiful, AI-powered websites for your clients in minutes
          </p>
          <button
            onClick={() => router.push('/admin/preview')}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Go to Admin Preview Tool
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              AI-Powered Content
            </h3>
            <p className="text-gray-600">
              Generate professional website content with AI tailored to each industry
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Instant Previews
            </h3>
            <p className="text-gray-600">
              Show clients a working preview of their website in seconds
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Rocket className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Quick Deployment
            </h3>
            <p className="text-gray-600">
              Deploy to custom domains with automatic SSL and CDN
            </p>
          </div>
        </div>

        {/* Setup Status */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Setup Status
          </h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-green-500 mr-3" />
              <span className="text-gray-700">Project initialized successfully</span>
            </div>
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-yellow-500 mr-3" />
              <span className="text-gray-700">Remember to add your API keys to .env.local</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
