import React from "react";
import Link from "next/link";
import NavBar from "@/components/navbar/Navbar";


export default function MainLayout({children} : any) {
    return (
      <>
       <NavBar></NavBar>
      </>
    )
}