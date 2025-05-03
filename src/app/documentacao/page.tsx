"use client";

import React from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function DocumentacaoPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <section className="container mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">Documentação Tappy</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
            Conteúdo completo em breve
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
