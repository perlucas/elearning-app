import { useTranslation } from 'react-i18next';

export default function DashboardIndex() {
    const { t, i18n } = useTranslation();

    return (
        <>
            <div>Greeting: {t('greeting')} </div>
            <button onClick={() => i18n.changeLanguage('es')}>Switch to ES</button>
            <button onClick={() => i18n.changeLanguage('en')}>Switch to EN</button>
        </>
    );
}
