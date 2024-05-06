import { LIMIT } from './constants';
import type { JobsAPIResponse } from './types';

const API_URL = import.meta.env.VITE_API_URL as string;

export async function fetchJobsFromAPI(
  offset = 0,
  limit = LIMIT
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

const formatter = new Intl.RelativeTimeFormat(undefined, {
  numeric: 'auto',
});

const DIVISIONS = [
  { amount: 60, name: 'seconds' },
  { amount: 60, name: 'minutes' },
  { amount: 24, name: 'hours' },
  { amount: 7, name: 'days' },
  { amount: 4.34524, name: 'weeks' },
  { amount: 12, name: 'months' },
  { amount: Number.POSITIVE_INFINITY, name: 'years' },
];

export function formatTimeAgo(date: Date, prefix: string) {
  let duration = (date.getTime() - new Date().getTime()) / 1000;

  for (let i = 0; i < DIVISIONS.length; i++) {
    const division = DIVISIONS[i];
    if (Math.abs(duration) < division.amount) {
      return `${prefix} ${formatter.format(
        Math.round(duration),
        division.name as Intl.RelativeTimeFormatUnit
      )}`;
    }
    duration /= division.amount;
  }
}
