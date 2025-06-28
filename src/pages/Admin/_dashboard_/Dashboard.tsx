import React from 'react';
import StatisticsCards from './_components/Card/StatisticsCards'; 
import BarChartRangePicker from './_components/Charts/BarChart/RangePicker';
import YearlyStats from './_components/Charts/BarChart/YearlyStats';
import LineChart from './_components/Charts/LineChart/LineChart';
import { TopProducts } from './_components/TopProducts/TopProducts';
import TopUsers from './_components/TopUsers/_component/TopUsers';

const DashboardNew: React.FC = () => {
    return (
        <>
            <div className='mb-3 ml-3'>
                <StatisticsCards />
            </div>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-1'>
                <div className='rounded-lg bg-white p-4 shadow'>
                    <BarChartRangePicker />
                </div>
                <div className='rounded-lg bg-white p-4 shadow'>
                     <YearlyStats />
                </div>
            </div>
            <div className='item-center mt-[5rem] grid grid-cols-1'>
                <LineChart />
            </div>
            <div>
                <TopProducts  />
            </div>
            <div>
                <TopUsers  />
            </div>
        </>
    );
};

export default DashboardNew;
