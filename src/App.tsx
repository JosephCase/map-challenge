import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import AddressInput from "./AddressInput";
import "./App.css";
import dropOffBadgeBlank from "./assets/dropOffBadgeBlank.svg";
import dropOffBadgeError from "./assets/dropOffBadgeError.svg";
import dropOffBadgePresent from "./assets/dropOffBadgePresent.svg";
import pickUpBadgeBlank from "./assets/pickUpBadgeBlank.svg";
import pickUpBadgeError from "./assets/pickUpBadgeError.svg";
import pickUpBadgePresent from "./assets/pickUpBadgePresent.svg";
import { MapContext } from "./GoogleMapsProvider";
import mapQueries from "./mapQuery";
import useMarker from "./useMarker";



type Address = {
  address: string;
  latitude?: number;
  longitude?: number;
};

const initialAddressState = { address: "" };

const getPickUpIcon = (address: Address) => {
  if (address.address.trim() === "") {
    return pickUpBadgeBlank;
  } else if (address.latitude) {
    return pickUpBadgePresent;
  } else {
    return pickUpBadgeError;
  }
};

const getdropOffIcon = (address: Address) => {
  if (address.address.trim() === "") {
    return dropOffBadgeBlank;
  } else if (address.latitude) {
    return dropOffBadgePresent;
  } else {
    return dropOffBadgeError;
  }
};

function App() {
  const mapDivRef = useRef(null);
  const mapInstanceRef = useRef<google.maps.Map<never> | null>(null);
  const googleInstance = useContext(MapContext);

  const [createJob, createJobRequest] = mapQueries.useCreateJob();

  // keep these in a seperate state as it allows me to control better
  // the error handling
  const [pickupSearchString, setPickupSearchString] = useState("");
  const [dropoffSearchString, setDropoffSearchString] = useState("");

  const [pickupAddress, setPickupAddress] =
    useState<Address>(initialAddressState);
  const [dropOffAddress, setDropOffAddress] =
    useState<Address>(initialAddressState);

  const [showToast, setShowToast] = useState(false);

  useMarker(mapInstanceRef.current, pickupAddress, "/pickUpMarker.svg");
  useMarker(mapInstanceRef.current, dropOffAddress, "/dropOffMarker.svg");

  // init the map
  useEffect(() => {
    if (googleInstance && mapDivRef.current) {
      mapInstanceRef.current = new googleInstance.maps.Map(mapDivRef.current, {
        center: { lat: 48.8566, lng: 2.3522 },
        zoom: 13,
        disableDefaultUI: true,
      });
    }
  }, [mapDivRef, googleInstance]);

  const handlePickupSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
    const address = e.target.value;
    if (address.trim() !== "") {
      try {
        // not directly using useQuery as I need to control when it executes
        const geocodeRequest = await mapQueries.getGeocode({
          address,
        });
        setPickupAddress({ address, ...geocodeRequest.data.geocode });
      } catch (error) {
        setPickupAddress({ address });
      }
    } else {
      setPickupAddress({ address });
    }
  };

  const handleDropOffSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
    const address = e.target.value;
    if (address.trim() !== "") {
      try {
        const geocodeRequest = await mapQueries.getGeocode({
          address,
        });
        setDropOffAddress({ address, ...geocodeRequest.data.geocode });
      } catch (error) {
        setDropOffAddress({ address });
      }
    } else {
      setDropOffAddress({ address });
    }
  };

  const handleSubmit = async () => {
    try {
      await createJob({
        variables: {
          pickup: dropOffAddress.address,
          dropoff: dropOffAddress.address,
        },
      });
      setShowToast(true);
      setPickupSearchString("");
      setDropoffSearchString("");
      setPickupAddress(initialAddressState);
      setDropOffAddress(initialAddressState);
    } catch (error) {
      console.error(error);
    }
  };

  const isSubmitDisabled =
    !pickupAddress.latitude ||
    !pickupAddress.longitude ||
    !dropOffAddress.latitude ||
    !dropOffAddress.longitude ||
    createJobRequest.loading;

  return (
    <>
      <div ref={mapDivRef} className="map"></div>
      <div className="searchBox">
        <div className="row">
          <img
            className="badge"
            src={getPickUpIcon(pickupAddress)}
            alt="pickup icon"
          />
          <AddressInput
            value={pickupSearchString}
            onChange={(e) => setPickupSearchString(e.target.value)}
            onSubmit={handlePickupSubmit}
            placeholder="Pick up address"
          />
        </div>
        <div className="row">
          <img
            className="badge"
            src={getdropOffIcon(dropOffAddress)}
            alt="dropoff icon"
          />
          <AddressInput
            value={dropoffSearchString}
            onChange={(e) => setDropoffSearchString(e.target.value)}
            onSubmit={handleDropOffSubmit}
            placeholder="Drop off address"
          />
        </div>
        <div className="row">
          <button
            disabled={isSubmitDisabled}
            onClick={handleSubmit}
            className="jobButton"
            // this is a bit crude
            style={{ opacity: isSubmitDisabled ? "50%" : "100%" }}
          >
            {createJobRequest.loading ? "Creating..." : "Create job"}
          </button>
        </div>
      </div>
      {showToast && (
        <div onClick={() => setShowToast(false)} className="toast">
          <p>Job has been created successfully</p>
        </div>
      )}
    </>
  );
}

export default App;
