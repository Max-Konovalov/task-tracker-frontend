import { useState, useEffect } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { TaskCard } from '../components/TaskCard';
import { SearchFilter } from '../components/SearchFilter';
import { taskApi } from '../api/taskApi';
import { useNavigate } from 'react-router-dom';

export const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    q: '',
    status: '',
    priority: '',
    page: 1,
    size: 10,
  });
  const navigate = useNavigate();

  const loadTasks = async () => {
    setLoading(true);
    try {
      const res = await taskApi.getAll(filters);
      setTasks(res.data);
    } catch (err) {
      console.error('Ошибка загрузки задач:', err);
      alert('Не удалось загрузить задачи');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    setFilters((prev) => ({ ...prev, page: 1 }));
  };

  const handleReset = () => {
    setFilters({ q: '', status: '', priority: '', page: 1, size: 10 });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить задачу?')) return;
    try {
      await taskApi.delete(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      alert('Ошибка удаления');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Мои задачи</Typography>
        <Button variant="contained" onClick={() => navigate('/new')}>
          + Добавить задачу
        </Button>
      </Box>

      <SearchFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      {loading ? (
        <Typography>Загрузка...</Typography>
      ) : tasks.length === 0 ? (
        <Typography>Задачи не найдены</Typography>
      ) : (
        tasks.map(task => (
          <TaskCard key={task.id} task={task} onDelete={handleDelete} />
        ))
      )}
    </Container>
  );
};