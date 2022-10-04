import React from 'react';
import { ToggleButton, ToggleInput, ToggleText } from './styles';

type ToggleProps = {
  children: React.ReactElement | React.ReactElement[];
};

const Switch = ({ on, toggle }: { on: boolean; toggle: () => void }) => {
  return (
    <label>
      <ToggleInput />
      <ToggleButton on={on} onClick={toggle} />
    </label>
  );
};

const Toggle: React.FunctionComponent<ToggleProps> = ({ children }) => {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '10px',
        gap: '2px',
      }}
    >
      {React.Children.map(children, (child) => {
        if (child) {
          return typeof child.type === 'string'
            ? child
            : React.cloneElement(child, { on, toggle });
        }
      })}
    </div>
  );
};

interface Props {
  on?: boolean;
  children?: any;
  toggle?: () => void;
}
// Accepts `on` and `children` props and returns `children` if `on` is true
export const ToggleOn = ({ on, children }: Props) =>
  on ? <ToggleText>{children}</ToggleText> : null;

// Accepts `on` and `children` props and returns `children` if `on` is false
export const ToggleOff = ({ on, children }: Props) =>
  !on ? <ToggleText>{children}</ToggleText> : null;

// Accepts `on` and `toggle` props and returns the <Switch /> with those props.
export const ToggleSwitch = ({ on, toggle }: Props) => {
  if (on === undefined) {
    on = false;
  }
  return toggle ? <Switch on={on} toggle={toggle} /> : null;
};

export default Toggle;
