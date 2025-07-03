import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function GET(request: NextRequest) {
  try {
    // Get courses from Firestore
    const coursesSnapshot = await adminDb.collection('courses').get();
    
    const courses = coursesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({
      success: true,
      courses,
      count: courses.length,
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    
    // Return mock data if Firebase is not configured
    const mockCourses = [
      {
        id: '1',
        title: 'Word Mining Fundamentals',
        description: 'Learn the basics of vocabulary building and word analysis',
        level: 'Beginner',
        duration: '4 weeks',
        price: 2999,
        currency: 'USD',
        features: [
          'Interactive vocabulary exercises',
          'Word etymology deep-dives',
          'Progress tracking',
          'Certificate of completion'
        ],
        created_at: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Advanced Language Analytics',
        description: 'Master complex language patterns and analytical thinking',
        level: 'Advanced',
        duration: '8 weeks',
        price: 4999,
        currency: 'USD',
        features: [
          'Advanced text analysis',
          'Language pattern recognition',
          'Research methodologies',
          'Expert mentorship'
        ],
        created_at: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Multilingual Mastery',
        description: 'Expand your linguistic horizons across multiple languages',
        level: 'Intermediate',
        duration: '12 weeks',
        price: 7999,
        currency: 'USD',
        features: [
          'Multi-language support',
          'Cultural context learning',
          'Native speaker sessions',
          'Immersive exercises'
        ],
        created_at: new Date().toISOString(),
      },
    ];

    return NextResponse.json({
      success: true,
      courses: mockCourses,
      count: mockCourses.length,
      note: 'Using mock data - configure Firebase for live data',
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, level, duration, price, currency, features } = body;

    // Validate required fields
    if (!title || !description || !level || !duration || !price) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Add course to Firestore
    const courseData = {
      title,
      description,
      level,
      duration,
      price,
      currency: currency || 'USD',
      features: features || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const docRef = await adminDb.collection('courses').add(courseData);

    return NextResponse.json({
      success: true,
      id: docRef.id,
      course: { id: docRef.id, ...courseData },
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create course' },
      { status: 500 }
    );
  }
}