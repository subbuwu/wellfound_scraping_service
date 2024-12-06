export type CompanyType = 'StartupSearchResult' | 'FeaturedStartups' | 'PromotedResult';

export interface Job {
  job_title: string;
  company_name: string;
  salary: string;
  company_type: CompanyType;
}

export interface SearchFormProps {
  onSearch: (keywords: string[]) => Promise<void>;
  loading: boolean;
}

export interface JobsListProps {
  jobs: Job[];
  loading: boolean;
}
