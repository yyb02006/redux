import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

const testAsync = async (delay: number, setState: Dispatch<SetStateAction<boolean>>) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve('5 seconds have passed');
    }, delay);
  });
  setState(true);
};

const Testimonials = () => {
  const [asyncData, setAsyncData] = useState(false);
  useEffect(() => {
    testAsync(2000, setAsyncData);
  }, []);
  return (
    <div>
      {asyncData ? (
        <div style={{ width: '500px', height: '500px', background: 'crimson' }}>Testimonials</div>
      ) : (
        'Testimonials'
      )}
    </div>
  );
};

const CourseList = () => {
  const [asyncData, setAsyncData] = useState(false);
  useEffect(() => {
    testAsync(5000, setAsyncData);
  }, []);
  return (
    <div>
      {asyncData ? (
        <div style={{ width: '500px', height: '500px', background: 'violet' }}>CourseList</div>
      ) : (
        'CourseList'
      )}
    </div>
  );
};

// Network Waterfall & Component Waterfall
const CourseWrapper = ({ children }: { children: React.ReactNode }) => {
  const [asyncData, setAsyncData] = useState(false);
  useEffect(() => {
    testAsync(5000, setAsyncData);
  }, []);
  return <>{asyncData && children}</>;
};

export default function Course() {
  return (
    <CourseWrapper>
      <CourseList />
      <Testimonials />
    </CourseWrapper>
  );
}
