export type JobDetails = {
  jdUid: string;
  jdLink: string;
  jobDetailsFromCompany: string;
  maxJdSalary: number;
  minJdSalary: number;
  salaryCurrencyCode: string;
  location: string;
  minExp: number;
  maxExp: number;
  jobRole: string;
  companyName: string;
  logoUrl: string;
  addedOn: Date | null;
};

export type JobsAPIResponse = {
  jdList: Array<JobDetails>;
  totalCount: number;
};

export type Filters = {
  location: Array<string>;
  minExp: number | null;
  minBasePay: number | null;
  roles: Array<string>;
  companyName: string;
};
