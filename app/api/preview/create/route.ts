import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

// Global store for preview data (temporary solution)
declare global {
  var previewStore: Record<string, any> | undefined;
}

export async function POST(request: Request) {
  try {
    const previewData = await request.json();
    
    // Generate a unique preview token
    const previewToken = nanoid(10);
    
    // Initialize global store if it doesn't exist
    global.previewStore = global.previewStore || {};
    
    // Store preview data
    global.previewStore[previewToken] = {
      ...previewData,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };
    
    return NextResponse.json({ 
      previewToken,
      previewUrl: `/preview/${previewToken}`
    });
  } catch (error) {
    console.error('Preview creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create preview' },
      { status: 500 }
    );
  }
}
