import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    try {
        const apiKey = process.env.RESEND_API_KEY
        if (!apiKey) {
            console.error('RESEND_API_KEY is not set')
            return NextResponse.json(
                { error: 'Email service is not configured.' },
                { status: 500 }
            )
        }

        const resend = new Resend(apiKey)
        const { name, email, message } = await request.json()

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'All fields are required.' },
                { status: 400 }
            )
        }

        const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!EMAIL_RE.test(email)) {
            return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
        }

        if (name.length > 50 || email.length > 50 || message.length > 400) {
            return NextResponse.json(
                { error: 'Input exceeds maximum allowed length.' },
                { status: 400 }
            )
        }

        if (message.trim().length < 30) {
            return NextResponse.json(
                { error: 'Message must be at least 30 characters.' },
                { status: 400 }
            )
        }

        await resend.emails.send({
            from: 'Contact Form <noreply@contact.rynl.dev>',
            to: 'rynldev@gmail.com',
            subject: `New inquiry from ${name}`,
            replyTo: email,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px;">
                    <h2 style="color: #111; font-weight: 400;">New Contact Inquiry</h2>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
                    <p style="white-space: pre-wrap;">${message}</p>
                </div>
            `,
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Contact form error:', error)
        return NextResponse.json(
            { error: 'Failed to send message. Please try again.' },
            { status: 500 }
        )
    }
}
