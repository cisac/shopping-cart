import React, { useState } from "react";

import { Button, Input, Flex, Box } from "../components";

export default function Login({ actions: { login } }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Flex alignItems="center" justifyContent="center" height="50vh">
      <Box className="login-form">
        <h3 style={{ textAlign: "center" }}>Login</h3>
        <form
          onSubmit={e => {
            e.preventDefault();
            login(name, password);
          }}
        >
          <Input
            type="text"
            value={name}
            label="Name"
            onChange={setName}
          />
          <Input
            type="password"
            value={password}
            label="Password"
            onChange={setPassword}
          />
          <Flex justifyContent="flex-end">
            <Button>Login</Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
}
