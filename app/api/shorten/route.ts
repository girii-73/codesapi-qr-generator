import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabaseClient";
import {
  generateCode,
  validateCustomCode,
  validateUrl,
} from "@/lib/shortcode";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, customCode } = body as {
      url?: string;
      customCode?: string;
    };

    // ── Validate URL ──
    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "A destination URL is required." },
        { status: 400 }
      );
    }

    if (!validateUrl(url)) {
      return NextResponse.json(
        { error: "Please provide a valid URL (https://…)." },
        { status: 400 }
      );
    }

    // ── Determine short code ──
    let code: string;

    if (customCode && typeof customCode === "string") {
      const trimmed = customCode.trim();
      if (!validateCustomCode(trimmed)) {
        return NextResponse.json(
          {
            error:
              "Custom slug must be 3-20 characters and contain only letters, numbers, hyphens, or underscores.",
          },
          { status: 400 }
        );
      }
      code = trimmed;
    } else {
      code = generateCode(6);
    }

    // ── Insert into Supabase ──
    const supabase = createServerClient();
    const { error: insertError } = await supabase.from("links").insert({
      code,
      destination_url: url,
    });

    if (insertError) {
      // Duplicate code
      if (
        insertError.code === "23505" ||
        insertError.message?.includes("duplicate")
      ) {
        return NextResponse.json(
          {
            error: customCode
              ? "That custom slug is already taken. Try a different one."
              : "Code collision — please try again.",
          },
          { status: 409 }
        );
      }
      console.error("Supabase insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to create short link. Please try again." },
        { status: 500 }
      );
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const shortUrl = `${baseUrl}/q/${code}`;

    return NextResponse.json({ code, shortUrl }, { status: 201 });
  } catch (err) {
    console.error("Shorten API error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
