export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">

      <h1 className="text-4xl font-bold mb-4">
        WDC AWS Deployment Demo
      </h1>

      <p className="text-lg text-gray-600 text-center max-w-xl">
        This is a demonstration Next.js application deployed on AWS EC2
        using Nginx reverse proxy and CI/CD deployment strategy.
      </p>

      <div className="mt-10 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-3">
          Deployment Stack
        </h2>

        <ul className="list-disc pl-5 text-gray-700">
          <li>Next.js (Frontend + Backend)</li>
          <li>AWS EC2 Server</li>
          <li>Nginx Reverse Proxy</li>
          <li>PM2 Process Manager</li>
          <li>GitHub CI/CD</li>
        </ul>
      </div>
      <p className="mt-4 text-gray-500">
        Application: {process.env.APP_NAME}
      </p>
    </main>
  );
}