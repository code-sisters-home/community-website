import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Container } from "@/components/Container";

export function Footer() {
  return (
    // Set the parent div to take at least the full screen height
    <div className="flex flex-col justify-end">
      <Container>
        <div className="flex-grow" />
        
        {/* Footer content */}
        <div className="my-10 text-sm text-center text-gray-600 dark:text-gray-400">
          Copyright © 2016 - {new Date().getFullYear()}. Made with ♥
        </div>
      </Container>
    </div>
  );
}
