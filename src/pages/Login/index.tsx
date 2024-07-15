import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Container, LoginContainer, Column, Spacing, Title, Form } from "./styles";
import { defaultValues, IFormLogin } from "./types";
import jsonData from "../../db/db.json"

const schema = yup
  .object({
    email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
    password: yup.string().min(6, "No minimo 6 caracteres").required("Campo obrigatório"),
  })
  .required();

const Login = () => {
  const userData:Array<{email:string, password:string}> = jsonData.users;
  const { control, watch,  formState: { errors, isValid },} = useForm<IFormLogin>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues,
    reValidateMode: "onChange",
  });

  function handleSubmit(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    const user:Array<{}> = userData.filter((user) => user.email === watch().email && user.password === watch().password)
    const isUser:boolean = user.length === 1;
    
    if(isUser){
      alert('Logado com sucesso. Bem vindo')
    } else {
      alert('Houve um problema, entre em contato com o suport');
    }
  }

  return (
    <Container>
      <LoginContainer>
        <Column>
        <Form onSubmit={(event:React.FormEvent<HTMLFormElement>) => handleSubmit(event)}>
          <Title>Login</Title>
          <Spacing />
          <Input
            name="email"
            placeholder="Email"
            control={control}
            errorMessage={errors?.email?.message}
            />
          <Spacing />
          <Input
            name="password"
            type="password"
            placeholder="Senha"
            control={control}
            errorMessage={errors?.password?.message}
            />
          <Spacing />
          <Button title="Entrar" disabled={!isValid}/>
          </Form>
        </Column>
      </LoginContainer>
    </Container>
  );
};

export default Login;
