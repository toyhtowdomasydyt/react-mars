import React from 'react';
import {InputLabel, MenuItem, Select} from '@mui/material';

const BasicSelect = ({name, label, id, value, options, handleChange, otherProps}) => {
  return (
    <>
      <InputLabel id={`label-${id}`}>{label}</InputLabel>
      <Select
        id={id}
        name={name}
        labelId={`label-${id}`}
        value={value}
        label={label}
        onChange={handleChange}
        {...otherProps}
      >
        {options.map(item => (
          <MenuItem key={item.abbr} value={item.abbr}>{item.fullName}</MenuItem>
        ))}
      </Select>
    </>
  );
}

export default BasicSelect;
