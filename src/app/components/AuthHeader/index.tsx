'use client';
import { Container, LogoButton, MenuLinks, AuthLinks } from './styles';

import { bebas_neue, poppins } from '../../fonts';
import { useRouter, usePathname } from 'next/navigation';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context';

export default function AuthHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [isButtonGreen1, setIsButtonGreen1] = useState<boolean>(true);
  const [isButtonGreen2, setIsButtonGreen2] = useState<boolean>(false);

  useEffect(() => {
    // Whenever the route changes, this effect will be triggered
    // Update the state of the buttons based on the new route
    if (pathname === '/admin/login') {
      setIsButtonGreen1(true);
      setIsButtonGreen2(false);
    }

    if (pathname === '/admin/register') {
      setIsButtonGreen1(false);
      setIsButtonGreen2(true);
    }
    setIsButtonGreen2(pathname === '/admin/register');
  }, [pathname]);

  function handleSignIn() {
    router.push('/admin/login');
  }

  function handleSignUp() {
    router.push('/admin/register');
  }

  return (
    <Container>
      <LogoButton className={bebas_neue.className}>
        <span>FOOD</span>
        <span>-</span>
        <span>E</span>
      </LogoButton>

      <MenuLinks className={bebas_neue.className}>
        <Link href="">PRODUTOS</Link>
        <Link href="">PREÇOS</Link>
        <Link href="">COMO USAR ?</Link>
      </MenuLinks>

      <AuthLinks>
        <button
          onClick={handleSignIn}
          className={
            isButtonGreen1 ? 'green_bg_white_color' : 'gray_bg_black_color'
          }
        >
          <span className={poppins.className}>Login</span>
        </button>

        <button
          onClick={handleSignUp}
          className={
            isButtonGreen2 ? 'green_bg_white_color' : 'gray_bg_black_color'
          }
        >
          <span className={poppins.className}>Cadastro</span>
        </button>
      </AuthLinks>
    </Container>
  );
}
