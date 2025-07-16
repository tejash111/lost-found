"use client"

import Container from '@/components/layout/container.';
import Header from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from '@/lib/auth-client';
import { Activity, Camera, Earth, Handshake, Lock, Mic, Search } from 'lucide-react';

export default function LandingPage() {
  const { data: session, isPending } = useSession();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-1">
        <Container className="py-16 flex flex-col items-center text-center gap-12">
          {/* Hero Section */}
          <section className="flex flex-col items-center gap-6 max-w-2xl">
            <div className="flex justify-center">
              <Image src="/iconfound.png" alt="Lost & Found" width={130} height={130} className="mb-4" /><div className='text-7xl font-light text-gray-600 mt-5'>-𝙵𝚘𝚞𝚗𝚍</div>
            </div>
            <h1 className="text-4xl md:text-5xl font-normal tracking-tight dark:text-gray-400">𝙰 𝙿2𝙿 𝙿𝚕𝚊𝚝𝚏𝚘𝚛𝚖 : 𝙻𝚘𝚜𝚝 & 𝙵𝚘𝚞𝚗𝚍</h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Lost something? Found something? Connect directly with people in your community to return lost items quickly and securely.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
              <Button asChild size="lg" className="dark:bg-gray-300 dark:text-black">
                <Link href="/found/add">Report Found Item</Link>
              </Button>
              <div className="text-2xl flex items-center justify-center">
                <Activity className="mt-2 ml-0 dark:text-gray-400" />
              </div>
              <Button asChild size="lg" className="dark:bg-gray-300 dark:text-black">
                <Link href="/search">Found lost Item</Link>
              </Button>
            </div>
          </section>

          {/* How It Works */}
          <section className="w-full max-w-3xl">
            <h2 className="text-2xl font-bold mb-6 dark:text-gray-300">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card rounded-lg p-6 shadow flex flex-col items-center dark:bg-gray-800 dark:text-gray-200">
                <span className="text-3xl mb-2"><Search/></span>
                <h3 className="font-semibold mb-1">Search</h3>
                <p className="text-sm text-muted-foreground">Look for lost or found items in your area.</p>
              </div>
              <div className="bg-card rounded-lg p-6 shadow flex flex-col items-center dark:bg-gray-800 dark:text-gray-200">
                <span className="text-3xl mb-2"><Mic/></span>
                <h3 className="font-semibold mb-1">Report</h3>
                <p className="text-sm text-muted-foreground">Post details about a lost or found item easily.</p>
              </div>
              <div className="bg-card rounded-lg p-6 shadow flex flex-col items-center dark:bg-gray-800 dark:text-gray-200">
                <span className="text-3xl mb-2"><Handshake/></span>
                <h3 className="font-semibold mb-1">Connect</h3>
                <p className="text-sm text-muted-foreground">Chat securely and arrange the return of items.</p>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="w-full max-w-4xl mt-8">
            <h2 className="text-2xl font-bold mb-6 dark:text-gray-300">Why Use Our App?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card rounded-lg p-6 shadow flex flex-col items-center dark:bg-gray-800 dark:text-gray-200">
                <span className="text-2xl mb-2"><Lock/></span>
                <h4 className="font-semibold mb-1">Privacy First</h4>
                <p className="text-sm text-muted-foreground text-center">Your data is safe. Only share what you want with others.</p>
              </div>
              <div className="bg-card rounded-lg p-6 shadow flex flex-col items-center dark:bg-gray-800 dark:text-gray-200">
                <span className="text-2xl mb-2">⚡</span>
                <h4 className="font-semibold mb-1">Fast & Easy</h4>
                <p className="text-sm text-muted-foreground text-center">Quickly post or search for items with a simple interface.</p>
              </div>
              <div className="bg-card rounded-lg p-6 shadow flex flex-col items-center dark:bg-gray-800 dark:text-gray-200">
                <span className="text-2xl mb-2"><Earth/></span>
                <h4 className="font-semibold mb-1">Community Driven</h4>
                <p className="text-sm text-muted-foreground text-center">Help and get help from people around you, peer-to-peer.</p>
              </div>
            </div>
          </section>
        </Container>
      </main>
      <footer className="border-t py-6 text-center text-sm text-muted-foreground bg-background">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <span>&copy; {new Date().getFullYear()} Lost &amp; Found. All rights reserved.</span>
            <div className="flex items-center gap-2">
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}