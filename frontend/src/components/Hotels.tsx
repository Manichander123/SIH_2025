import React from 'react';
import { hotels } from '../data/hotels';
import { Star, MapPin, Wifi, Car, Coffee, Waves } from 'lucide-react';

const Hotels: React.FC = () => {
  const getAmenityIcon = (amenity: string) => {
    const icons = {
      'Luxury Spa': <Waves className="w-4 h-4" />,
      'Fine Dining': <Coffee className="w-4 h-4" />,
      'Beach Access': <Waves className="w-4 h-4" />,
      'Water Sports': <Waves className="w-4 h-4" />,
      'WiFi': <Wifi className="w-4 h-4" />,
      'Parking': <Car className="w-4 h-4" />
    };
    return icons[amenity as keyof typeof icons] || <Star className="w-4 h-4" />;
  };

  return (
    <section id="hotels" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Luxury
            <span className="block bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Accommodations
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From heritage palaces to modern luxury resorts, discover exceptional places to stay 
            that offer comfort, authentic experiences, and memories to last a lifetime.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Destination</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                <option>Select destination</option>
                <option>Rajasthan</option>
                <option>Kerala</option>
                <option>Goa</option>
                <option>Himachal Pradesh</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Check-in</label>
              <input 
                type="date" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Check-out</label>
              <input 
                type="date" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-end">
              <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
                Search Hotels
              </button>
            </div>
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {hotels.map((hotel) => (
            <div 
              key={hotel.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={hotel.image} 
                  alt={hotel.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <div className="flex items-center">
                    {[...Array(hotel.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Available
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{hotel.name}</h3>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{hotel.location}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {hotel.description}
                </p>
                
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {hotel.amenities.slice(0, 4).map((amenity, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      {getAmenityIcon(amenity)}
                      <span className="ml-2 text-xs">{amenity}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-800">{hotel.price}</span>
                    <div className="text-xs text-gray-500">per night</div>
                  </div>
                  <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Special Offers */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">Special Offers & Packages</h3>
            <p className="text-lg mb-8 text-blue-100 max-w-2xl mx-auto">
              Discover exclusive deals and curated packages that combine luxury accommodations 
              with unique experiences for the perfect Indian getaway.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h4 className="text-xl font-semibold mb-2">Heritage Package</h4>
                <p className="text-sm text-blue-100 mb-4">Stay in royal palaces with cultural tours</p>
                <span className="text-2xl font-bold">25% OFF</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h4 className="text-xl font-semibold mb-2">Wellness Retreat</h4>
                <p className="text-sm text-blue-100 mb-4">Spa treatments and yoga sessions included</p>
                <span className="text-2xl font-bold">30% OFF</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h4 className="text-xl font-semibold mb-2">Adventure Special</h4>
                <p className="text-sm text-blue-100 mb-4">Mountain lodges with trekking guides</p>
                <span className="text-2xl font-bold">20% OFF</span>
              </div>
            </div>
            <button className="mt-8 bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
              View All Offers
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hotels;