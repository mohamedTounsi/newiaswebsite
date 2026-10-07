'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function SplashLoader({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide loader after 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white animate-bg-reveal">
        <div className="flex items-center justify-center">
          <Image 
            src="/logoiasjdid.png" 
            alt="IAS Logo" 
            width={220} 
            height={220} 
            className="object-contain animate-creative"
            priority
          />
        </div>
      </div>
    );
  }

  return children;
}
