import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Container, Alert } from '@mui/material';
import { TaskForm } from '../components/TaskForm';
import { taskApi } from '../api/taskApi';

export const TaskFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    due_date: null,
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Загрузка задачи при редактировании
  useEffect(() => {
    if (isEditing) {
      taskApi.getById(id)
        .then(res => setTask(res.data))
        .catch(() => navigate('/'));
    }
  }, [id, isEditing, navigate]);

  const handleChange = (key, value) => {
    setTask(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Валидация
    if (!task.title.trim()) {
      setError('Название обязательно');
      return;
    }

    setIsSubmitting(true);
    try {
      if (isEditing) {
        await taskApi.update(id, task);
      } else {
        await taskApi.create(task);
      }
      navigate('/');
    } catch (err) {
      setError('Ошибка сохранения. Проверьте данные.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md">
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <TaskForm
        task={task}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        title={isEditing ? 'Редактировать задачу' : 'Новая задача'}
      />
    </Container>
  );
};