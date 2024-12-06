import React, { useState } from 'react';
import JobsList from './components/JobsList';
import SearchForm from './components/SearchForm';
import { Card, CardContent } from './components/ui/card';
import { Job, CompanyType } from './types';
import { Toaster,toast } from "sonner"

const App: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchJobs = async (keywords: string[]): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/search-jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userKeywords: keywords }),
      });
      
      if (!response.ok) {
        toast.error('Failed to fetch jobs')
        throw new Error('Failed to fetch jobs');
      }
      
      const data: Job[] = await response.json();
      const sortedJobs = sortJobsByPriority(data);
      toast.success(` ${data.length} Jobs Found !`)
      setJobs(sortedJobs);
    } catch (err) {
      toast.error('Error, please try again !')
    } finally {
      setLoading(false);
    }
  };

  const sortJobsByPriority = (jobsData: Job[]): Job[] => {
    const priorityOrder: Record<CompanyType, number> = {
      'StartupSearchResult': 1,
      'FeaturedStartups': 2,
      'PromotedResult': 3
    };

    return [...jobsData].sort((a, b) => 
      priorityOrder[a.company_type] - priorityOrder[b.company_type]
    );
  };

  return (
    <div className="min-h-screen bg-blue-50 py-8" style={{fontFamily : "Inter"}}>
      <Toaster richColors position='top-center'/>
      <div className="xl:max-w-[95%] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="mt-2 text-center tracking-tight font-semibold text-4xl text-[#1E0E62] sm:text-5xl"
          style={{fontFamily : "Poppins"}}
          >
            Wellfound Job Scraper Service
          </h1>
          <span><a className='text-lg underline text-neutral-800 transition-all duration-100 hover:text-blue-500' href="https://github.com/subbuwu/wellfound_scraping_service" target='__blank'>Repo Link</a></span>
          
          <Card className="my-8 max-w-lg mx-auto">
            <CardContent className="pt-6">
              <SearchForm onSearch={fetchJobs} loading={loading} />
            </CardContent>
          </Card>
          
          <JobsList jobs={jobs} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default App;