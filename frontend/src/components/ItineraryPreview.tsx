import React from 'react';
import { X, Save, Edit, Send, Calendar, Users, Wallet } from 'lucide-react';
import { TripPlan } from '../types';

interface ItineraryPreviewProps {
  isOpen: boolean;
  tripPlan: TripPlan | null;
  onClose: () => void;
  onSave: (itineraryText: string) => void;
  onEdit: () => void;
  onBookNow: () => void;
}

const ItineraryPreview: React.FC<ItineraryPreviewProps> = ({
  isOpen,
  tripPlan,
  onClose,
  onSave,
  onEdit,
  onBookNow
}) => {
  if (!isOpen || !tripPlan) return null;

  // Generate a simple 3-day itinerary
  const generateItineraryText = (): string => {
    const firstDestination = tripPlan.destination || 'your chosen destination';

    return `
      <h3 class="text-lg font-semibold mb-2">Day 1: Arrival and Exploration</h3>
      <p class="mb-4">Arrive at ${firstDestination}. Check into your hotel and enjoy a relaxing evening exploring the local markets.</p>
      <h3 class="text-lg font-semibold mb-2">Day 2: Sightseeing</h3>
      <p class="mb-4">Visit the most famous landmarks and enjoy a traditional lunch. In the evening, experience a local cultural show.</p>
      <h3 class="text-lg font-semibold mb-2">Day 3: Departure</h3>
      <p>Enjoy a final breakfast before departing for your next adventure. We hope you had a wonderful time!</p>
    `;
  };

  const handleSaveClick = () => {
    const itineraryText = generateItineraryText();
    onSave(itineraryText);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Your Custom Itinerary</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Trip Summary */}
        <div className="p-6 overflow-y-auto">
          <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b">
            <div className="flex items-center text-gray-700">
              <Calendar className="w-5 h-5 mr-2 text-orange-500" />
              <span>Destination: <strong>{tripPlan.destination}</strong></span>
            </div>
            <div className="flex items-center text-gray-700">
              <Users className="w-5 h-5 mr-2 text-orange-500" />
              <span><strong>{tripPlan.numberOfPeople}</strong> Travelers</span>
            </div>
            {tripPlan.budget && (
              <div className="flex items-center text-gray-700">
                <Wallet className="w-5 h-5 mr-2 text-orange-500" />
                <span className="capitalize">Budget: <strong>{tripPlan.budget}</strong></span>
              </div>
            )}
          </div>

          {/* Itinerary Content */}
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: generateItineraryText() }}
          />
        </div>

        {/* Footer Buttons */}
        <div className="p-6 mt-auto border-t bg-gray-50 rounded-b-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={handleSaveClick}
              className="flex items-center justify-center w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-all"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Itinerary
            </button>
            <button
              onClick={onEdit}
              className="flex items-center justify-center w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-all"
            >
              <Edit className="w-5 h-5 mr-2" />
              Edit Trip
            </button>
            <button
              onClick={onBookNow}
              className="flex items-center justify-center w-full bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition-all"
            >
              <Send className="w-5 h-5 mr-2" />
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryPreview;
