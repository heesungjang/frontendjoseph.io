import React from 'react';
import { toggleThemeMode, useThemeMode } from '../../hooks/useTheme';
import { ToggleButton, ToggleInput, ToggleText, ToggleWrapper } from './styles';

const Switch = ({ on, toggle }: { on: boolean; toggle: () => void }) => {
  return (
    <label>
      <ToggleInput disabled={true} />
      <ToggleButton on={on ? 1 : 0} onClick={toggle} />
    </label>
  );
};

const Toggle = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) => {
  const {
    state: { isDark: on },
    dispatch: themeModeDispatch,
  } = useThemeMode();

  const toggle = () => toggleThemeMode(themeModeDispatch);

  return (
    <ToggleWrapper>
      {React.Children.map(children, (child) => {
        if (child) {
          return typeof child.type === 'string'
            ? child
            : React.cloneElement(child, { on, toggle });
        }
      })}
    </ToggleWrapper>
  );
};

interface Props {
  on?: boolean;
  children?: any;
  toggle?: () => void;
}

export const ToggleOn = ({ on, children }: Props) =>
  on ? <ToggleText>{children}</ToggleText> : null;

export const ToggleOff = ({ on, children }: Props) =>
  !on ? <ToggleText>{children}</ToggleText> : null;

export const ToggleSwitch = ({ on, toggle }: Props) => {
  if (on === undefined) {
    on = false;
  }
  return toggle ? <Switch on={on} toggle={toggle} /> : null;
};

export default Toggle;
