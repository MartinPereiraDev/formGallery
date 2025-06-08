import LoginForm from "../components/login/login";
import LoginRegister from "../components/login/loginRegister";



export default function Home() {
  return (
    <div>
      <h1>
        Mis Componentes
      </h1>
      <LoginRegister/>
      <LoginForm/>
    </div>
  );
}
