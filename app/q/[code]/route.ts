import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabaseClient";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  try {
    const supabase = createServerClient();

    // Look up the short code
    const { data, error } = await supabase
      .from("links")
      .select("destination_url, clicks")
      .eq("code", code)
      .single();

    if (error || !data) {
      return new NextResponse(
        `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>404 — Not Found</title>
<style>body{background:#0A0A0A;color:#F5F5F5;font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
.c{text-align:center}h1{font-size:4rem;margin:0;color:#D7FF3D}p{color:#A0A0A0;margin-top:.5rem}a{color:#D7FF3D;text-decoration:none}</style>
</head>
<body><div class="c"><h1>404</h1><p>This short link doesn&apos;t exist.</p><a href="/">← Create a new one</a></div></body>
</html>`,
        {
          status: 404,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        }
      );
    }

    // Increment click counter (non-blocking — don't delay the redirect)
    supabase
      .from("links")
      .update({ clicks: data.clicks + 1 })
      .eq("code", code)
      .then(({ error: updateError }) => {
        if (updateError) {
          console.error("Failed to increment clicks:", updateError);
        }
      });

    return NextResponse.redirect(data.destination_url, 302);
  } catch (err) {
    console.error("Redirect error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
