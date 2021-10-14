const GENERAL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <table role="presentation" style="width:100%; border-collapse:collapse; border-spacing:0; text-align:left; margin: 0 auto; font-family: Arial, Helvetica, sans-serif; max-width: 669px;">
        <tbody>
            <tr>
                <td>
                    <table role="presentation"
                        style="width:100%; border-collapse:collapse; border-spacing:0; text-align:left; margin: 0 auto; font-family: Arial, Helvetica, sans-serif; max-width: 669px; border-top: #29327a 3px solid; margin-top: 20px;">
                        <tbody>
                            <tr style="background-color: #f0ecf4; width: 100%;">
                                <td style="width: 50%; text-align: center;">
                                    <p style="margin: 0; padding: 20px 0 20px 5px; font-size: 1.5rem;"><strong>Somos Más</strong></p>
                                </td>
                                <td style="width: 50%;">
                                    <img src="http://cohorte-septiembre-91ddd87b.s3.us-east-1.amazonaws.com/n2NYKG8WUuvCnjmxndzra.png"
                                        width="150px" style="display: block; margin: 0 auto;" alt="somosmas">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr style="width: 100%; background-color: #F8F8F8;">
                <td style="padding: 50px;">
                {content}
                </td>
            </tr>
            <tr>
                <td>
                    <table role="presentation"
                    style="width:100%; border-collapse:collapse; border-spacing:0; text-align:left; margin: 0 auto; font-family: Arial, Helvetica, sans-serif; max-width: 669px;">
                    <tbody>
                        <tr style="background-color: #f0ecf4; width: 600px;">
                            <td style="width: 50%;">
                                <p style="text-align: center;"><strong>Links</strong></p>
                                <ul style="list-style-type: none; text-align: center; padding: 0;">
                                    <li style="margin-bottom: 10px;"><a style="text-decoration: none;" href="http://somosmas.com.ar">Pagína principal</a></li>
                                    <li style="margin-bottom: 10px;"><a style="text-decoration: none;" href="http://somosmas.com.ar/about">Sobre nosotros</a></li>
                                    <li style="margin-bottom: 10px;"><a style="text-decoration: none;" href="http://somosmas.com.ar/contact">Contacto</a></li>
                                </ul>
                            </td>
                            <td style="width: 50%;">
                                <p style="text-align: center;"><strong>Nos podes encontrar en</strong></p>
                                <ul style="list-style-type: none; text-align: center; padding: 0;">
                                    <li style="margin-bottom: 10px;"><a style="text-decoration: none;" href="http://facebook.com.ar/Somos_Más">Facebook</a></li>
                                    <li style="margin-bottom: 10px;"><a style="text-decoration: none;" href="http://instagram.com/SomosMás">Instagram</a></li>
                                    <li style="margin-bottom: 10px;"><a style="text-decoration: none;" href="mailto:somosfundacionmas@gmail.com">Email</a></li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </td>
            </tr>
        </tbody>
    </table>
</html>`

const WELCOME_EMAIL = GENERAL_TEMPLATE.replace('{content}', `<h1 style="text-align: center; font-size: 1.3rem;">Muchas gracias por registrarte, {name}</h1>
<p style="text-align: center;">Podes acceder a tu perfil desde el siguiente link: <a href="http://somosmas.com.ar/profile">http://somosmas.com.ar/profile</a></p>`)

const CONTACT_EMAIL = GENERAL_TEMPLATE.replace('{content}', `<h1 style="text-align: center; font-size: 1.3rem;">Muchas gracias por su consulta, {name}</h1>
<p style="text-align: center;">Vamos a estar respondiendo a la brevedad a su mensaje</a></p>`)

const buildWelcomeEmail = (name) => WELCOME_EMAIL.replace('{name}', name)

const buildContactEmail = (name) => CONTACT_EMAIL.replace('{name}', name)

module.exports = { buildContactEmail, buildWelcomeEmail }
