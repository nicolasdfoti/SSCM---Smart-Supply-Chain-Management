export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1>404 - Page Not Found</h1>
      <p className="mt-4 text-center text-lg text-slate-600">
        The requested page does not exist.
      </p>
    </div>
  );
}