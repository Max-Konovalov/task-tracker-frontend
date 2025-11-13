import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

export const SearchFilter = ({ filters, onFilterChange, onSearch, onReset }) => {
  return (
    <Box sx={{ mb: 3, p: 2, border: '1px solid #eee', borderRadius: 1 }}>
      <TextField
        label="Поиск"
        size="small"
        value={filters.q || ''}
        onChange={(e) => onFilterChange('q', e.target.value)}
        sx={{ mr: 2, width: 200 }}
      />
      <FormControl size="small" sx={{ mr: 2, minWidth: 120 }}>
        <InputLabel>Статус</InputLabel>
        <Select
          value={filters.status || ''}
          label="Статус"
          onChange={(e) => onFilterChange('status', e.target.value)}
        >
          <MenuItem value="">Все</MenuItem>
          <MenuItem value="todo">To Do</MenuItem>
          <MenuItem value="in_progress">In Progress</MenuItem>
          <MenuItem value="done">Done</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ mr: 2, minWidth: 120 }}>
        <InputLabel>Приоритет</InputLabel>
        <Select
          value={filters.priority || ''}
          label="Приоритет"
          onChange={(e) => onFilterChange('priority', e.target.value)}
        >
          <MenuItem value="">Все</MenuItem>
          <MenuItem value="low">Низкий</MenuItem>
          <MenuItem value="medium">Средний</MenuItem>
          <MenuItem value="high">Высокий</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" onClick={onSearch} sx={{ mr: 1 }}>
        Применить
      </Button>
      <Button variant="outlined" onClick={onReset}>
        Сбросить
      </Button>
    </Box>
  );
};