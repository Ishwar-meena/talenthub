export async function POST(request) {
    try {
        const { toEmail, userName, type } = await request.json();

        // this message send when user promote admin 
        const adminHeading = {
            subject: 'Your are promoted as Admin',
            textContent: `Hi ${userName},\n\nCongratulations!\nYou are promoted as an admin. You can check status on dashboard page\n\nThank you.`,

        }
        // when user submitted his schlorship.
        const schlorshipHeading = {
            subject: 'Scholarship Form Submitted Successfully',
            textContent: `Hi ${userName},\n\nYour scholarship form has been successfully submitted!\nYou can track your application status on dashboard page\n\nThank you.`,
        }
        // when schlorship form verified 
        const verifiedHeading = {
            subject: 'Scholarship Form Verified Successfully',
            textContent: `Hi ${userName},\n\nYour scholarship form has been successfully verified!\nYou can track your application status on dashboard page\n\nThank you.`,
        }
        // when schlorship form verified 
        const rejectedHeading = {
            subject: 'Scholarship Form Rejected',
            textContent: `Hi ${userName},\n\nYour scholarship form has been rejected!\nOpen your dashboard for more details\n\nThank you.`,
        }

        let emailOptions = {
            sender: { name: 'Scholarship Platform', email: process.env.SENDER_EMAIL },
            to: [{ email: toEmail, name: userName }],
        }

        if(type === 'admin'){
            emailOptions = {...emailOptions,...adminHeading};
        }else if(type === 'schlorship'){
            emailOptions = {...emailOptions,...schlorshipHeading};
        }else if(type === 'verified'){
            emailOptions = {...emailOptions,...verifiedHeading};
        }else{
            emailOptions = {...emailOptions,...rejectedHeading};
        }
        

        // send email using api 
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'api-key': process.env.BREVO_API_KEY,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailOptions),
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.log('error data : ', errorData);
            return Response.json({ success: false, message: 'Failed to send email', error: errorData }, { status: 500 });
        }
        return Response.json({ success: true, message: 'Email sent successfully' });

    } catch (error) {
        console.error('API send error:', error);
        return Response.json({ success: false, message: 'Failed to send email' }, { status: 500 });
    }
}