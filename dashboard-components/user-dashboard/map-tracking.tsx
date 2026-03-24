import { trackingPath } from '@/constants/coordinations';
import { RoutePoint } from '@/types/mapt';
import {
    GoogleMap,
    Marker,
    Polyline,
    useJsApiLoader,
} from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';

const containerStyle = {
    width: '100%',
    height: '400px',
};

const center = {
    lat: 23.6978,
    lng: 90.509,
};

const MapTracking = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyA_mB0WZPBVwtoMxQWvPTYe2oo6SdmihIQ',
        libraries: ['places'],
    });

    const [map, setMap] = React.useState<google.maps.Map | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [carLocation, setCarLocation] = useState<RoutePoint>(trackingPath[0]);

    const onLoad = React.useCallback(function callback(map: google.maps.Map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(
        map: google.maps.Map,
    ) {
        setMap(null);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % trackingPath.length;
                setCarLocation(trackingPath[nextIndex]);
                return nextIndex;
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    if (!isLoaded) return <div>Loading Maps...</div>;

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {/* Child components, such as markers, info windows, etc. */}
            <>
                <Polyline
                    path={trackingPath.map((p) => ({ lat: p.lat, lng: p.lng }))}
                    options={{
                        strokeColor: '#2196F3',
                        strokeOpacity: 0.8,
                        strokeWeight: 5,
                    }}
                />

                {/* 2. The Animated Car Marker */}
                <Marker
                    position={{ lat: carLocation.lat, lng: carLocation.lng }}
                    icon={{
                        url: 'https://cdn-icons-png.flaticon.com/512/744/744465.png',
                        // 3. Using window.google check for TS safety
                        scaledSize: window.google
                            ? new window.google.maps.Size(40, 40)
                            : undefined,
                        anchor: window.google
                            ? new window.google.maps.Point(20, 20)
                            : undefined,
                    }}
                />
            </>
        </GoogleMap>
    ) : (
        <></>
    );
};

export default MapTracking;
