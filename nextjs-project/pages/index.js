import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="relative h-96">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-90" />
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-white sm:text-5xl">
                Profesyonel Kuaför Hizmetleri
              </h1>
              <p className="text-xl text-white">
                Uzman ekibimizle sizlere en iyi hizmeti sunuyoruz
              </p>
              {!session && (
                <Link
                  href="/auth/register"
                  className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
                >
                  Hemen Kayıt Ol
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Hizmetlerimiz
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Saç Kesimi</h3>
            <p className="text-gray-600">
              Profesyonel saç kesimi hizmetimizle istediğiniz görünüme kavuşun
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Saç Boyama</h3>
            <p className="text-gray-600">
              Kaliteli ürünlerle uzman ekibimiz tarafından saç boyama hizmeti
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Saç Bakımı</h3>
            <p className="text-gray-600">
              Saç sağlığınız için özel bakım ve tedavi uygulamaları
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-50 p-8 rounded-lg text-center space-y-4">
        <h2 className="text-2xl font-bold text-indigo-600">
          Hemen Randevu Alın
        </h2>
        <p className="text-gray-600">
          Size en uygun zamanda randevunuzu oluşturun
        </p>
        {session ? (
          <Link
            href="/appointments/new"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-indigo-700 transition-colors"
          >
            Randevu Al
          </Link>
        ) : (
          <Link
            href="/auth/login"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-indigo-700 transition-colors"
          >
            Giriş Yap
          </Link>
        )}
      </div>

      {/* Contact Section */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          İletişim
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Adres</h3>
            <p className="text-gray-600">
              Örnek Mahallesi, Örnek Sokak No:123
              <br />
              İstanbul, Türkiye
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">İletişim Bilgileri</h3>
            <p className="text-gray-600">
              Telefon: (0212) 123 45 67
              <br />
              E-posta: info@kuaforsalonu.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 