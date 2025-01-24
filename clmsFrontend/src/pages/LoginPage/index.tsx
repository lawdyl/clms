import { useCallback, useState } from 'react';
import { LoginDetails } from '../../context/loginContext';
import { useLogin } from '../../hooks/dataHooks';
import './index.scss';

type LoginPageProps = {
  onLogin: (loginDetails: LoginDetails) => void;
};

export default ({onLogin}: LoginPageProps) => {
  const [ email, setEmail ] = useState("john.smith@example.org");
  const [ password, setPassword ] = useState("");
  const loginSuccess = useCallback((loginToken: string) => {
    onLogin({loginToken, email});
  }, [email]);
  const loginFailure = useCallback(() => {
    // Shouldn't be possible if backend server is running
    alert("Failed to log in (are you running the backend server?)");
  }, []);

  const [login, loginLoading] = useLogin(loginSuccess, loginFailure);

  return (
    <div id="login-page">
      <div id="login-container">
        <div id="email-container">
          <div id="email-label">Email:</div>
          <input id="email-input" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div id="password-container">
          <div id="password-label">Password:</div>
          <input id="password-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button id="submit-button" onClick={() => login(email, password)} disabled={loginLoading}>
          {loginLoading ? "Loading..." : "Log In"}
        </button>
      </div>
    </div>
  );
}