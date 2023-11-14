import React from 'react'
import Clients from '../components/Clients';
import Projects from '../components/Projects';
import AddNewClient from '../components/AddNewClient';
import AddNewProject from '../components/AddNewProject';

export default function Home() {
  return (
    <>
        <div className="flex justify-start gap-10">
          <AddNewClient />
          <AddNewProject />
        </div>
        <Projects />
        <Clients />
        
    </>
  )
}
