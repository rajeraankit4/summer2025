import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Notice from './models/notice.model.js';
import MessStaff from './models/messStaff.model.js';
import CanteenStaff from './models/canteenStaff.model.js';
import Stats from './models/stats.model.js';

dotenv.config();

const notices = [
  { text: 'hostel fee payment...', date: '18 Jun 4:10 PM' },
  { text: 'Mess Annual Function on 18 May 2025...', date: '12 May 9:16 PM' },
];

const messStaff = [
  { name: 'Naman', mobile: '654654', date: '23 May 2024' },
  { name: 'Chintu', mobile: '654654', date: '23 Aug 2024' },
  { name: 'Akhil', mobile: '654654', date: '15 Jan 2025' },
];

const canteenStaff = [
  { name: 'Naman', mobile: '654654', date: '23 May 2024' },
  { name: 'Chintu', mobile: '654654', date: '23 Aug 2024' },
  { name: 'Akhil', mobile: '654654', date: '15 Jan 2025' },
];

const stats = {
  totalStudents: 120,
  mealsToday: 320,
  canteenOrders: 145,
  revenue: 82000,
  mealData: [
    { day: 'Mon', meals: 280 },
    { day: 'Tue', meals: 300 },
    { day: 'Wed', meals: 320 },
    { day: 'Thu', meals: 310 },
    { day: 'Fri', meals: 290 },
    { day: 'Sat', meals: 340 },
    { day: 'Sun', meals: 280 },
  ],
  revenueData: [
    { day: 'Mon', revenue: 65000 },
    { day: 'Tue', revenue: 70000 },
    { day: 'Wed', revenue: 75000 },
    { day: 'Thu', revenue: 72000 },
    { day: 'Fri', revenue: 68000 },
    { day: 'Sat', revenue: 80000 },
    { day: 'Sun', revenue: 67000 },
  ],
};

const seedDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await Notice.deleteMany({});
  await Notice.insertMany(notices);

  await MessStaff.deleteMany({});
  await MessStaff.insertMany(messStaff);

  await CanteenStaff.deleteMany({});
  await CanteenStaff.insertMany(canteenStaff);

  await Stats.deleteMany({});
  await Stats.create(stats);

  console.log('Database seeded!');
  mongoose.connection.close();
};

seedDB();
