type BookingData = {
    sessionTypeId: string;
    availabilityWindowId: string;
    duration: number;
    date: string;
    startTime: string;
    name: string;
    email: string;
    notes: string;
    total: number;
  };
  
  export default function BookingSummary({ data }: { data: BookingData }) {
    return (
      <div className="text-sm space-y-4">
        <h2 className="text-lg font-semibold">Booking Summary</h2>
        <div>
            <strong>Duration:</strong> {data.duration ? data.duration > 60 ? `${data.duration / 60} hours`:`${data.duration} minutes` : "Not selected"}
        </div>
        <div>
            <strong>Date:</strong> {data.date ? new Date(data.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : "Not selected"}
        </div>
        <div>
            <strong>Time:</strong> {data.startTime ? new Date(data.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : "Not selected"}
        </div>
        <div>
            <strong>Total:</strong> {data.total ? `$${data.total.toFixed(2)}` : "$--"}
        </div>
      </div>
    );
  }
  