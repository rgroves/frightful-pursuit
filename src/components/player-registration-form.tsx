import { useEffect, useRef, useState } from "react";
import { Form } from "react-router-dom";

interface PlayerRegistrationFormProps {
  onPlayerRegistered: (nickname: string) => void;
}

export default function PlayerRegistrationForm({
  onPlayerRegistered,
}: PlayerRegistrationFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        onPlayerRegistered(nickname);
      }}
    >
      <input
        ref={inputRef}
        name="nickname"
        type="text"
        required
        minLength={2}
        maxLength={20}
        onChange={(e) => {
          setNickname(e.target.value);
        }}
        value={nickname}
      />
      <button type="submit">Register</button>
    </Form>
  );
}
