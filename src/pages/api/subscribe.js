export default async function handler(req = NextApiRequest, res = NextApiResponse) {

    const { email } = JSON.parse(req.body);

    if (!email) {
        res.status(401).json({ error: 'Please enter your email address' });
        return;
    }
    if (email && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,20})+$/.test(email)) {
        res.status(401).json({ error: "Please enter a valid email address"});
        return;
    }

    const mailChimpData = {
        members: [
            {
                email_address: email,
                status: 'subscribed'
            }
        ]
    }

    try {
        const audienceId = process.env.MAILCHIMP_AUDIENCE_ID
        const URL = `https://us13.api.mailchimp.com/3.0/lists/${audienceId}`
        const response = await fetch(URL,
            {
                method: 'POST',
                headers: {
                    Authorization: `auth ${process.env.MAILCHIMP_API_KEY}`,
                },
                body: JSON.stringify(mailChimpData),
            }
        );

        const data = await response.json()
        console.log(data)
        // Error handling.
        if (data.errors[0]?.error) {
            return res.status(401).json({ error: data.errors[0].error });
        } else {
            res.status(200).json({ success: true });
        }

    } catch (e) {
        res.status(401).json({ error:  e.message })
    }
}