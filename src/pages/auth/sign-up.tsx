import { useState } from 'react';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";

export function SignUp(): JSX.Element {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    agreeTerms: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Adicionar lógica de cadastro aqui
    console.log('Form data:', formData);
    navigate('/dashboard/home'); // Redirecionar após cadastro
  };

  return (
    <section className="m-8 flex flex-col lg:flex-row">
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center order-2 lg:order-1">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Join Us Today</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
            Enter your email and password to register.
          </Typography>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              name="email"
              type="email"
              size="lg"
              placeholder="name@mail.com"
              value={formData.email}
              onChange={handleInputChange}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              crossOrigin={undefined}
              required
            />
          </div>

          <Checkbox
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleInputChange}
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree the&nbsp;
                <a
                  href="www.google.com"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
            crossOrigin={undefined}
            required
          />

          <Button type="submit" className="mt-6" fullWidth disabled={!formData.agreeTerms}>
            Register Now
          </Button>

          <div className="space-y-4 mt-8">
            <SocialLoginButton 
              icon={
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* SVG do Google */}
                </svg>
              }
              text="Sign up With Google"
            />
            
            <SocialLoginButton 
              icon={<img src="/img/twitter-logo.svg" height={24} width={24} alt="Twitter logo" />}
              text="Sign up With Twitter"
            />
          </div>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Already have an account?
            <Link to="/auth/sign-in" className="text-gray-900 ml-1">Sign in</Link>
          </Typography>
        </form>
      </div>

      <div className="w-full lg:w-2/5 h-screen hidden lg:block order-1 lg:order-2">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
          alt="Decorative background"
        />
      </div>
    </section>
  );
}

// Componente auxiliar para botões de login social
interface SocialLoginButtonProps {
  icon: React.ReactNode;
  text: string;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ icon, text }) => (
  <Button 
    size="lg" 
    color="white" 
    className="flex items-center gap-2 justify-center shadow-md" 
    fullWidth
  >
    {icon}
    <span>{text}</span>
  </Button>
);

export default SignUp;