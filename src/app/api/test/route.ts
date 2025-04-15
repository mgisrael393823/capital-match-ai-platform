import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: "success",
    message: "API is working",
    timestamp: new Date().toISOString(),
    data: {
      sample: "This is test data from the API"
    }
  });
}