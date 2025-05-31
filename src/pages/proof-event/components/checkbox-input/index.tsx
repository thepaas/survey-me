import { type FC } from 'react';

import checkedIcon from '@assets/icons/check.svg';

type Props = {
  checked: boolean;
  label: string;
  onChange: () => void;
};

const CheckboxInput: FC<Props> = ({ checked, label, onChange }) => {
  return (
    <div style={checkboxContainerStyle} onClick={onChange}>
      <div style={checkboxBoxStyle}>
        {checked && <img src={checkedIcon} style={checkmarkImageStyle} />}
      </div>
      <span style={labelStyle}>{label}</span>
    </div>
  );
};

const checkboxContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: 18,
  cursor: 'pointer',
};

const labelStyle: React.CSSProperties = {
  fontSize: 19,
  fontWeight: 600,
};

const checkboxBoxStyle: React.CSSProperties = {
  width: 26,
  height: 26,
  border: '2px solid black',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 8,
  borderRadius: 4,
};

const checkmarkImageStyle: React.CSSProperties = {
  width: 24,
  height: 24,
};

export default CheckboxInput;
