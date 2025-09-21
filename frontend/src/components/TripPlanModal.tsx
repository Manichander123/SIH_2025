import React, { useState, useEffect } from 'react';
import {
  X, MapPin, Calendar, Users, DollarSign, Shield,
  Mountain, Heart, Leaf, Utensils, Sparkles
} from 'lucide-react';

interface TripPlanFormData {
  destination: string;
  duration: number;
  budget: string;
  tripType: 'cultural' | 'adventure' | 'spiritual' | 'nature' | 'food';
  safetyMonitoring: boolean;
  numberOfPeople: number;
}

interface TripPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (tripPlan: TripPlanFormData) => void;
  initialData?: TripPlanFormData; // ✅ new optional prop
}

const TripPlanModal: React.FC<TripPlanModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const initialFormData: TripPlanFormData = {
    destination: '',
    duration: 3,
    budget: '',
    tripType: 'cultural',
    safetyMonitoring: false,
    numberOfPeople: 2,
  };

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<TripPlanFormData>(initialFormData);

  // ✅ Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      if (initialData) {
        setFormData(initialData); // pre-fill with existing data
      } else {
        setFormData(initialFormData); // fresh plan
      }
    }
  }, [isOpen, initialData]);

  const indianDestinations = [
    'Agra, Uttar Pradesh', 'Jaipur, Rajasthan', 'Kerala Backwaters', 'Goa', 'Ladakh, Jammu & Kashmir',
    'Varanasi, Uttar Pradesh', 'Mumbai, Maharashtra', 'Delhi', 'Rishikesh, Uttarakhand', 'Udaipur, Rajasthan',
    'Hampi, Karnataka', 'Darjeeling, West Bengal', 'Manali, Himachal Pradesh', 'Kochi, Kerala', 'Mysore, Karnataka'
  ];

  const tripTypes = [
    { id: 'cultural', name: 'Cultural', icon: <Heart className="w-6 h-6" />, color: 'bg-purple-100 text-purple-700' },
    { id: 'adventure', name: 'Adventure', icon: <Mountain className="w-6 h-6" />, color: 'bg-red-100 text-red-700' },
    { id: 'spiritual', name: 'Spiritual', icon: <Sparkles className="w-6 h-6" />, color: 'bg-yellow-100 text-yellow-700' },
    { id: 'nature', name: 'Nature', icon: <Leaf className="w-6 h-6" />, color: 'bg-green-100 text-green-700' },
    { id: 'food', name: 'Food & Culinary', icon: <Utensils className="w-6 h-6" />, color: 'bg-orange-100 text-orange-700' }
  ];

  if (!isOpen) return null;

  const handleNext = () => step < 3 && setStep(step + 1);
  const handlePrev = () => step > 1 && setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: keyof TripPlanFormData, value: string | number | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Plan Your Perfect Trip</h2>
              <p className="text-gray-600 mt-1">Step {step} of 3 - Let's create your dream journey</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center">
              {[1, 2, 3].map((stepNum) => (
                <React.Fragment key={stepNum}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    stepNum <= step ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {stepNum}
                  </div>
                  {stepNum < 3 && (
                    <div className={`flex-1 h-2 mx-2 rounded ${
                      stepNum < step ? 'bg-orange-500' : 'bg-gray-200'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>Destination</span>
              <span>Preferences</span>
              <span>Details</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6">
                {/* Destination */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Where would you like to go?
                  </label>
                  <select
                    value={formData.destination}
                    onChange={(e) => handleInputChange('destination', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select your destination</option>
                    {indianDestinations.map((dest) => (
                      <option key={dest} value={dest}>{dest}</option>
                    ))}
                  </select>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    How many days? ({formData.duration} days)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="21"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>1 day</span>
                    <span>21 days</span>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                {/* Trip Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    What type of experience are you looking for?
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {tripTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => handleInputChange('tripType', type.id)}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          formData.tripType === type.id
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${type.color}`}>
                            {type.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{type.name}</h4>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <DollarSign className="w-4 h-4 inline mr-2" />
                    Budget per person (Optional)
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select budget range</option>
                    <option value="budget">Budget (₹5,000 - ₹15,000)</option>
                    <option value="mid-range">Mid-range (₹15,000 - ₹35,000)</option>
                    <option value="luxury">Luxury (₹35,000+)</option>
                  </select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                {/* Travelers */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Users className="w-4 h-4 inline mr-2" />
                    Number of travelers ({formData.numberOfPeople} people)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.numberOfPeople}
                    onChange={(e) => handleInputChange('numberOfPeople', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>Solo</span>
                    <span>Group (10+)</span>
                  </div>
                </div>

                {/* Safety Monitoring */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-1" />
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.safetyMonitoring}
                        onChange={(e) => handleInputChange('safetyMonitoring', e.target.checked)}
                        className="mr-3 w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <span className="font-semibold text-blue-800">Enable Safety Monitoring</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={handlePrev}
                disabled={step === 1}
                className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Previous
              </button>
              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={step === 1 && !formData.destination}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  Create My Trip
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TripPlanModal;
