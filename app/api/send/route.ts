import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const {
      email,
      tool,
      spend,
      seats,
      useCase,
      monthlySavings,
      yearlySavings,
    } = await req.json();

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Your AI Spend Audit Report",
      html: `
        <h1>AI Spend Audit Report</h1>

        <p><strong>Tool:</strong> ${tool}</p>
        <p><strong>Monthly Spend:</strong> $${spend}</p>
        <p><strong>Seats:</strong> ${seats}</p>
        <p><strong>Use Case:</strong> ${useCase}</p>

        <hr />

        <h2>Estimated Savings</h2>

        <p><strong>Monthly Savings:</strong> $${monthlySavings}</p>
        <p><strong>Annual Savings:</strong> $${yearlySavings}</p>
      `,
    });

    return Response.json(data);
  } catch (error) {
    console.log(error);

    return Response.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}