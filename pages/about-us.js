import Link from "next/link";

const AboutPage = () => {
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

            <h1>About Us Page</h1>
        </div>
    )
}

export default AboutPage;

// Next.js automatically create a route to "/about-us"