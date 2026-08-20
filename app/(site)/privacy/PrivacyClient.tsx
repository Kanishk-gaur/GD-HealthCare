'use client'

import { useTranslation } from '@/hooks/useTranslation'

export function PrivacyClient() {
  const { translate } = useTranslation()

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">{translate('Privacy Policy')}</h1>
          <p className="text-lg text-muted-foreground">
            {translate('Last updated: April 2024')}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold mt-8 mb-4">{translate('1. Introduction')}</h2>
            <p className="text-muted-foreground mb-6">
              {translate('GD Healthcare ("we", "us", "our", or "Company") operates the GD Healthcare website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our service and the choices you have associated with that data.')}
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">{translate('2. Information Collection and Use')}</h2>
            <p className="text-muted-foreground mb-6">
              {translate('We collect several different types of information for various purposes to provide and improve our service to you.')}
            </p>

            <h3 className="text-xl font-bold mt-6 mb-3">{translate('Types of Data Collected:')}</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
              <li>{translate('Personal Data: Name, email address, phone number, address, city, state, postal code, country, medical history')}</li>
              <li>{translate('Usage Data: Pages visited, time and date of visits, time spent on pages, browser type, IP address')}</li>
              <li>{translate('Cookies and Similar Technologies: We use cookies to enhance your experience on our website')}</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">{translate('3. Use of Data')}</h2>
            <p className="text-muted-foreground mb-6">
              {translate('GD Healthcare uses the collected data for various purposes:')}
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
              <li>{translate('To provide our services')}</li>
              <li>{translate('To notify you about changes to our services')}</li>
              <li>{translate('To allow you to participate in interactive features of our website')}</li>
              <li>{translate('To provide customer support')}</li>
              <li>{translate('To gather analysis or valuable information so we can improve our services')}</li>
              <li>{translate('To monitor the usage of our services')}</li>
              <li>{translate('To detect, prevent and address technical and security issues')}</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">{translate('4. Security of Data')}</h2>
            <p className="text-muted-foreground mb-6">
              {translate('The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.')}
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">{translate('5. Links to Other Sites')}</h2>
            <p className="text-muted-foreground mb-6">
              {translate("Our service may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.")}
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">{translate('6. Changes to This Privacy Policy')}</h2>
            <p className="text-muted-foreground mb-6">
              {translate('We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.')}
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">{translate('7. Contact Us')}</h2>
            <p className="text-muted-foreground mb-6">
              {translate('If you have any questions about this Privacy Policy, please contact us at:')}
            </p>
            <ul className="list-none text-muted-foreground space-y-2 mb-6">
              <li>{translate('Email:')} <a href="mailto:privacy@gdhealthcare.com" className="text-primary hover:underline">privacy@gdhealthcare.com</a></li>
              <li>{translate('Phone:')} <a href="tel:+919711614738" className="text-primary hover:underline">+91 9711 614 738</a> / <a href="tel:+919821760900" className="text-primary hover:underline">+91 9821 760 900</a></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
