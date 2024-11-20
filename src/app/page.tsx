'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Plane, Building2, Package, ArrowRight } from 'lucide-react';
import SearchBar from '@/components/common/search/SearchBar';
import { POPULAR_DESTINATIONS, SECTION_MOTTOS } from '@/utils/constants';

export default function HomePage() {
  const sections = [
    {
      id: 'flights',
      icon: Plane,
      title: 'Voos',
      motto: SECTION_MOTTOS.flights,
      href: '/flights'
    },
    {
      id: 'hotels',
      icon: Building2,
      title: 'Hotéis',
      motto: SECTION_MOTTOS.hotels,
      href: '/hotels'
    },
    {
      id: 'packages',
      icon: Package,
      title: 'Pacotes',
      motto: SECTION_MOTTOS.packages,
      href: '/packages'
    }
  ];

  return (
    <>
      <section className="relative h-[600px] -mt-16">
        <div className="absolute inset-0">
          <Image
            src="/images/Background-blue.jpg"
            alt="Destinos paradisíacos"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 text-shadow">
              Sua próxima aventura começa aqui
            </h1>
            <p className="text-xl md:text-2xl text-center mb-8 text-shadow">
              Encontre as melhores ofertas em voos, hotéis e pacotes
            </p>
            <div className="w-full max-w-4xl">
              <SearchBar type="packages" className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-6" />
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sections.map(({ id, icon: Icon, title, motto, href }) => (
            <div key={id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-8 h-8 text-primary" />
                <Link key={`${id}-view-all`} href={href} className="text-primary hover:underline">
                  Ver todos
                </Link>
              </div>
              <h2 className="text-2xl font-bold mb-2">{title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{motto}</p>
              <Link
                key={`${id}-search`}
                href={href}
                className="btn btn-primary w-full flex items-center justify-center"
              >
                Buscar {title} <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 mt-12">
        <h2 className="text-3xl font-bold mb-8">Destinos Populares</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {POPULAR_DESTINATIONS.map((destination) => (
            <Link
              key={destination.id}
              href={`/packages?destination=${destination.id}`}
              className="group relative h-64 rounded-lg overflow-hidden"
            >
              <Image
                src={destination.image}
                alt={destination.name}
                width={400}
                height={300}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-1">{destination.name}</h3>
                <p className="text-sm">{destination.country}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-primary text-white py-16 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Receba Ofertas Exclusivas
          </h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Cadastre-se para receber as melhores ofertas de viagens
            diretamente no seu email.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Seu melhor email"
              className="flex-1 px-4 py-2 rounded-md text-gray-900"
            />
            <button type="submit" className="btn btn-outline text-white border-white hover:bg-white hover:text-primary">
              Cadastrar
            </button>
          </form>
        </div>
      </section>
    </>
  );
}