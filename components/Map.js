import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";

const Map = ({ searchResults }) => {
	const [selectedLocation, setSelectedLocation] = useState({});
	const coordinates = searchResults.map((result) => ({
		longitude: result.long,
		latitude: result.lat,
	}));

	const center = getCenter(coordinates);

	const [viewport, setViewport] = useState({
		width: "100%",
		height: "100%",
		latitude: center.latitude,
		longitude: center.longitude,
		zoom: 11,
	});

	return (
		<ReactMapGL
			mapStyle="mapbox://styles/sethmwebi/cky1aaiwg1zyo15nswthteycr"
			mapboxApiAccessToken={process.env.mapbox_key}
			{...viewport}
			onViewportChange={(nextViewport) => setViewport(nextViewport)}
		>
			{searchResults.map((result, index) => (
				<div key={index}>
					<Marker
						key={index}
						longitude={result.long}
						latitude={result.lat}
						offsetLeft={-20}
						offsetTop={-10}
					>
						<p
							onClick={() => setSelectedLocation(result)}
							className="cursor-pointer text-2xl animate-bounce"
							aria-label="push-pin"
							role="img"
						>
							📌
						</p>
					</Marker>

					{selectedLocation.long === result.long && (
						<Popup
							closeOnClick={true}
							onClose={() => setSelectedLocation({})}
							latitude={result.lat}
							longitude={result.long}
						>
							{result.title}
						</Popup>
					)}
				</div>
			))}
		</ReactMapGL>
	);
};

export default Map;
