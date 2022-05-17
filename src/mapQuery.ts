import { gql, useMutation, useQuery } from "@apollo/client";
import { apolloClient } from ".";

export type Address = { address: string; latitude: number; longitude: number };

type GeocodeRequest = { address: string };
type GeocodeResponse = { geocode: { longitude: number; latitude: number } };

type JobRequest = { pickup: string; dropoff: string };
type JobResponse = { job: { pickup: Address; dropoff: Address } };

const CREATE_JOB = gql`
  mutation CreateJob($pickup: String!, $dropoff: String!) {
    job(pickup: $pickup, dropoff: $dropoff) {
      pickup {
        address
        latitude
        longitude
      }
      dropoff {
        address
        latitude
        longitude
      }
    }
  }
`;

const GET_GEOCODE = gql`
  query GetGeocode($address: String!) {
    geocode(address: $address) {
      longitude
      latitude
    }
  }
`;

const useGetGeocode = (variables: GeocodeRequest) => {
  return useQuery<GeocodeResponse, GeocodeRequest>(GET_GEOCODE, {
    variables,
  });
};

const useCreateJob = () => {
  return useMutation<JobResponse, JobRequest>(CREATE_JOB);
};

const getGeocode = async (variables: GeocodeRequest) => {
  return apolloClient.query<GeocodeResponse, GeocodeRequest>({
    query: GET_GEOCODE,
    variables,
  });
};

const mapQueries = { useGetGeocode, useCreateJob, getGeocode };

export default mapQueries;
