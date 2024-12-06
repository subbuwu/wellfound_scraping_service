import React from 'react';
import { Building2, DollarSign, Award, MapPin } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { JobsListProps, CompanyType } from '../types';

const JobsList: React.FC<JobsListProps> = ({ jobs, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card 
            key={i} 
            className="animate-pulse bg-gradient-to-br from-gray-100 to-gray-200"
          >
            <CardContent className="h-48 opacity-50"></CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!jobs.length) {
    return (
      <div className="text-center text-gray-500 mt-8 
      bg-white/70 backdrop-blur-sm p-8 rounded-xl 
      border border-purple-100 shadow-lg">
        No jobs found. Try searching with different keywords.
      </div>
    );
  }

  const getBadgeColor = (type: CompanyType): string => {
    switch (type) {
      case 'StartupSearchResult':
        return 'bg-blue-100/70 text-blue-800 hover:bg-blue-200';
      case 'FeaturedStartups':
        return 'bg-purple-100/70 text-purple-800 hover:bg-purple-200';
      case 'PromotedResult':
        return 'bg-green-100/70 text-green-800 hover:bg-green-200';
      default:
        return 'bg-gray-100/70 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job, index) => (
        <Card 
          key={index} 
          className="
            group hover:shadow-xl 
            transition-all duration-300 
            hover:-translate-y-2 
            bg-white/70 backdrop-blur-sm 
            border-2 border-transparent 
            hover:border-purple-200
          "
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="
                font-bold text-lg leading-tight 
                text-transparent bg-clip-text 
                bg-gradient-to-r from-purple-600 to-blue-600
                group-hover:from-blue-600 group-hover:to-purple-600
                transition-all duration-300
              ">
                {job.job_title}
              </h3>
              <Badge className={getBadgeColor(job.company_type)}>
                {job.company_type.replace(/([A-Z])/g, ' $1').trim()}
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <Building2 className="h-4 w-4 mr-2 text-blue-500" />
                {job.company_name}
              </div>

              <div className="flex items-center text-gray-600">
                <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                {job.salary}
              </div>

              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2 text-red-500" />
                {/* Assuming you want to add location if available */}
                Remote / Onsite
              </div>

              {job.company_type === 'FeaturedStartups' && (
                <div className="flex items-center text-purple-600">
                  <Award className="h-4 w-4 mr-2 animate-pulse" />
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