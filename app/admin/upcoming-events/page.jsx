"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import EventManager from "../components/EventManager";

export default function UpcomingEventsPage() {
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) router.push("/admin");
  }, [router]);

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <EventManager status="upcoming" title="Future Schedule" />
    </div>
  );
}
