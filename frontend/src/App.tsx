import { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { WishlistProvider } from './contexts/WishlistContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import Experiences from './components/Experiences';
import Hotels from './components/Hotels';
import Culture from './components/Culture';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import TripPlanModal from './components/TripPlanModal';
import ItineraryPreview from './components/ItineraryPreview';
import DestinationDetail from './components/DestinationDetail';
import Notification from './components/notification';
import Wishlist from './components/Wishlist';
import BookingModal from './components/BookingModal';
import { Destination, TripPlan } from './types';
import { CulturalDestination } from './types/Cultural';

function AppContent() {
  // --- STATE MANAGEMENT FOR MODALS ---
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isTripPlanModalOpen, setIsTripPlanModalOpen] = useState(false);
  const [isItineraryPreviewOpen, setIsItineraryPreviewOpen] = useState(false);
  const [isDestinationDetailOpen, setIsDestinationDetailOpen] = useState(false);
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // --- STATE MANAGEMENT FOR DATA ---
  const [selectedDestination, setSelectedDestination] = useState<Destination | CulturalDestination | null>(null);
  const [currentTripPlan, setCurrentTripPlan] = useState<TripPlan | null>(null);

  // Auth context
  const { user, token } = useAuth();

  // Clear trip plan when user logs out
  useEffect(() => {
    if (!user) {
      setCurrentTripPlan(null);
    }
  }, [user]);

  // --- HANDLERS ---
  const handleStartJourney = () =>
    user ? setIsTripPlanModalOpen(true) : setIsAuthModalOpen(true);

  const handleSignInClick = () => setIsAuthModalOpen(true);
  const handleWishlistClick = () => setIsWishlistModalOpen(true);
  const handleAuthSuccess = () => setIsAuthModalOpen(false);

  const handleExploreDestination = (destination: Destination) => {
    setSelectedDestination(destination);
    setIsDestinationDetailOpen(true);
  };

  const handleExploreCulturalDestination = (destination: CulturalDestination) => {
    setSelectedDestination(destination);
    setIsDestinationDetailOpen(true);
  };

  const handleTripPlanSubmit = (tripPlanData: {
    destination: string;
    duration: number;
    budget: string;
    tripType: 'cultural' | 'adventure' | 'spiritual' | 'nature' | 'food';
    safetyMonitoring: boolean;
    numberOfPeople: number;
  }) => {
    const tripPlan: TripPlan = {
      ...tripPlanData,
      id: currentTripPlan?.id || Date.now().toString(), // ✅ keep same ID if editing
      userId: user?.id || '',
      createdAt: currentTripPlan?.createdAt || new Date(), // ✅ preserve original creation date
      itineraryText: currentTripPlan?.itineraryText || ''
    };
    setCurrentTripPlan(tripPlan);
    setIsTripPlanModalOpen(false);
    setIsItineraryPreviewOpen(true);
  };

  const handleEditTrip = () => {
    setIsItineraryPreviewOpen(false);
    setIsTripPlanModalOpen(true); // ✅ opens modal with prefilled data now
  };

  const handleBookNow = () => {
    setIsItineraryPreviewOpen(false);
    setIsBookingModalOpen(true);
    setCurrentTripPlan(null);
  };

  const handleSaveItinerary = async (itineraryText: string) => {
    if (!currentTripPlan || !token) {
      alert('You must be logged in to save an itinerary.');
      return;
    }

    const planToSave = { ...currentTripPlan, itineraryText };

    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post('http://localhost:5000/api/tripplans', planToSave, config);
      alert('Itinerary saved successfully!');
      setIsItineraryPreviewOpen(false);
      setCurrentTripPlan(null);
    } catch (error) {
      console.error('Failed to save itinerary:', error);
      alert('Failed to save itinerary. Please try again.');
    }
  };

  return (
    <div className="min-h-screen">
      <Header onSignInClick={handleSignInClick} onWishlistClick={handleWishlistClick} />
      <Hero onStartJourney={handleStartJourney} />
      <Destinations onExploreDestination={handleExploreDestination} />
      <Experiences />
      <Hotels />
      <Culture onExploreCulturalDestination={handleExploreCulturalDestination} />
      <Footer />

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      <Wishlist
        isOpen={isWishlistModalOpen}
        onClose={() => setIsWishlistModalOpen(false)}
        onExploreDestination={handleExploreDestination}
        onPlanTrip={() => {
          setIsWishlistModalOpen(false);
          setIsTripPlanModalOpen(true);
        }}
      />

      {/* ✅ Pass existing plan to modal if editing */}
      <TripPlanModal
        isOpen={isTripPlanModalOpen}
        onClose={() => setIsTripPlanModalOpen(false)}
        onSubmit={handleTripPlanSubmit}
        initialData={currentTripPlan || undefined}
      />

      <ItineraryPreview
        isOpen={isItineraryPreviewOpen}
        tripPlan={currentTripPlan}
        onClose={() => setIsItineraryPreviewOpen(false)}
        onSave={handleSaveItinerary}
        onEdit={handleEditTrip}
        onBookNow={handleBookNow}
      />

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

      <DestinationDetail
        isOpen={isDestinationDetailOpen}
        onClose={() => setIsDestinationDetailOpen(false)}
        destination={selectedDestination}
      />
    </div>
  );
}

function App() {
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const showNotification = (message: string, type: 'success' | 'error' = 'success') =>
    setNotification({ message, type });

  return (
    <AuthProvider showNotification={showNotification}>
      <WishlistProvider showNotification={showNotification}>
        <AppContent />
      </WishlistProvider>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </AuthProvider>
  );
}

export default App;
