import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session || session.user.role !== 'ADMIN') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      // Get total users
      const totalUsers = await prisma.user.count();

      // Get total appointments
      const totalAppointments = await prisma.appointment.count();

      // Get today's appointments
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const todayAppointments = await prisma.appointment.count({
        where: {
          date: {
            gte: today,
            lt: tomorrow,
          },
        },
      });

      // Get pending complaints
      const pendingComplaints = await prisma.complaint.count({
        where: {
          status: 'PENDING',
        },
      });

      return res.status(200).json({
        totalUsers,
        totalAppointments,
        todayAppointments,
        pendingComplaints,
      });
    } catch (error) {
      console.error('Stats fetch error:', error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
} 