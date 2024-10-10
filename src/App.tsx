import { Autocomplete, autocompleteClasses, Popper, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCallback, useState } from 'react';
import './App.css';
import { ListboxComponent } from './components/ListBoxComponent';
import { useDebounce } from './debounce';
import { useSearchActivites } from './hooks/useSearchActivities';

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});

function App() {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const options = useSearchActivites(searchTerm);

  const handleChangeSearchTerm = useCallback((s: string) => {
    setSearchTerm(s);
  }, []);

  const debouncedSetSearchTerm = useDebounce(handleChangeSearchTerm, 500);
  return (
    <>
      <Typography variant="h3">Activity search MVP</ Typography>
      <Stack p={2}>
        <Autocomplete<string>
          disableListWrap 
          sx={{width: 600}}
          getOptionLabel={(option) => option}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
            debouncedSetSearchTerm(newInputValue);
          }}
          options={options}
          filterOptions={(x) => x}
          renderOption={(props, option) =>
            [props, option, searchTerm] as React.ReactNode
          }
          renderInput={(params) => <TextField {...params} label="Activities" />}
          slots={{
            popper: StyledPopper,
            listbox: ListboxComponent,
          }}
        />
      </Stack>
    </>
  )
}

export default App
