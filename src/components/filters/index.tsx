import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import {
  EXPERIENCE_OPTIONS,
  LOCATION_OPTIONS,
  MIN_BASE_PAY_OPTIONS,
} from '@lib/constants';
import type { Filters } from '@lib/types';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { applyFilters, resetFilters } from '@store/features/filters';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const StyledFiltersContainer = styled.div`
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  justify-content: space-between;
  justify-items: space-between;
  gap: 1rem;
  margin-block-end: 0.75rem;

  & > * {
    flex: 1;
    /* flex-basis: 250px; */
  }
`;

type FiltersProps = {
  dynamicFilters: Record<'role' | 'location', string[]>;
};
export default function Filters({ dynamicFilters }: FiltersProps) {
  const { companyName, location, minBasePay, minExp, roles, remoteOrOnSite } =
    useAppSelector(state => state.filters);
  const dispatch = useAppDispatch();
  const areAnyFiltersSelected = !!(
    companyName.length > 0 ||
    location.length > 0 ||
    !!minBasePay ||
    !!minExp ||
    !!remoteOrOnSite ||
    roles.length
  );

  const handleFilterChange = <T extends keyof Filters>(
    filter: T,
    value: Filters[T]
  ) => {
    dispatch(applyFilters({ [filter]: value }));
  };

  const handleClearFilters = () => dispatch(resetFilters());
  return (
    <>
      <StyledFiltersContainer className='container'>
        <TextField
          id='company-name'
          label='Company Name'
          variant='outlined'
          placeholder='Search by company name'
          value={companyName}
          onChange={evt => handleFilterChange('companyName', evt.target.value)}
        />

        <FormControl>
          <InputLabel id='roles-label'>Roles</InputLabel>
          <Select
            labelId='roles-label'
            label='Roles'
            multiple
            placeholder='Roles'
            value={roles}
            onChange={(evt: SelectChangeEvent<string[]>) =>
              handleFilterChange('roles', evt.target.value as string[])
            }
            renderValue={selected => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map(value => (
                  <Chip key={value} label={value} className='capitalize' />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {dynamicFilters.role.map(role => (
              <MenuItem key={role} value={role} className='capitalize'>
                {role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel id='experience-label'>Experience</InputLabel>
          <Select
            labelId='experience-label'
            value={minExp ? String(minExp) : ''}
            label='Experience'
            onChange={evt =>
              evt.target.value
                ? handleFilterChange('minExp', Number(evt.target.value))
                : null
            }
          >
            {EXPERIENCE_OPTIONS.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id='location-label'>Location</InputLabel>
          <Select
            labelId='location-label'
            label='location'
            placeholder='Location'
            multiple
            value={location}
            onChange={(evt: SelectChangeEvent<string[]>) =>
              handleFilterChange('location', evt.target.value as string[])
            }
            renderValue={selected => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map(value => (
                  <Chip key={value} label={value} className='capitalize' />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {dynamicFilters.location.map(location => (
              <MenuItem key={location} value={location} className='capitalize'>
                {location}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id='remote-label'>Remote/On-Site</InputLabel>
          <Select
            labelId='remote-label'
            label='remote'
            placeholder='remote'
            value={remoteOrOnSite ?? ''}
            onChange={(evt: SelectChangeEvent) =>
              handleFilterChange('remoteOrOnSite', evt.target.value)
            }
            MenuProps={MenuProps}
          >
            {LOCATION_OPTIONS.map(location => (
              <MenuItem key={location.value} value={location.value}>
                {location.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel id='min-base-pay-label'>Min Base Pay</InputLabel>
          <Select
            labelId='min-base-pay-label'
            label='Min Base Pay'
            value={minBasePay ? String(minBasePay) : ''}
            onChange={(evt: SelectChangeEvent) =>
              evt.target.value
                ? handleFilterChange('minBasePay', Number(evt.target.value))
                : null
            }
          >
            {MIN_BASE_PAY_OPTIONS.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </StyledFiltersContainer>
      {areAnyFiltersSelected ? (
        <Stack className='container' direction={'row-reverse'}>
          <Button
            variant='outlined'
            startIcon={<ClearIcon />}
            onClick={handleClearFilters}
            size='small'
          >
            Clear All Filters
          </Button>
        </Stack>
      ) : null}
    </>
  );
}
