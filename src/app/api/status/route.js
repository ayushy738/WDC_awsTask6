export async function GET() {
  return Response.json({
    status: "Server Running Successfully",
    framework: "Next.js",
    deployment: "AWS EC2"
  });
}