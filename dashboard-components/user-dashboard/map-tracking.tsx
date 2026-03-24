import {
    DirectionsRenderer,
    DirectionsService,
    GoogleMap,
    Marker,
    useJsApiLoader,
} from '@react-google-maps/api';
import { useCallback, useEffect, useState } from 'react';

const containerStyle = {
    width: '100%',
    height: '400px',
};

const origin = { lat: 23.6978, lng: 90.509 };
const destination = { lat: 23.5303, lng: 90.7187 };

const MapTracking = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyA_mB0WZPBVwtoMxQWvPTYe2oo6SdmihIQ',
        libraries: ['places', 'geometry'],
    });

    const [directionsResponse, setDirectionsResponse] =
        useState<google.maps.DirectionsResult | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [carLocation, setCarLocation] = useState<google.maps.LatLng | null>(
        null,
    );
    const [hasReached, setHasReached] = useState<boolean>(false);

    const directionsCallback = useCallback(
        (
            result: google.maps.DirectionsResult | null,
            status: google.maps.DirectionsStatus,
        ) => {
            if (status === 'OK' && result) {
                setDirectionsResponse(result);
                setCarLocation(result.routes[0].overview_path[0]);
            }
        },
        [],
    );

    useEffect(() => {
        if (!directionsResponse || hasReached) return;

        const path = directionsResponse.routes[0].overview_path;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex + 1;

                // CHECK: If we reached the last coordinate
                if (nextIndex >= path.length - 1) {
                    setHasReached(true);
                    setCarLocation(path[path.length - 1]);
                    clearInterval(interval);
                    return path.length - 1;
                }

                setCarLocation(path[nextIndex]);
                return nextIndex;
            });
        }, 500); // Speed set to 1s for testing

        return () => clearInterval(interval);
    }, [directionsResponse, hasReached]);

    if (!isLoaded) return <div>Loading Maps...</div>;

    return (
        <GoogleMap mapContainerStyle={containerStyle} center={origin} zoom={12}>
            {!directionsResponse && (
                <DirectionsService
                    options={{
                        origin,
                        destination,
                        travelMode: google.maps.TravelMode.DRIVING,
                    }}
                    callback={directionsCallback}
                />
            )}

            {directionsResponse && (
                <DirectionsRenderer
                    options={{
                        directions: directionsResponse,
                        polylineOptions: {
                            strokeColor: '#1976D2',
                            strokeWeight: 5,
                        },
                        suppressMarkers: true,
                    }}
                />
            )}

            {carLocation && (
                <Marker
                    position={carLocation}
                    // Add a label only when reached
                    label={
                        hasReached
                            ? {
                                  text: 'Reached',
                                  color: '#000000',
                                  fontWeight: 'bold',
                                  className: 'marker-label',
                              }
                            : undefined
                    }
                    icon={{
                        path: window.google
                            ? window.google.maps.SymbolPath.CIRCLE
                            : 0,
                        // Change color to Green (#00FF00) when reached, otherwise Red
                        fillColor: hasReached ? '#00FF00' : '#FF0000',
                        fillOpacity: 1.0,
                        strokeColor: '#FFFFFF',
                        strokeWeight: 2,
                        scale: hasReached ? 12 : 8, // Make it slightly larger when reached
                    }}
                />
            )}
        </GoogleMap>
    );
};

export default MapTracking;
