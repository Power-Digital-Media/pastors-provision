import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // =========================================================================
    // NEWSLETTER INTEGRATION GUIDE
    // To connect to a marketing platform, replace the mock code below.
    // Examples:
    //
    // 1. Loops.so (Recommended for SaaS/Portals):
    //    await fetch("https://loops.so/api/v1/contacts/create", {
    //      method: "POST",
    //      headers: {
    //        "Authorization": `Bearer ${process.env.LOOPS_API_KEY}`,
    //        "Content-Type": "application/json"
    //      },
    //      body: JSON.stringify({ email, userGroup: "Pastors Provision Reminder" })
    //    });
    //
    // 2. Mailchimp:
    //    const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
    //    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
    //    const DATACENTER = MAILCHIMP_API_KEY.split("-")[1];
    //    await fetch(`https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`, {
    //      method: "POST",
    //      headers: {
    //        "Authorization": `apikey ${MAILCHIMP_API_KEY}`,
    //        "Content-Type": "application/json"
    //      },
    //      body: JSON.stringify({ email_address: email, status: "subscribed" })
    //    });
    // =========================================================================

    console.log(`[NEWSLETTER SIGNUP] Static capture: ${email}`);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Subscription endpoint error", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
