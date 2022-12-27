// dynamic page or dynamic route
import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SingleEvent = ({ data }) => {

    const [emailVal, setEmailVal] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleChange = (ev) => {
        setEmailVal(ev.target.value);
    }

    const submitEmail = async (event) => {
        event.preventDefault();
        const eventID = router?.query.id;

        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!emailVal.match(emailRegex)) {
            setErrorMessage('Invalid email format! Please double check your email input!');
        }

        try {
            const res = await fetch('/api/email-handler', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: emailVal, eventID }),
            });

            if (!res.ok) {
                setErrorMessage('Email was already registered!');
                throw new Error(`Error: ${res.status}`);
            }
            const data = await res.json();
            setErrorMessage(data?.message);
            setEmailVal('');

        } catch (error) {
            console.log("ERROR", error);
        }
    }

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

            <h1>Selected city: {data.city.toUpperCase()}</h1>
            <h2>{data.title.toUpperCase()}</h2>
            <p>Description: {data.description}</p>

            <div style={{ paddingTop: '12px', maxWidth: '30%', paddingLeft: '12px' }}>
                <h3>Enter your email to register:</h3>
                <form onSubmit={submitEmail}>
                    <TextField onChange={handleChange} value={emailVal} label='Email' fullWidth />
                    <Button type='submit' sx={{ marginTop: '12px', color: 'blue', border: '1px solid blue' }} disableElevation variant='outlined' size='large'>Submit</Button>
                </form>

                <p style={{ color: 'red' }}>{errorMessage}</p>
            </div>
        </div>
    )
}

export default SingleEvent;

export async function getStaticPaths() {
    const { allEvents } = await import('/data/data.json');
    const allPaths = allEvents.map(ev => {
        return {
            params: {
                category: ev.city,  // parent dir name must be specified as well
                id: ev.id.toString(), //params name must be the same as the file [""] name
            }
        }
    })

    return {
        paths: allPaths,
        fallback: false,
    }
}

export async function getStaticProps(context) {
    const id = context?.params.id;
    const { allEvents } = await import('/data/data.json');
    const eventData = allEvents.find(ev => ev.id === id);

    return {
        props: {
            data: eventData,
        }
    }
}