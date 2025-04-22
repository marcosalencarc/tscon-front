import React from 'react';
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from '@/http/api'; // Importe sua API atualizada

export function SignIn(): JSX.Element {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    username: '', // Mudei de email para username para combinar com AuthDTO
    password: ''
  });
  const [error, setError] = React.useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  
  try {
    const { access_token } = await auth({
      username: formData.username,
      password: formData.password
    });
    
    if (access_token) {
      navigate("/dashboard/home");
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Login failed';
    setError(errorMessage);
    console.error('Login error:', err);
  }
};

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Login</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
            Entre com seu usuário e senha.
          </Typography>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Usuário
            </Typography>
            <Input
              name="username"
              size="lg"
              placeholder="seu.usuario"
              value={formData.username}
              onChange={handleInputChange}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              crossOrigin={undefined}
            />
            
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Senha
            </Typography>
            <Input
              type="password"
              name="password"
              size="lg"
              placeholder="********"
              value={formData.password}
              onChange={handleInputChange}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              crossOrigin={undefined}
            />
          </div>
          
          <Button type="submit" className="mt-6" fullWidth>
            Entrar
          </Button>

          <Typography variant="small" className="mt-4 text-center font-normal">
            Não tem uma conta?{' '}
            <Link to="/sign-up" className="font-medium text-gray-900">
              Cadastre-se
            </Link>
          </Typography>
        </form>
      </div>
      
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
          alt="background"
        />
      </div>
    </section>
  );
}