import { Links, Meta, Outlet, Scripts } from 'react-router';
import BaseLayout from '@/components/layout/app';

import '@/plugins/i18n';
import '@/assets/scss/style.scss';

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
                <BaseLayout>
                    <Outlet />
                </BaseLayout>
                <Scripts />
            </body>
        </html>
    );
}
