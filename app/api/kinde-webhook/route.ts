import { NextResponse } from "next/server";
import jwksClient from "jwks-rsa";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
// The Kinde issuer URL should already be in your `.env` file
// from when you initially set up Kinde. This will fetch your
// public JSON web keys file
const client = jwksClient({
  jwksUri: `${process.env.KINDE_ISSUER_URL}/.well-known/jwks.json`,
});

export async function POST(req: Request) {
  try {
    // Get the token from the request
    const token = await req.text();

    // Decode the token
    const jwtDecoded = jwt.decode(token, { complete: true });
    if (!jwtDecoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 500 });
    }
    const { kid } = jwtDecoded.header;

    // Verify the token
    const key = await client.getSigningKey(kid);
    const signingKey = key.getPublicKey();
    const event = jwt.verify(token, signingKey) as JwtPayload;
    console.log("webhook event", event);
    const { id, email, first_name, last_name } = event.data.user;
    // Handle various events
    switch (event?.type) {
      case "user.updated":
        // handle user updated event
        // e.g update database with event.data
        console.log("data webhook", event.data);
        break;
      case "user.created":
        await db.insert(usersTable).values({
          email: email as string,
          id: id as string,
          first_name: first_name as string,
          last_name: last_name as string,
        });
        break;
      default:
        // other events that we don't handle
        break;
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  }
  return NextResponse.json({ status: 200, statusText: "success" });
}
