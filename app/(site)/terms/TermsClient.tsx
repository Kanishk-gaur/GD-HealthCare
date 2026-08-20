'use client'

import { useTranslation } from '@/hooks/useTranslation'

export function TermsClient() {
  const { translate } = useTranslation()

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">{translate('Terms & Conditions')}</h1>
          <p className="text-lg text-muted-foreground">
            {translate('Last updated: April 2024')}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold mt-8 mb-4">{translate('1. Agreement to Terms')}</h2>
            <p className="text-muted-foreground mb-6">
              {translate('By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.')}
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">{translate('2. Use License')}</h2>
            <p className="text-muted-foreground mb-6">
              {translate('Permission is granted to temporarily download one copy of the materials (information or software) on GD Healthcare website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:')}
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
              <li>{translate('Modify or copy the materials')}</li>
              <li>{translate('Use the materials for any commercial purpose or for any public display')}</li>
              <li>{translate('Attempt to decompile or reverse engineer any software contained on the website')}</li>
              <li>{translate('Remove any copyright or other proprietary notations from the materials')}</li>
              <li>{translate('Transfer the materials to another person or "mirror" the materials on any other server')}</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">{translate('3. Disclaimer')}</h2>
            <p className="text-muted-foreground mb-6">
              {translate("The materials on GD Healthcare website are provided on an 'as is' basis. GD Healthcare makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.")}
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">{translate('4. Limitations')}</h2>
            <p className="text-muted-foreground mb-6">
              {translate('In no event shall GD Healthcare or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on GD Healthcare website.')}
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">{translate('5. Medical Disclaimer')}</h2>
            <p className="text-muted-foreground mb-6">
              {translate('The information provided on this website is for educational purposes only and should not be considered as medical advice. Always consult with a qualified medical professional before making any health decisions. GD Healthcare is not responsible for any diagnosis or treatment decisions made based on information from this website.')}
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">{translate('6. Accuracy of Materials')}</h2>
            <p className="text-muted-foreground mb-6">
              {translate('The materials appearing on GD Healthcare website could include technical, typographical, or photographic errors. GD Healthcare does not warrant that any of the materials on our website are accurate, complete, or current. GD Healthcare may make changes to the materials contained on our website at any time without notice.')}
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">{translate('7. Links')}</h2>
            <p className="text-muted-foreground mb-6">
              {translate("GD Healthcare has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by GD Healthcare of the site. Use of any such linked website is at the user's own risk.")}
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">{translate('8. Modifications')}</h2>
            <p className="text-muted-foreground mb-6">
              {translate('GD Healthcare may revise these terms of service for our website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.')}
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">{translate('9. Governing Law')}</h2>
            <p className="text-muted-foreground mb-6">
              {translate('These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.')}
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">{translate('10. Contact Us')}</h2>
            <p className="text-muted-foreground mb-6">
              {translate('If you have any questions about these Terms and Conditions, please contact us at:')}
            </p>
            <ul className="list-none text-muted-foreground space-y-2 mb-6">
              <li>{translate('Email:')} <a href="mailto:legal@gdhealthcare.com" className="text-primary hover:underline">legal@gdhealthcare.com</a></li>
              <li>{translate('Phone:')} <a href="tel:+919711614738" className="text-primary hover:underline">+91 9711 614 738</a> / <a href="tel:+918468817445" className="text-primary hover:underline">+91 8468 817 445</a></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
