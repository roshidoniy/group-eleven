import { Card } from '@/components/ui/card';
import React from 'react';

interface Course {
  id: string;
  name: string;
  type: 'Lecture' | 'Lab';
  link: string;
  startTime: string;
}

// Static data for the courses
const courses: Course[] = [
  {
    id: '1',
    name: 'Computer Science 101',
    type: 'Lecture',
    link: 'https://teams.microsoft.com/l/meetup-join/CS101',
    startTime: '09:00 AM'
  },
  {
    id: '2',
    name: 'Computer Science 101',
    type: 'Lab',
    link: 'https://teams.microsoft.com/l/meetup-join/CS101_LAB',
    startTime: '11:00 AM'
  },
  {
    id: '3',
    name: 'Data Structures',
    type: 'Lecture',
    link: 'https://teams.microsoft.com/l/meetup-join/DS',
    startTime: '02:00 PM'
  },
  {
    id: '4',
    name: 'Data Structures',
    type: 'Lab',
    link: 'https://teams.microsoft.com/l/meetup-join/DS_LAB',
    startTime: '04:00 PM'
  },
  {
    id: '5',
    name: 'Web Development',
    type: 'Lecture',
    link: 'https://teams.microsoft.com/l/meetup-join/WEB_DEV',
    startTime: '10:00 AM'
  },
  {
    id: '6',
    name: 'Web Development',
    type: 'Lab',
    link: 'https://teams.microsoft.com/l/meetup-join/WEB_DEV_LAB',
    startTime: '01:00 PM'
  }
];

// Group courses by name
const groupedCourses = courses.reduce((acc, course) => {
  if (!acc[course.name]) {
    acc[course.name] = [];
  }
  acc[course.name].push(course);
  return acc;
}, {} as Record<string, Course[]>);

export default function Home() {
  return (
    <main className="min-h-screen bg-opacity-90">
      <div className='flex flex-row w-full bg-red-100 gap-10 px-10'>
        <Card className="flex-1">
          <h1>Test</h1>
        </Card>
        <Card className="flex-1">
          <h1>Test</h1>
        </Card>
        <Card className="flex-1">
          <h1>Test</h1>
        </Card>
      </div>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#3F5954]">Lecture Links</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(groupedCourses).map(([courseName, courseGroup]) => (
            <Card 
              key={courseName}
              className="bg-[#F7F2E4] rounded-lg border p-6 hover:shadow-lg hover:shadow-[#A5BEA4]/30 transition-all duration-200"
            >
              <h2 className="text-xl font-semibold mb-4 text-[#566B5F]">{courseName}</h2>
              <div className="space-y-4">
                {courseGroup.map((course) => (
                  <div key={course.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${
                        course.type === 'Lecture' ? 'text-[#7D98A1]' : 'text-[#A3825C]'
                      }`}>
                        {course.type}
                      </span>
                      <span className="text-sm text-[#7A7266]">{course.startTime}</span>
                    </div>
                    <a
                      href={course.link}
                      target='_blank'
                      className={`w-full py-2 px-4 rounded-md transition-colors duration-200 block text-center text-white ${
                        course.type === 'Lecture' 
                          ? 'bg-[#6A9A98] hover:bg-[#5D8683]' 
                          : 'bg-[#D1A979] hover:bg-[#BA9568]'
                      }`}
                    >
                      Join {course.type} Meeting
                    </a>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}