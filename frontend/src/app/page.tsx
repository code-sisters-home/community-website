"use client";
import { useState } from 'react';
import { Container } from "@/components/Container";
import { Main } from "@/components/Main";
import { Faq } from "@/components/Faq";
import { About } from "@/components/About";
import { Blog } from "@/components/Blog";
import {Navbar} from "@/components/Navbar";

export default function Home() {
  const [activePage, setActivePage] = useState<string>('home'); // Состояние для текущей страницы
  
    const handleNavClick = (page: string) => {
      setActivePage(page); // Обновляем активную страницу
    };

  return (
    <div>
      {/* Навигация */}
      <Navbar onNavClick={handleNavClick} /> 

    <Container>
        {/* В зависимости от выбранной страницы рендерим соответствующий компонент */}
      {activePage === 'home' && <Main />} 
      {activePage === 'faq' && <Faq />}
      {activePage === 'about' && <About />}
      {activePage === 'blog' && <Blog />}
{/*
      <SectionTitle
        preTitle="Nextly Benefits"
        title=" Why should you use this landing page"
      >
        Nextly is a free landing page & marketing website template for startups
        and indie projects. Its built with Next.js & TailwindCSS. And its
        completely open-source.
      </SectionTitle>

      <Benefits data={benefitOne} />
      <Benefits imgPos="right" data={benefitTwo} />

      <SectionTitle
        preTitle="Watch a video"
          title="Learn how to fulfill your needs"
      >
        This section is to highlight a promo or demo video of your product.
          Analysts say a landing page with video has 3% more conversion rate. So,
          don't forget to add one. Just like this.
      </SectionTitle>

      <Video videoId="fZ0D0cnR88E" />

      <SectionTitle
        preTitle="Testimonials"
        title="Here's what our customers said"
      >
        Testimonials is a great way to increase the brand trust and awareness.
        Use this section to highlight your popular customers.
      </SectionTitle>

      <Testimonials />
      <Cta />*/}
    </Container>
    </div>
  );
}
