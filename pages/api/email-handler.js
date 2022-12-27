// the name of this file is the API endpoint
import path from 'path';
import fs from 'fs';

const buildPath = () => {
    return path.join(process.cwd(), 'data', 'data.json');
}

const getData = (filePath) => {
    const jsonData = fs.readFileSync(filePath);
    const data = JSON.parse(jsonData);
    return data;
}

export default function handler(req, res) {
    const { method } = req;

    // access database
    // extract data -> allEvents
    // res 404 if error
    // search for the correct id
    // add email into emailRegistered if there it's not in the data base already -> write into the internal database
    // validate email format

    const filePath = buildPath();
    const { events_categories, allEvents } = getData(filePath);
    if (!allEvents) {
        return res.status(404).json({ status: 404, message: 'No event found!' })
    }


    if (method === "POST") {
        const { email, eventID } = req.body;

        if (!email || !email.includes('@')) {
            res.status(422).json({ message: 'Invalid email address!' });
            return;
        }

        const tempAllEvents = allEvents.map(ev => {
            if (ev.id === eventID) {
                if (ev.emails_registered.includes(email)) {
                    res.status(409).json({ message: 'Email was already registered!' });
                    return ev;
                }
                return {
                    ...ev,
                    emails_registered: [...ev.emails_registered, email],
                }
            }

            return ev;
        })

        fs.writeFileSync(filePath, JSON.stringify({ events_categories, allEvents: tempAllEvents }));

        res.status(200).json({ message: `Registered ${email} at '${eventID}' successfully!` })
    }
}

