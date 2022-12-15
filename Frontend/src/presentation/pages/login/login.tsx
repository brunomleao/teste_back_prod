import React, { useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import './login.scss'

// Tela de Login
const Login: React.FC = () => {
  const navigate = useNavigate()

  // Ao preencher corretamente o formulário de login, guarda a informação que o usuário está logado no localstorage
  const onFinish = (values: any) => {
    localStorage.setItem("logged", 'true')
    window.location.href = '/'
  };

  // Caso tenha algum erro no formulário, exibe também esse erro no console
  // os inputs já possuem um tratamento de erro próprio
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div id="login">
      <div className="row">
        <h1 className='title'>Login</h1>
        <p className='text'>Identifique-se para acessar a ferramenta</p>
      </div>

      <div className="row">
        <Form
          name="basic"
          layout="vertical"
          requiredMark={false}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Registro de funcionário"
            name="username"
            rules={[{ required: true, message: 'Por favor, preencha com o seu registro! ' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password"
            rules={[{ required: true, message: 'Por favor, preencha com a sua senha!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button className='button' type="primary" htmlType="submit">
              Acessar a ferramenta
            </Button>
          </Form.Item>
        </Form>
      </div>


      <Link to="/signup" className="newAcess">Novo acesso</Link>
    </div>
  )
}

export default Login