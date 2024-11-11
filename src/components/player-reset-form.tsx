import { Form } from "react-router-dom";

interface PlayerResetFormProps {
  onPlayerReset: () => void;
}

export default function PlayerResetForm({
  onPlayerReset,
}: PlayerResetFormProps) {
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        onPlayerReset();
      }}
    >
      <input name="newPlayer" type="checkbox" hidden readOnly checked />
      <button type="submit">New Player</button>
    </Form>
  );
}
