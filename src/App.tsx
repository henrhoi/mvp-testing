import { Autocomplete, Stack, TextField, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import './App.css';
import { useDebounce } from './debounce';
import { useSearchActivites } from './hooks/useSearchActivities';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const options = useSearchActivites(searchTerm);


  const debouncedSetSearchTerm = useDebounce(useCallback((s: string) => {
    setSearchTerm(s);
  }, []), 500);

  return (
    <>
      <Typography variant="h3">Activity search MVP</ Typography>
      <Stack p={2}>
        <Autocomplete<string>
          getOptionLabel={(option) => option}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
            debouncedSetSearchTerm(newInputValue);
          }}
          options={options}
          filterOptions={(x) => x}
          renderInput={(params) => <TextField {...params} label="Activities" />}
        />
      </Stack>
    </>
  )
}

export default App
