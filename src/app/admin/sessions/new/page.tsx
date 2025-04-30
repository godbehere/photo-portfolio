import AdminSessionForm from "@/components/AdminSessionForm";

export default function NewSessionPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create New Session</h1>
      <AdminSessionForm />
    </div>
  );
}
