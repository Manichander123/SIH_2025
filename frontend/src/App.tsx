import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
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
import { Destination, TripPlan } from './types';

// This is a sub-component that has access to the AuthContext
function AppContent() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isTripPlanModalOpen, setIsTripPlanModalOpen] = useState(false);
  const [isItineraryPreviewOpen, setIsItineraryPreviewOpen] = useState(false);
  const [isDestinationDetailOpen, setIsDestinationDetailOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [currentTripPlan, setCurrentTripPlan] = useState<TripPlan | null>(null);
  const { user } = useAuth();

  const handleStartJourney = () => {
    if (user) {
      setIsTripPlanModalOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };
  
  const handleSignInClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
  };

  const handleTripPlanSubmit = (tripPlanData: Omit<TripPlan, 'id' | 'userId' | 'createdAt'>) => {
    const tripPlan: TripPlan = {
      ...tripPlanData,
      id: Date.now().toString(),
      userId: user?.id || '',
      createdAt: new Date()
    };
    setCurrentTripPlan(tripPlan);
    setIsTripPlanModalOpen(false);
    setIsItineraryPreviewOpen(true);
  };

  const handleExploreDestination = (destination: Destination) => {
    setSelectedDestination(destination);
    setIsDestinationDetailOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Header onSignInClick={handleSignInClick} />
      <Hero onStartJourney={handleStartJourney} />
      <Destinations onExploreDestination={handleExploreDestination} />
      <Experiences />
      <Hotels />
      <Culture />
      <Footer />
      
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
      
      <TripPlanModal 
        isOpen={isTripPlanModalOpen}
        onClose={() => setIsTripPlanModalOpen(false)}
        onSubmit={handleTripPlanSubmit}
      />
      
      {currentTripPlan && (
        <ItineraryPreview 
          isOpen={isItineraryPreviewOpen}
          onClose={() => setIsItineraryPreviewOpen(false)}
          tripPlan={currentTripPlan}
        />
      )}
      
      <DestinationDetail 
        isOpen={isDestinationDetailOpen}
        onClose={() => setIsDestinationDetailOpen(false)}
        destination={selectedDestination}
      />
    </div>
  );
}

// This is the main App component that wraps everything
function App() {
  // State to manage the notification's visibility and content
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Function to show the notification. This gets passed down to AuthProvider.
  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
  };
  
  return (
    // The AuthProvider wraps the app and receives the showNotification function
    <AuthProvider showNotification={showNotification}> 
      <AppContent />
      
      {/* Conditionally render the Notification component when there's a message */}
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

