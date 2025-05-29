'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import DietitianTemplate from '@/components/templates/industries/DietitianTemplate';

// Add Font Awesome for social icons
import Script from 'next/script';

export default function PreviewPage() {
  const params = useParams();
  const token = params.token as string;
  const [previewData, setPreviewData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch preview data
    const fetchPreviewData = async () => {
      try {
        // For now, check global store or use mock data
        if (typeof window !== 'undefined' && (global as any).previewStore && (global as any).previewStore[token]) {
          setPreviewData((global as any).previewStore[token]);
        } else {
          // Mock data for testing
          setPreviewData({
            businessName: 'Nourish Wellness',
            tagline: 'Your Journey to Better Health Starts Here',
            description: 'Expert nutrition guidance tailored to your unique needs.',
            services: [
              'Personalized Meal Planning',
              'Weight Management Programs',
              'Sports Nutrition Counseling',
              'Medical Nutrition Therapy',
              'Group Nutrition Workshops',
              'Virtual Consultations'
            ],
            phone: '(555) 123-4567',
            email: 'info@nourishwellness.com',
            address: '123 Health Street, Wellness City, WC 12345',
            primaryColor: '#4CAF50',
            accentColor: '#8BC34A',
            industry: 'dietitian'
          });
        }
      } catch (error) {
        console.error('Error fetching preview data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPreviewData();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading preview...</p>
        </div>
      </div>
    );
  }

  if (!previewData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Preview not found or expired</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Script src="https://kit.fontawesome.com/a076d05399.js" crossOrigin="anonymous" />
      <DietitianTemplate data={previewData} />
    </>
  );
}
