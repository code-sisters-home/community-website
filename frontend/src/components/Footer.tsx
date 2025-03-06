import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Container } from "@/components/Container";

export function Footer() {
  return (
    <footer className="mt-auto">
      <Container>
        {/* Footer content */}
        <div className="my-5 text-sm text-center text-gray-600 dark:text-gray-400">
          Copyright © 2016 - {new Date().getFullYear()}. Made with ♥
        </div>
      </Container>
    </footer>
  );
}