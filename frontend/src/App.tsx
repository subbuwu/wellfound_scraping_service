import React, { useState } from 'react';
import { 
  Zap, 
  Filter, 
  TrendingUp, 
  Star, 
  Github
} from 'lucide-react';
import JobsList from './components/JobsList';
import SearchForm from './components/SearchForm';
import ConvoBox from './components/ConvoBox';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Toaster, toast } from "sonner";
import { Job, CompanyType } from './types';

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
    <div 
      className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 
      py-8 relative overflow-hidden"
      style={{fontFamily: "Inter"}}
    >
      <div 
        className="fixed top-[20%] right-[10%] w-80 h-80 
        bg-yellow-200 rounded-full opacity-30 blur-3xl"
      />
      <div 
        className="fixed top-[20%] left-[20%] w-80 h-80 
        bg-yellow-200 rounded-full opacity-30 blur-3xl"
      />

      <Toaster richColors position='top-center'/>
      
      <div className="xl:max-w-[95%] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center space-x-4 mb-4">
            <h1 
              className="tracking-tight font-bold text-4xl text-transparent 
              bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 
              sm:text-5xl flex gap-0.5"
              style={{fontFamily: "Poppins"}}
            >
              <svg fill="currentColor" viewBox="0 0 554.89997 266.70002" width="50" className="mt-2 text-black"><path d="M 80.9,263.59999 0,2.9999988 H 75.3 L 123,190.39999 174.9,2.9999988 h 75.5 L 302.3,190.39999 350,2.9999988 h 75.3 L 343.5,263.59999 H 263.3 L 212.7,75.399999 161.1,263.59999 H 80.9 Z"></path><circle cx="511.09995" cy="222.89999" fill="#EC2E3A" r="43.799999"></circle><circle cx="511.09995" cy="43.799999" fill="#EC2E3A" r="43.799999"></circle></svg>
              ellfound Job Scraper
            </h1>
          </div>
          
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
            Discover your next opportunity with intelligent job search and startup insights
          </p>

          <div className="flex justify-center space-x-4 mt-6">
            <a href="https://github.com/subbuwu/wellfound_scraping_service" target="_blank" rel="noopener noreferrer">
              <Button 
                variant="outline" 
                className="border-purple-300 hover:bg-purple-50 
                group transition-all duration-300 
                hover:border-purple-500"
              >
                <Github className="mr-2 group-hover:rotate-[360deg] transition-transform duration-500" />
                View Project
              </Button>
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="md:col-span-2 backdrop-blur-sm bg-white/70  transition-all duration-300 
          border-purple-100 border-2">
            <CardContent className="pt-6">
              <SearchForm onSearch={fetchJobs} loading={loading} />
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/70 
          hover:shadow-xl transition-all duration-300
          border-blue-100 border-2 hidden md:block">
            <CardHeader>
              <CardTitle className="flex items-center">
                Quick Search Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Zap className="mr-2 text-blue-500" />
                  <span>Multiple Keyword Search</span>
                </div>
                <div className="flex items-center">
                  <Filter className="mr-2 text-green-500" />
                  <span>Smart Job Filtering</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="mr-2 text-purple-500" />
                  <span>Prioritized Results</span>
                </div>
                <div className="flex items-center">
                  <Star className="mr-2 text-yellow-500" />
                  <span>Featured Startup Highlights</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-3">
            <JobsList jobs={jobs} loading={loading} />
          </div>
          <ConvoBox />
        </div>
      </div>
    </div>
  );
};

export default App;