import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { RevokeApiData } from '@/types/api';
import { db } from '@/lib/db';
import { z } from 'zod';

export async function POST(
  req: Request,
  res: Response
): Promise<NextResponse<RevokeApiData>> {
  try {
    const user = await getServerSession(authOptions).then((res) => res?.user);
    if (!user) {
      return NextResponse.json(
        {
          error: 'Unauthorized to perform this action.',
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    const validApiKey = await db.apiKey.findFirst({
      where: {
        userId: user.id,
        enabled: true,
      },
    });

    if (!validApiKey) {
      return NextResponse.json(
        {
          error: 'No valid API key found.',
          success: false,
        },
        {
          status: 500,
        }
      );
    }

    //invalidate API Key
    await db.apiKey.update({
      where: {
        id: validApiKey.id,
      },
      data: {
        enabled: false,
      },
    });

    return NextResponse.json(
      {
        error: null,
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: error.issues,
          success: false,
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json(
      {
        error: 'Internal server error.',
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
