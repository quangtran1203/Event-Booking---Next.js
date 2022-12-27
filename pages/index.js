import Head from "next/head";
import MediaCard from "../src/Card";
import Link from 'next/link';

export default function Home({data}) {
	return (
		<div>
			<Head>
				<title>Event Booker</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div style={{display:'flex', flexBasis: '100%',flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '24px' , paddingRight: '24px'}}>
				<h1 style={{display: 'flex', flexBasis: '80%'}}>
					Event Booker
        </h1>
        
        <header style={{display: 'flex', flexBasis: '20%' , flexDirection: 'row', justifyContent: 'space-between'}}>
          <Link href='/'>Home</Link>
          <Link href="/events">Events</Link>
          <Link href="/about-us">About Us</Link>
      </header>
      </div>

      <main style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row'}}>
        {data.map(event => <MediaCard city={event.id} desc={event.description} key={event.id} routeLink={`/events/${event.id}`} />)}    
      </main>

      <footer>Quang Tran - 2022/2023</footer>
		</div>
	);
}

export async function getServerSideProps() {
  const {events_categories} = await import('/data/data.json');  // destructuring the city data
  return {
    // pass the destructured props into the rendering function
    props: {
      data: events_categories, 
    }, 
  }
}