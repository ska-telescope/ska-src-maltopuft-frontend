interface ToggleButtonProps {
  isToggled: boolean;
  setIsToggled: React.Dispatch<React.SetStateAction<boolean>>;
  buttonLabel: string;
}

function ToggleButton({ ...props }: ToggleButtonProps) {
  function handleClick(): void {
    props.setIsToggled(!props.isToggled);
  }

  return (
    <label htmlFor="latest">
      <input type="checkbox" defaultChecked={props.isToggled} onClick={handleClick} />
      {'  '}
      <strong>{props.buttonLabel}</strong>
    </label>
  );
}

export default ToggleButton;
