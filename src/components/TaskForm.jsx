import { TextField, FormControl, InputLabel, Select, MenuItem, Button, Box, Typography } from '@mui/material';

export const TaskForm = ({ task, onChange, onSubmit, isSubmitting, title = 'Задача' }) => {
  return (
    <Box component="form" onSubmit={onSubmit} sx={{ maxWidth: 600, mx: 'auto', mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      <TextField
        label="Название*"
        fullWidth
        margin="normal"
        value={task.title}
        onChange={(e) => onChange('title', e.target.value)}
        required
      />

      <TextField
        label="Описание"
        fullWidth
        multiline
        rows={3}
        margin="normal"
        value={task.description || ''}
        onChange={(e) => onChange('description', e.target.value)}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Статус*</InputLabel>
        <Select
          value={task.status}
          label="Статус*"
          onChange={(e) => onChange('status', e.target.value)}
          required
        >
          <MenuItem value="todo">To Do</MenuItem>
          <MenuItem value="in_progress">In Progress</MenuItem>
          <MenuItem value="done">Done</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Приоритет*</InputLabel>
        <Select
          value={task.priority}
          label="Приоритет*"
          onChange={(e) => onChange('priority', e.target.value)}
          required
        >
          <MenuItem value="low">Низкий</MenuItem>
          <MenuItem value="medium">Средний</MenuItem>
          <MenuItem value="high">Высокий</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Срок выполнения"
        type="datetime-local"
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        value={task.due_date ? new Date(task.due_date).toISOString().slice(0, 16) : ''}
        onChange={(e) => onChange('due_date', e.target.value ? e.target.value : null)}
      />

      <Box sx={{ mt: 3 }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Сохранение...' : 'Сохранить'}
        </Button>
      </Box>
    </Box>
  );
};