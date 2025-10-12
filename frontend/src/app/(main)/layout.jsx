import Navbar from "@/components/Navbar";

export default function MainLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
