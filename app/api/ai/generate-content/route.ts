import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { businessName, industry } = await request.json();

    if (!businessName || !industry) {
      return NextResponse.json(
        { error: 'Business name and industry are required' },
        { status: 400 }
      );
    }

    const prompt = `Generate website content for a ${industry} business named "${businessName}". 
    Provide:
    1. A short, catchy tagline (max 10 words)
    2. A compelling business description (2-3 sentences)
    3. A list of 6 key services
    
    Format the response as JSON with keys: tagline, description, services (array)`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional copywriter specializing in creating compelling website content for businesses."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const content = completion.choices[0].message.content;
    const parsedContent = JSON.parse(content);

    return NextResponse.json(parsedContent);
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}
