"use client";
import { useState } from "react";
import { Main } from "@/components/Main";

export default function Home() {
  const [activePage, setActivePage] = useState<string>("home"); // Состояние для текущей страницы

  return <Main />;
}
