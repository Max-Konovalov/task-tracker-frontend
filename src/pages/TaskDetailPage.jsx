import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Chip,
  Box,
  IconButton,
  Alert,
} from '@mui/material';
import { ArrowBack, Edit, Delete } from '@mui/icons-material';
import { taskApi } from '../api/taskApi';

const statusLabels = {
  todo: 'To Do',
  in_progress: 'В работе',
  done: 'Выполнено',
};

const priorityLabels = {
  low: 'низкий',
  medium: 'средний',
  high: 'высокий',
};

const statusColors = {
  todo: 'default',
  in_progress: 'warning',
  done: 'success',
};

const priorityColors = {
  low: 'info',
  medium: 'default',
  high: 'error',
};

export const TaskDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    taskApi.getById(id)
      .then(res => setTask(res.data))
      .catch(() => setError('Задача не найдена'));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Удалить задачу?')) return;
    try {
      await taskApi.delete(id);
      navigate('/');
    } catch (err) {
      alert('Ошибка удаления');
    }
  };

  if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
  if (!task) return <Typography sx={{ m: 2 }}>Загрузка...</Typography>;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={() => navigate(-1)} size="small">
          <ArrowBack />
        </IconButton>
        <Typography variant="h5">Детали задачи</Typography>
      </Box>

      <Typography variant="h4" gutterBottom>
        {task.title}
      </Typography>

      <Typography variant="body1" paragraph>
        {task.description || '—'}
      </Typography>

      <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        <Chip
          label={`Статус: ${statusLabels[task.status]}`}
          color={statusColors[task.status]}
        />
        <Chip
          label={`Приоритет: ${priorityLabels[task.priority]}`}
          color={priorityColors[task.priority]}
        />
        {task.due_date && (
          <Chip
            label={`⏳ До: ${new Date(task.due_date).toLocaleString('ru-RU')}`}
            color="primary"
          />
        )}
      </Box>

      <Typography variant="caption" display="block" sx={{ mt: 2, color: 'text.secondary' }}>
        Создано: {new Date(task.created_at).toLocaleString('ru-RU')}
        {task.updated_at && ` | Обновлено: ${new Date(task.updated_at).toLocaleString('ru-RU')}`}
      </Typography>

      <Box sx={{ mt: 4, display: 'flex', gap: 1 }}>
        <Button
          variant="contained"
          startIcon={<Edit />}
          onClick={() => navigate(`/edit/${id}`)}
        >
          Редактировать
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<Delete />}
          onClick={handleDelete}
        >
          Удалить
        </Button>
      </Box>
    </Container>
  );
};