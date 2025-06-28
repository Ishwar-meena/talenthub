export const SendEmail = async ({ email, username, type }) => {
    // send a notification email to user 
    const emailOption = {
        toEmail: email,
        userName: username,
        type: type,
    };
    const result = await fetch('/api/send-email',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(emailOption),
        }
    );
    return result;
}