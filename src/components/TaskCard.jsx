import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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

export const TaskCard = ({ task, onDelete }) => {
  const navigate = useNavigate();

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {task.description || '—'}
        </Typography>
        <div style={{ marginTop: '12px' }}>
          <Chip
            label={`Статус: ${task.status.replace('_', ' ')}`}
            size="small"
            color={statusColors[task.status] || 'default'}
            sx={{ mr: 1 }}
          />
          <Chip
            label={`Приоритет: ${task.priority}`}
            size="small"
            color={priorityColors[task.priority] || 'default'}
          />
          {task.due_date && (
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              ⏰ До: {new Date(task.due_date).toLocaleString('ru-RU')}
            </Typography>
          )}
        </div>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate(`/tasks/${task.id}`)}>
          Подробнее
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => navigate(`/edit/${task.id}`)}
        >
          Редактировать
        </Button>
        <Button
          size="small"
          color="error"
          onClick={() => onDelete(task.id)}
        >
          Удалить
        </Button>
      </CardActions>
    </Card>
  );
};