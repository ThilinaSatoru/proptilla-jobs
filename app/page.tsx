import Image from 'next/image'
import Table from '../app/components/Table'
import Form from '../app/components/Form'
import Create from "./job/create";
import Head from "next/head";
import { BiUserPlus } from "react-icons/bi";

export default function Home() {
  return (
    <section data-theme="cupcake">
      <Head>
        <title>CRUD Application</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-5">
        <h1 className="text-xl md:text-5xl text-center font-bold py-10">
          Proptilla Job Schedules
        </h1>

        <div className="container mx-auto flex justify-between py-5 border-b">
          <Create />
        </div>

        {/* table */}
        <div className="container mx-auto">
          <Table />
        </div>
      </main>
    </section>
  );
}
