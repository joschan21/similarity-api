import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { nanoid } from 'nanoid';
import { z } from 'zod';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { CreateApiData } from '@/types/api';

export async function GET(
  req: Request,
  res: Response
): Promise<NextResponse<CreateApiData>> {
  try {
    const user = await getServerSession(authOptions).then((res) => res?.user);

    if (!user) {
      return NextResponse.json(
        {
          error: 'Unauthorized to perform this action.',
          createdApiKey: null,
        },
        {
          status: 404,
        }
      );
    }

    const existingApiKey = await db.apiKey.findFirst({
      where: {
        userId: user.id,
        enabled: true,
      },
    });

    if (existingApiKey) {
      return NextResponse.json(
        {
          error: 'An API key already exists for this user.',
          createdApiKey: null,
        },
        {
          status: 400,
        }
      );
    }

    const createdApiKey = await db.apiKey.create({
      data: {
        userId: user.id,
        key: nanoid(),
      },
    });

    return NextResponse.json(
      {
        error: null,
        createdApiKey,
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
          createdApiKey: null,
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json(
      {
        error: 'Internal server error.',
        createdApiKey: null,
      },
      {
        status: 500,
      }
    );
  }
}
