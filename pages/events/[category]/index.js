import MediaCard from '../../../src/Card';
import Link from 'next/link';  // client side routing -> no request sent to the server

const CityEvents = ({ data, cityName }) => {
    return (
        <div>

            <div style={{ display: 'flex', flexBasis: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '24px', paddingRight: '24px' }}>
                <h1 style={{ display: 'flex', flexBasis: '80%' }}>
                    Event Booker
                </h1>

                <header style={{ display: 'flex', flexBasis: '20%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Link href='/'>Home</Link>
                    <Link href="/events">Events</Link>
                    <Link href="/about-us">About Us</Link>
                </header>
            </div>

            <h1>Events in {cityName.toUpperCase()}</h1>
            {data.map(ev => (
                <div key={ev.id}>
                    <Link key={ev.id} href={`/events/${ev.city.toLowerCase()}/${ev.id}`} >
                        {ev.title}
                    </Link>
                </div>))}
        </div>
    )
}

export default CityEvents;

export async function getStaticPaths() {
    const { events_categories } = await import('/data/data.json');
    const allPaths = events_categories.map(ev => {
        return {
            params: {
                category: ev.id.toString(),
            }
        }
    });

    return {
        paths: allPaths,
        fallback: false,
    }
}

export async function getStaticProps(context) {
    // param "context" is an object containing the params that we passed in getStaticPaths
    const id = context?.params.category;
    const { allEvents } = await import('/data/data.json');
    const eventsData = allEvents.filter(ev => ev.city.toLowerCase() === id);
    return {
        props: { data: eventsData, cityName: id, }
    }
}