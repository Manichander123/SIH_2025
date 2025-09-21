import React from 'react';
import { Destination } from '../types';
import { destinations } from '../data/destinations';

interface DestinationsProps {
  onExploreDestination: (destination: Destination) => void;
}

const Destinations: React.FC<DestinationsProps> = ({ onExploreDestination }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Popular Destinations</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest) => (
            <div 
              key={dest.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onExploreDestination(dest)}
            >
              <img 
                src={dest.image} 
                alt={dest.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{dest.name}</h3>
                <p className="text-sm text-gray-500">{dest.state}</p>
                <p className="mt-2 text-gray-600 text-sm line-clamp-3">{dest.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
