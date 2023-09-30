const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const { tasks } = require('../tasks.json');

router.get('/', (req, res) => {
  res.json(tasks);
});

router.get('/:id', (req, res) => {
  const taskId = req.params.id;
  const [task] = tasks.filter((t) => t.id === +taskId);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
});

router.post('/', (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);

  fs.writeFile(
    path.join(__dirname, '../tasks.json'),
    JSON.stringify({ tasks }),
    (err) => {
      if (err) {
        console.error('Error writing to JSON file:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      res.status(201).json(newTask);
    }
  );
});

router.put('/:id', (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body;
  const taskIndex = tasks.findIndex((t) => t.id === +taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };

  fs.writeFile(
    path.join(__dirname, '../tasks.json'),
    JSON.stringify({ tasks }),
    (err) => {
      if (err) {
        console.error('Error writing to JSON file:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      res.status(201).json(`Task with id: ${taskId} updated successfully`);
    }
  );
});

router.delete('/:id', (req, res) => {
  const taskId = req.params.id;
  const taskIndex = tasks.findIndex((t) => t.id === +taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  const deletedTask = tasks.splice(taskIndex, 1);

  fs.writeFile(
    path.join(__dirname, '../tasks.json'),
    JSON.stringify({ tasks }),
    (err) => {
      if (err) {
        console.error('Error writing to JSON file:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      res.status(201).json(`Task with id: ${taskId} deleted successfully`);
    }
  );
});

module.exports = router;
