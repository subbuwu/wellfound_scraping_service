import React from 'react';
import { Building2, DollarSign, Award } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { JobsListProps, CompanyType } from '../types';

const JobsList: React.FC<JobsListProps> = ({ jobs, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="h-48"></CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!jobs.length) {
    return (
      <div className="text-center text-gray-500 mt-8">
        No jobs found. Try searching with different keywords.
      </div>
    );
  }

  const getBadgeColor = (type: CompanyType): string => {
    switch (type) {
      case 'StartupSearchResult':
        return 'bg-blue-200 text-blue-800 hover:bg-blue-200';
      case 'FeaturedStartups':
        return 'bg-blue-100 text-purple-800 hover:bg-blue-100';
      case 'PromotedResult':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 hover:bg-none lg:grid-cols-3 gap-4">
      {jobs.map((job, index) => (
        <Card key={index} className="hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-semibold text-lg leading-tight">
                {job.job_title}
              </h3>
              <Badge className={getBadgeColor(job.company_type)}>
                {job.company_type.replace(/([A-Z])/g, ' $1').trim()}
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <Building2 className="h-4 w-4 mr-2" />
                {job.company_name}
              </div>

              <div className="flex items-center text-gray-600">
                <DollarSign className="h-4 w-4 mr-2" />
                {job.salary}
              </div>

              {job.company_type === 'FeaturedStartups' && (
                <div className="flex items-center text-purple-600">
                  <Award className="h-4 w-4 mr-2" />
                  Featured Opportunity
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default JobsList;