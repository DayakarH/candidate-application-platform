import type { JobsAPIResponse } from './types';

const API_URL = import.meta.env.VITE_API_URL as string;

export async function fetchJobsFromAPI(
  offset = 0,
  limit = 12
): Promise<JobsAPIResponse> {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const body = JSON.stringify({
    limit,
    offset,
  });

  const requestOptions: RequestInit = {
    method: 'POST',
    headers,
    body,
  };

  try {
    const response = await fetch(API_URL, requestOptions);
    const data = await response.json();
    if (response.ok) {
      return data as JobsAPIResponse;
    } else {
      throw new Error(`Error fetching jobs: ${data.message}`);
    }
  } catch (error) {
    throw new Error(`Error fetching jobs: ${error}`);
  }
}
