import MediaCard from "../../src/Card";
import Link from 'next/link';

const EventPage = ({data}) => {
    return (
        <div>
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

            <h1>Check out all available events by cities</h1>
            <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row'}}>
                {data.map(event => <MediaCard city={event.id} desc={event.description} key={event.id} routeLink={`/events/${event.id}`} />)}    
            </div>
        </div>
    )
}

export default EventPage;

// Next.js automatically create a route to "/about-us"

export async function getStaticProps() {
    const {events_categories} = await import('/data/data.json');
    return {
        props: {
            data: events_categories,
        }
    }
}