
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { parseTask } from './openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Endpoint to create a task from natural language
app.post('/tasks/nlp', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const parsedTask = await parseTask(text);
    const task = await prisma.task.create({
      data: {
        title: parsedTask.title,
        originalText: text,
        startTime: parsedTask.startTime ? new Date(parsedTask.startTime) : null,
        priority: parsedTask.priority || 'medium',
      },
    });
    res.json(task);
  } catch (error) {
    console.error('Error processing task:', error);
    res.status(500).json({ error: 'Failed to process task' });
  }
});

// Endpoint to get tasks for today
app.get('/tasks/today', async (req, res) => {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  try {
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          {
            startTime: {
              gte: startOfDay,
              lte: endOfDay,
            },
          },
          {
            AND: [
              { startTime: null },
              {
                createdAt: {
                  gte: startOfDay,
                  lte: endOfDay,
                }
              }
            ]
          }
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching today\'s tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
