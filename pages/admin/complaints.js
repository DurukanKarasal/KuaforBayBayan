import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function AdminComplaints() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'authenticated' && session.user.role === 'ADMIN') {
      fetchComplaints();
    } else if (status === 'authenticated' && session.user.role !== 'ADMIN') {
      router.push('/');
    }
  }, [status, session]);

  const fetchComplaints = async () => {
    try {
      const res = await fetch('/api/admin/complaints');
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Bir hata oluştu');
      }

      setComplaints(data.complaints);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (complaintId, newStatus) => {
    try {
      const res = await fetch(`/api/admin/complaints/${complaintId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error('Durum güncelleme başarısız oldu');
      }

      // Şikayet listesini güncelle
      setComplaints(complaints.map(complaint =>
        complaint.id === complaintId ? { ...complaint, status: newStatus } : complaint
      ));
    } catch (error) {
      setError(error.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (status === 'loading' || loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>;
  }

  if (status === 'unauthenticated' || (session && session.user.role !== 'ADMIN')) {
    router.push('/');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Şikayet Yönetimi</h1>
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200"
          >
            Admin Paneline Dön
          </button>
        </div>

        {error && (
          <div className="bg-red-50 p-4 rounded-md mb-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            {complaints.map((complaint) => (
              <li key={complaint.id} className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {complaint.name} ({complaint.email})
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(complaint.createdAt)}
                      </p>
                    </div>
                    <select
                      value={complaint.status}
                      onChange={(e) => handleStatusChange(complaint.id, e.target.value)}
                      className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="PENDING">Bekliyor</option>
                      <option value="IN_PROGRESS">İşleme Alındı</option>
                      <option value="RESOLVED">Çözüldü</option>
                      <option value="REJECTED">Reddedildi</option>
                    </select>
                  </div>
                  <div className="text-sm text-gray-700 whitespace-pre-wrap">
                    {complaint.message}
                  </div>
                  {complaint.response && (
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-sm font-medium text-gray-900">Yanıt:</p>
                      <p className="text-sm text-gray-700 mt-1">{complaint.response}</p>
                    </div>
                  )}
                </div>
              </li>
            ))}
            {complaints.length === 0 && (
              <li className="p-4 text-center text-gray-500">
                Henüz hiç şikayet bulunmuyor.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
} 