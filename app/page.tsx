import AdminDashboard from '@/components/AdminDashboard'
import StudentPortal from '@/components/StudentPortal'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Certificate Verification System</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <AdminDashboard />
        <StudentPortal />
      </div>
    </main>
  )
}

