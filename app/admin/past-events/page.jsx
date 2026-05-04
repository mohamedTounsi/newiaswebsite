"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import EventManager from "../components/EventManager";

export default function PastEventsPage() {
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) router.push("/admin");
  }, [router]);

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <EventManager status="previous" title="Historical Records" />
    </div>
  );
}
