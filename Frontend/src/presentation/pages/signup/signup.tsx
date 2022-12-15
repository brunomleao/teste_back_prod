import React from 'react'
import { Form, Input, Button, message } from 'antd'
import './signup.scss'
import Logo from '/src/assets/logo.png'
import { Link } from 'react-router-dom'

// Tela de cadastro
const Signup: React.FC = () => {
  // Função que será executada quando todos os dados do formulário estiverem corretos
  const onFinish: any = (values: any) => {
    // Caso a senha e a confirmação de senha estejam iguais, manda o usuário para a tela de aprovação 
    if (values.password === values.passwordConfirmation) {
      window.location.href = '/aproval'
    }
    else {
      // Chama a função que exibe a mensagem na tela de que as senhas não coincidem
      info()
    }
  };

  // Caso tenha algum erro no formulário, os informa no console
  const onFinishFailed: any = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  // Função responsável por mostrar a mensagem de erro na tela
  const info: Function = () => {
    message.info('As senhas não coincidem', 3);
  };

  return (
    <div id="signup">
      {/* <div className="left">
        <img src={Logo} alt="" />
      </div>
      <div className="right"> */}

      <div className="row">
        <h1 className='title'>Signup</h1>
        <p className='text'>Preencha seus dados para um novo acesso</p>
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

          <Form.Item
            label="Confirmação da senha"
            name="passwordConfirmation"
            rules={[{ required: true, message: 'Por favor, preencha com a senha previamente informada!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button className='button' type="primary" htmlType="submit">
              Criar novo acesso
            </Button>
          </Form.Item>
        </Form>
      </div>

      <Link to='/' className="acess">Acessar</Link>
      {/* </div> */}
    </div>
  )
}

export default Signup