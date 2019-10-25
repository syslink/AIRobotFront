import React from 'react';
//import Guide from '@/components/Guide';
import Overview from './Overview';
import CompetitionList from './Competitions';
import DevelopList from './Developers'
import ClubList from './Clubs'

export default function Dashboard() {
  return (
    <div>
      <Overview />
      <br /> <br />
      <DevelopList />
      <br /> <br />
      <ClubList />
      <br /> <br />
      <CompetitionList />
    </div>
  );
}
