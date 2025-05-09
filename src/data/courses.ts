export interface LabSession {
  link: string;
  time: {
    hour: number;
    min: number;
    weekdayNumber: number; // 0-6, where 0 is Sunday
  };
}

export interface Course {
  id: string;
  name: string;
  type: "Lecture";
  link: string;
  time: {
    hour: number;
    min: number;
    weekdayNumber: number; 
  };
  lab?: LabSession;
  disabled?: boolean; // Added disabled field
}

// Static data for the courses (Poland time zone - UTC+2)
export const courses: Course[] = [
  {
    id: "1",
    name: "Introduction to Management in IT",
    type: "Lecture",
    link: "https://teams.microsoft.com/dl/launcher/launcher.html?url=/_%23/l/meetup-join/19:meeting_MjI4YzQwZjQtMWVjMS00Yzg1LWJjNGUtZTdhYzhkODBlODE0@thread.v2/0?context%3D%257b%2522Tid%2522%253a%2522e8a52afe-6ea8-47f7-b275-783f7087b5fa%2522%252c%2522Oid%2522%253a%25223de94aa0-3474-472a-b197-bfd262bebca7%2522%257d%26anon%3Dtrue&type=meetup-join&deeplinkId=30ac6017-d190-4f7b-b10b-0c596d29630e&directDl=true&msLaunch=true&enableMobilePage=true&suppressPrompt=true",
    time: { hour: 14, min: 40, weekdayNumber: 1 },
    lab: {
      link: "https://teams.microsoft.com/l/meetup-join/19%3ameeting_ZTdmYTQ4NGYtMjI4MC00ZTQ2LWI0NzUtM2JjNTA3YTUyZTFh%40thread.v2/0?context=%7b%22Tid%22%3a%22e8a52afe-6ea8-47f7-b275-783f7087b5fa%22%2c%22Oid%22%3a%22ad1464e6-f406-49ef-8ff1-b5ab1743acc9%22%7d",
      time: { hour: 16, min: 50, weekdayNumber: 4 },
    },
    disabled: true, // Set to disabled
  },
  {
    id: "2",
    name: "Digital Technologies",
    type: "Lecture",
    link: "https://teams.microsoft.com/l/meetup-join/19%3a1yUI9IO5DhSYf0LdyCc1dHlhI7cygHLZza5p0Q53X8k1%40thread.tacv2/1741603035380?context=%7b%22Tid%22%3a%22e8a52afe-6ea8-47f7-b275-783f7087b5fa%22%2c%22Oid%22%3a%2237c56308-1ce7-4cd5-afb7-bc3504f22219%22%7d",
    time: { hour: 16, min: 50, weekdayNumber: 1 },
    lab: {
      link: "https://teams.microsoft.com/l/meetup-join/19%3a1yUI9IO5DhSYf0LdyCc1dHlhI7cygHLZza5p0Q53X8k1%40thread.tacv2/1741604020192?context=%7b%22Tid%22%3a%22e8a52afe-6ea8-47f7-b275-783f7087b5fa%22%2c%22Oid%22%3a%2237c56308-1ce7-4cd5-afb7-bc3504f22219%22%7d",
      time: { hour: 19, min: 0, weekdayNumber: 1 },
    },
  },
  {
    id: "3",
    name: "Algebra",
    type: "Lecture",
    link: "https://teams.microsoft.com/dl/launcher/launcher.html?url=/_%23/l/meetup-join/19:meeting_ZmU3NmQxMzItMjY5NS00NmNhLThkZTEtYzU3ODA2OGQ0NTEw@thread.v2/0?context%3D%257b%2522Tid%2522%253a%2522e8a52afe-6ea8-47f7-b275-783f7087b5fa%2522%252c%2522Oid%2522%253a%252245d24620-c458-430f-a5e2-1e889ce34adb%2522%257d%26anon%3Dtrue&type=meetup-join&deeplinkId=2a625532-b1c7-4e38-9614-95330ec3d834&directDl=true&msLaunch=true&enableMobilePage=true&suppressPrompt=true",
    time: { hour: 8, min: 0, weekdayNumber: 4 },
    lab: {
      link: "https://teams.microsoft.com/dl/launcher/launcher.html?url=/_%23/l/meetup-join/19:meeting_ODhmZmIwYzAtNDM4Mi00NTI2LTk2N2EtNmZiMjdlNDY0ZWMw@thread.v2/0?context%3D%257b%2522Tid%2522%253a%2522e8a52afe-6ea8-47f7-b275-783f7087b5fa%2522%252c%2522Oid%2522%253a%252245d24620-c458-430f-a5e2-1e889ce34adb%2522%257d%26anon%3Dtrue&type=meetup-join&deeplinkId=2a262df9-f514-46c9-9e2e-957b852bdf63&directDl=true&msLaunch=true&enableMobilePage=true&suppressPrompt=true",
      time: { hour: 16, min: 50, weekdayNumber: 2 },
    },
  },
  {
    id: "4",
    name: "Introduction to Internet Technologies",
    type: "Lecture",
    link: "https://teams.microsoft.com/l/meetup-join/19%3ameeting_ZjQzYzY2OGUtYjZkMS00OTk3LThlZjAtNGNiZTJkNzk0ZDdk%40thread.v2/0?context=%7b%22Tid%22%3a%22e8a52afe-6ea8-47f7-b275-783f7087b5fa%22%2c%22Oid%22%3a%2245d24620-c458-430f-a5e2-1e889ce34adb%22%7d",
    time: { hour: 8, min: 0, weekdayNumber: 2 },
    lab: {
      link: "https://teams.microsoft.com/dl/launcher/launcher.html?url=/_%23/l/meetup-join/19:meeting_Y2M5YzhmNmUtM2Y3Yi00ZTQyLThkYjUtMjQ4OThiY2VhODk0@thread.v2/0?context%3D%257b%2522Tid%2522%253a%2522e8a52afe-6ea8-47f7-b275-783f7087b5fa%2522%252c%2522Oid%2522%253a%252245d24620-c458-430f-a5e2-1e889ce34adb%2522%257d%26anon%3Dtrue&type=meetup-join&deeplinkId=5ab1fc97-baad-4e0a-8940-d5af899e7f95&directDl=true&msLaunch=true&enableMobilePage=true&suppressPrompt=true",
      time: { hour: 19, min: 0, weekdayNumber: 2 },
    },
  },
  {
    id: "5",
    name: "Object Oriented Programming",
    type: "Lecture",
    link: "https://teams.microsoft.com/dl/launcher/launcher.html?url=/_%23/l/meetup-join/19:meeting_ZWNhMWQxZTItOTc4OC00NDBmLTgzNWYtYTE4YmQwODlmMTA5@thread.v2/0?context%3D%257b%2522Tid%2522%253a%2522e8a52afe-6ea8-47f7-b275-783f7087b5fa%2522%252c%2522Oid%2522%253a%2522924a1556-5e14-4faf-9d4a-17b156530661%2522%257d%26anon%3Dtrue&type=meetup-join&deeplinkId=ae7a6a5d-5bf1-417d-9acb-1c6b448c2d8a&directDl=true&msLaunch=true&enableMobilePage=true&suppressPrompt=true",
    time: { hour: 12, min: 30, weekdayNumber: 4 },
    lab: {
      link: "https://teams.microsoft.com/dl/launcher/launcher.html?url=/_%23/l/meetup-join/19:meeting_ZjMzNDhmN2UtYWU3ZC00OTg0LTkzMjUtMjQ3Mzk5NzEzMzZk@thread.v2/0?context%3D%257b%2522Tid%2522%253a%2522e8a52afe-6ea8-47f7-b275-783f7087b5fa%2522%252c%2522Oid%2522%253a%2522924a1556-5e14-4faf-9d4a-17b156530661%2522%257d%26anon%3Dtrue&type=meetup-join&deeplinkId=4dc6e879-7675-490e-9967-05ad1ca4ca5c&directDl=true&msLaunch=true&enableMobilePage=true&suppressPrompt=true",
      time: { hour: 14, min: 0, weekdayNumber: 4 },
    },
  },
  {
    id: "6",
    name: "Polish Lang",
    type: "Lecture",
    link: "https://teams.microsoft.com/l/meetup-join/19%3ameeting_Njk1M2MyMjktODNlNy00MzJkLWE1ZTItOTIxYjc3NmEwYWMy%40thread.v2/0?context=%7b%22Tid%22%3a%22e8a52afe-6ea8-47f7-b275-783f7087b5fa%22%2c%22Oid%22%3a%2299caf3ca-a681-4fb5-80fc-667faeedf65a%22%7d",
    time: { hour: 10, min: 10, weekdayNumber: 4 },
  },
];
