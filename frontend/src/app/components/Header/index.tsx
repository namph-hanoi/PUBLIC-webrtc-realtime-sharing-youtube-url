import React from 'react';
import { Container } from '@mui/material';
import 'tailwindcss/tailwind.css'


export default function Header() {
  return (
    <div>
      <p className='text-6xl font-bold underline'>Alo</p>
      <Container>
        This is the header
      </Container>
    </div>
  )
}
