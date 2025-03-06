"use client";
import { useState } from 'react';
import { Container } from "@/components/Container";
import { Main } from "@/components/Main";
import { Blog } from "@/components/Blog";
// import {Navbar} from "@/components/Navbar";

export default function Home() {
  const [activePage, setActivePage] = useState<string>('home'); // Состояние для текущей страницы

  return (
     <Main />
  );
}
