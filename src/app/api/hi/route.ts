import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) { 

  return NextResponse.json({
    hi:'world',
  })
}

export async function POST(request: Request) { 

    return NextResponse.json({
      hi:'world',
      method:'POST',
    })
  }