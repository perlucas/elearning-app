import { Links, Meta, Outlet, Scripts } from 'react-router';

export default function Layout() {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <Meta />
                <Links />
            </head>
            <body>
                <Outlet />
                <Scripts />
            </body>
        </html>
    );
}
