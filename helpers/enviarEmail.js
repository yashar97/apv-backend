import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "0819f494d3088c",
        pass: "c655b4e33cc93a"
    }
});

const enviarEmail = async datos => {

    const { nombre, email, token } = datos;

    const info = await transport.sendMail({
        from: 'APV', // sender address
        to: email, // list of receivers
        subject: "¡Hola! 👋", // Subject line
        html: `
            <div class="p-8 bg-gray-100">
                <h1 class="text-3xl font-bold mb-4">¡Hola ${nombre}!</h1>
                <p class="text-lg mb-6">¡Es un placer saludarte!</p>    
                <p>Ingresa al siguiente enlace para verificar tu cuenta</p>
                <a href="http://localhost:5173/verificar/${token}">Aquí</a>

            </div>
        `,
    });


}

export const emailRecuperarPassword = async datos => {

    const { nombre, token, email } = datos;



    const info = await transport.sendMail({
        from: 'APV', // dirección del remitente
        to: email, // lista de destinatarios
        subject: "Recuperación de contraseña", // Asunto del correo
        html: `
            <div class="p-8 bg-gray-100">
                <h1 class="text-3xl font-bold mb-4">¡Hola ${nombre}!</h1>
                <p class="text-lg mb-6">Has solicitado restablecer tu contraseña. Si no has solicitado esto, puedes ignorar este correo.</p>    
                <p>Por favor haz clic en el siguiente enlace para restablecer tu contraseña:</p>
                <a href="${process.env.FRONTEND_URL}/restablecer-password/${token}">Restablecer contraseña</a>
            </div>
        `,
    });



}


export default enviarEmail;