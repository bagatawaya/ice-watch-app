



import React, { useEffect } from 'react';
import { Report } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { FacebookIcon, TwitterIcon, WhatsAppIcon, EmailIcon, RedditIcon, SmsIcon } from './icons';

interface SocialShareProps {
  report: Report;
  size?: 'sm' | 'md';
}

// Helper to update a meta tag in the document's head
const updateMetaTag = (property: string, content: string) => {
    let element = document.querySelector(`meta[property='${property}']`) as HTMLMetaElement;
    if (element) {
        element.content = content;
    } else {
        // This is a fallback, but the tags should exist from index.html
        element = document.createElement('meta');
        element.setAttribute('property', property);
        element.content = content;
        document.head.appendChild(element);
    }
};


const SocialShare: React.FC<SocialShareProps> = ({ report, size = 'md' }) => {
  const { t, language } = useLanguage();

  const appUrl = 'https://vigilaice.com';
  // A specific URL for this report is better for caching and deep linking
  const reportUrl = `${appUrl}/#report/${report.id}`;
  
  const shareTitle = t(`sightingTypeName_${report.sightingType}`);
  const translatedDescription = t(report.description);
  const marketingText = t('shareMarketingText');

  // Dynamically update meta tags when this component is rendered on a detail page.
  useEffect(() => {
      // Only run this logic on the report detail page (md size) to avoid conflicts.
      if (size === 'md') {
          const descriptionSnippet = `${translatedDescription.substring(0, 150)}...`;
          updateMetaTag('og:title', `ICE Alert: ${shareTitle}`);
          updateMetaTag('og:description', descriptionSnippet);
          updateMetaTag('og:url', reportUrl);
          // Assuming report.photoBase64 is a data URL or a public URL. For best results, this should be a public URL.
          // Facebook may not be able to crawl base64 images reliably.
          if (report.photoBase64.startsWith('http')) {
             updateMetaTag('og:image', report.photoBase64);
          }
      }
  }, [report, language, size]);


  const formattedDate = new Date(report.timestamp).toLocaleString(language, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  const detailedShareBody = `ICE Sighting Report:\n- Type: ${shareTitle}\n- Location: ${report.address}\n- Time: ${formattedDate}\n- Details: "${translatedDescription.substring(0, 200)}..."\n\n${marketingText}`;
  
  const sanitizedTitle = shareTitle.replace(/\//g, ' or ');
  
  // Social URLs
  const facebookQuote = `ICE Alert: ${sanitizedTitle} at ${report.address.split(',')[0]}. ${marketingText}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(reportUrl)}&quote=${encodeURIComponent(facebookQuote)}`;
  
  const twitterText = `ICE Alert: ${sanitizedTitle} at ${report.address.split(',')[0]}. #VigilaICE #ICEAlert`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${encodeURIComponent(reportUrl)}`;
  
  const redditUrl = `https://reddit.com/submit?url=${encodeURIComponent(reportUrl)}&title=${encodeURIComponent(`ICE Sighting: ${sanitizedTitle} in ${report.address.split(',')[1] || 'area'}`)}`;

  // Messaging URLs
  const whatsAppUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(detailedShareBody + '\n\n' + reportUrl)}`;
  const smsBody = `ICE Alert: ${shareTitle} at ${report.address.split(',')[0]}. View: ${reportUrl}`;
  const smsUrl = `sms:?body=${encodeURIComponent(smsBody)}`;

  // Email URL
  const emailUrl = `mailto:?subject=${encodeURIComponent(`ICE Sighting: ${shareTitle}`)}&body=${encodeURIComponent(detailedShareBody + '\n\n' + `View on the app: ${reportUrl}`)}`;


  const iconSizeClass = size === 'sm' ? 'h-5 w-5' : 'h-6 w-6';

  const ShareButton = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onClick={(e) => e.stopPropagation()} // Prevent card click when sharing from feed
      className="p-2 rounded-full bg-brand-primary hover:bg-brand-secondary text-brand-text-secondary hover:text-brand-text transition-colors"
    >
      {children}
    </a>
  );

  return (
    <div className="py-2">
      <div className="flex items-center justify-between gap-4">
        <span className={`font-semibold text-brand-text-secondary ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
          {t('shareToNotifyFriends')}
        </span>
        <div className={`flex items-center shrink-0 flex-wrap gap-1 ${size === 'sm' ? 'gap-1' : 'gap-2'}`}>
            <ShareButton href={facebookUrl} label={t('shareOnFacebook')}>
              <FacebookIcon className={iconSizeClass} />
            </ShareButton>
            <ShareButton href={twitterUrl} label={t('shareOnTwitter')}>
              <TwitterIcon className={iconSizeClass} />
            </ShareButton>
            <ShareButton href={redditUrl} label={t('shareOnReddit')}>
              <RedditIcon className={iconSizeClass} />
            </ShareButton>
            <div className="h-4 w-[1px] bg-brand-primary mx-1"></div>
            <ShareButton href={whatsAppUrl} label={t('shareOnWhatsApp')}>
              <WhatsAppIcon className={iconSizeClass} />
            </ShareButton>
            <ShareButton href={smsUrl} label={t('shareViaSMS')}>
              <SmsIcon className={iconSizeClass} />
            </ShareButton>
             <ShareButton href={emailUrl} label={t('shareViaEmail')}>
              <EmailIcon className={iconSizeClass} />
            </ShareButton>
        </div>
      </div>
    </div>
  );
};

export default SocialShare;