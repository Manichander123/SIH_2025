import React from 'react';
import { Calendar, Music, Palette, Utensils, Users, Camera } from 'lucide-react';

const Culture: React.FC = () => {
  const culturalHighlights = [
    {
      icon: <Music className="w-8 h-8" />,
      title: 'Festivals & Celebrations',
      description: 'Experience vibrant festivals like Diwali, Holi, and regional celebrations throughout the year',
      image: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg'
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Arts & Crafts',
      description: 'Discover traditional handicrafts, textiles, and artwork from skilled local artisans',
      image: 'https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg'
    },
    {
      icon: <Utensils className="w-8 h-8" />,
      title: 'Culinary Traditions',
      description: 'Taste authentic regional cuisines and learn cooking techniques passed down generations',
      image: 'https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Local Communities',
      description: 'Meet and interact with local communities to understand diverse ways of life',
      image: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg'
    }
  ];

  const upcomingEvents = [
    {
      date: 'Nov 12-14',
      title: 'Diwali Festival',
      location: 'Pan India',
      description: 'Festival of Lights celebrated across the country'
    },
    {
      date: 'Dec 15-20',
      title: 'Rajasthan Folk Festival',
      location: 'Jaipur, Rajasthan',
      description: 'Traditional music, dance, and cultural performances'
    },
    {
      date: 'Jan 14',
      title: 'Makar Sankranti',
      location: 'Gujarat & Punjab',
      description: 'Kite flying festival marking the harvest season'
    }
  ];

  return (
    <section id="culture" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Rich Cultural
            <span className="block bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Heritage
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Immerse yourself in India's diverse cultural tapestry, where ancient traditions blend 
            seamlessly with modern life, creating experiences that touch the soul.
          </p>
        </div>

        {/* Cultural Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {culturalHighlights.map((highlight, index) => (
            <div 
              key={index}
              className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0">
                <img 
                  src={highlight.image} 
                  alt={highlight.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-40 transition-all"></div>
              </div>
              
              <div className="relative z-10 p-8 h-80 flex flex-col justify-end text-white">
                <div className="mb-4 text-orange-400">
                  {highlight.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{highlight.title}</h3>
                <p className="text-gray-200 leading-relaxed">{highlight.description}</p>
                <button className="mt-4 inline-flex items-center text-orange-400 font-semibold hover:text-orange-300 transition-colors">
                  Explore More
                  <Camera className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Events */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 text-white mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">Upcoming Cultural Events</h3>
            <p className="text-lg text-orange-100">
              Join authentic cultural celebrations and festivals happening across India
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all">
                <div className="flex items-center mb-4">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span className="font-semibold">{event.date}</span>
                </div>
                <h4 className="text-xl font-bold mb-2">{event.title}</h4>
                <div className="flex items-center text-orange-100 mb-3">
                  <Users className="w-4 h-4 mr-1" />
                  <span className="text-sm">{event.location}</span>
                </div>
                <p className="text-sm text-orange-100">{event.description}</p>
                <button className="mt-4 bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cultural Ambassador Program */}
        <div className="bg-gray-50 rounded-3xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Cultural Ambassador Program</h3>
              <p className="text-lg text-gray-600 mb-6">
                Connect with local cultural ambassadors who will share their knowledge, stories, 
                and traditions to give you an authentic perspective on Indian culture.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Personal cultural guide and storyteller</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Access to exclusive cultural experiences</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Language lessons and cultural workshops</span>
                </div>
              </div>
              <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
                Meet Our Ambassadors
              </button>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg" 
                alt="Cultural ambassador"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">500+</div>
                  <div className="text-sm text-gray-600">Cultural Ambassadors</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Culture;