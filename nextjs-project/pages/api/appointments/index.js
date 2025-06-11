import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    try {
      const { date, timeSlot, note } = req.body;

      // Validation
      if (!date || !timeSlot) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Check if the time slot is available
      const existingAppointment = await prisma.appointment.findFirst({
        where: {
          date: new Date(date),
          timeSlot: timeSlot,
        },
      });

      if (existingAppointment) {
        return res.status(400).json({ message: 'This time slot is already booked' });
      }

      // Create appointment
      const appointment = await prisma.appointment.create({
        data: {
          date: new Date(date),
          timeSlot,
          note,
          userId: session.user.id,
        },
      });

      return res.status(201).json(appointment);
    } catch (error) {
      console.error('Appointment creation error:', error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  } else if (req.method === 'GET') {
    try {
      const appointments = await prisma.appointment.findMany({
        where: {
          userId: session.user.id,
        },
        orderBy: {
          date: 'asc',
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });

      return res.status(200).json(appointments);
    } catch (error) {
      console.error('Appointments fetch error:', error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
} 