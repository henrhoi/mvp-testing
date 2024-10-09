import { Autocomplete, Stack, TextField, Typography } from '@mui/material';
import { unstable_debounce } from '@mui/utils';
import { useState } from 'react';
import './App.css';
import { useSearchActivites } from './hooks/useSearchActivities';

function App() {
  const [search, setSearch] = useState('');
  const options = useSearchActivites(search);

  const debouncedSetSearch = unstable_debounce((s: string) => {
    console.log("Set search", s);
    setSearch(s);
  }, 500)
  return (
    <>
      <Typography variant="h3">Activity search MVP</ Typography>
      <Stack p={2}>
        <Autocomplete
          options={options}
          onInputChange={(_, newInputValue) => {
            debouncedSetSearch(newInputValue);
          }}
          filterOptions={(x) => x}
          getOptionLabel={(option) => option.label + " - " + option.category}
          renderInput={(params) => <TextField {...params} label="Activities" />}
        />
      </Stack>
    </>
  )
}

export default App
