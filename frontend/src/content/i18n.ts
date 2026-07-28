import type { Language } from '../shared/lib/language'

type LocalizedText = Record<Language, string>

export const languageOptions: Array<{ value: Language; label: string }> = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'हिंदी' },
  { value: 'gu', label: 'ગુજરાતી' },
]

export function translate(text: LocalizedText, language: Language) {
  return text[language]
}

export const siteDictionary = {
  brandTagline: {
    en: 'Students, parents, families, and seminars',
    hi: 'छात्र, माता-पिता, परिवार और सेमिनार',
    gu: 'વિદ્યાર્થીઓ, માતા-પિતા, પરિવારો અને સેમિનાર',
  },
  navigation: {
    home: { en: 'Home', hi: 'होम', gu: 'હોમ' },
    about: { en: 'About', hi: 'परिचय', gu: 'પરિચય' },
    photos: { en: 'Photos', hi: 'फोटो', gu: 'ફોટો' },
    topics: { en: 'Topics', hi: 'विषय', gu: 'વિષયો' },
    blog: { en: 'Blog', hi: 'ब्लॉग', gu: 'બ્લોગ' },
    videos: { en: 'Videos', hi: 'वीडियो', gu: 'વિડિયો' },
    resources: { en: 'E-Book Store', hi: 'ई-बुक स्टोर', gu: 'ઈ-બુક સ્ટોર' },

    programs: { en: 'Programs', hi: 'प्रोग्राम', gu: 'પ્રોગ્રામ' },
    book: { en: 'Book Manish', hi: 'मनीष को बुक करें', gu: 'મનીષને બુક કરો' },
    contact: { en: 'Contact', hi: 'संपर्क', gu: 'સંપર્ક' },
  },
  footer: {
    title: {
      en: 'A serious content platform for students, parents, families, and speaking programs.',
      hi: 'छात्रों, माता-पिता, परिवारों और स्पीकिंग प्रोग्राम के लिए एक गंभीर कंटेंट प्लेटफ़ॉर्म।',
      gu: 'વિદ્યાર્થીઓ, માતા-પિતા, પરિવારો અને સ્પીકિંગ પ્રોગ્રામ માટેનું ગંભીર કન્ટેન્ટ પ્લેટફોર્મ.',
    },
    description: {
      en: 'Explore topic hubs, free resources, practical articles, seminar pathways, and the trust pages required for a long-term publishing platform.',
      hi: 'टॉपिक हब, मुफ्त संसाधन, उपयोगी लेख, सेमिनार मार्ग और दीर्घकालिक पब्लिशिंग प्लेटफ़ॉर्म के लिए आवश्यक ट्रस्ट पेज देखें।',
      gu: 'ટોપિક હબ, મફત સાધનો, ઉપયોગી લેખો, સેમિનાર માર્ગો અને લાંબા ગાળાના પબ્લિશિંગ પ્લેટફોર્મ માટે જરૂરી ટ્રસ્ટ પેજ જુઓ.',
    },
    product: { en: 'Product', hi: 'प्लेटफ़ॉर्म', gu: 'પ્લેટફોર્મ' },
    resources: { en: 'Resources', hi: 'संसाधन', gu: 'સાધનો' },
    legal: { en: 'Legal', hi: 'कानूनी', gu: 'કાનૂની' },
    freePdfs: { en: 'Free PDFs', hi: 'मुफ्त PDF', gu: 'મફત PDF' },
    testimonials: { en: 'Testimonials', hi: 'प्रशंसापत्र', gu: 'પ્રશંસાપત્રો' },
    privacy: { en: 'Privacy Policy', hi: 'गोपनीयता नीति', gu: 'ગોપનીયતા નીતિ' },
    terms: { en: 'Terms', hi: 'नियम', gu: 'શરતો' },
    editorial: { en: 'Editorial Policy', hi: 'संपादकीय नीति', gu: 'સંપાદકીય નીતિ' },
    corrections: { en: 'Corrections', hi: 'सुधार नीति', gu: 'સુધારા નીતિ' },
    adDisclosure: { en: 'Ad Disclosure', hi: 'विज्ञापन प्रकटीकरण', gu: 'જાહેરાત ખુલાસો' },
    affiliateDisclosure: { en: 'Affiliate Disclosure', hi: 'एफिलिएट प्रकटीकरण', gu: 'એફિલિએટ ખુલાસો' },
  },
  home: {
    heroEyebrow: {
      en: 'Gujarati-first life guidance platform',
      hi: 'गुजराती-प्रथम जीवन मार्गदर्शन प्लेटफ़ॉर्म',
      gu: 'ગુજરાતી-પ્રથમ જીવન માર્ગદર્શન પ્લેટફોર્મ',
    },
    heroTitle: {
      en: 'Practical guidance for students, parents, and families from Manish Vaghasiya.',
      hi: 'मनीष वाघासिया की ओर से छात्रों, माता-पिता और परिवारों के लिए व्यावहारिक मार्गदर्शन।',
      gu: 'મનીષ વાઘાસિયાથી વિદ્યાર્થીઓ, માતા-પિતા અને પરિવારો માટે પ્રાયોગિક માર્ગદર્શન.',
    },
    heroDescription: {
      en: "Built from Manish Vaghasiya's public authority, this platform brings together helpful articles, seminar insights, free resources, and booking pathways in one trusted place.",
      hi: 'मनीष वाघासिया की सार्वजनिक विश्वसनीयता पर आधारित यह प्लेटफ़ॉर्म उपयोगी लेख, सेमिनार इनसाइट, मुफ्त संसाधन और बुकिंग मार्ग एक ही भरोसेमंद स्थान पर लाता है।',
      gu: 'મનીષ વાઘાસિયાની જાહેર વિશ્વસનીયતાને આધાર બનાવી આ પ્લેટફોર્મ ઉપયોગી લેખો, સેમિનાર ઇનસાઇટ, મફત સાધનો અને બુકિંગ માર્ગોને એક વિશ્વસનીય સ્થળે લાવે છે.',
    },
    exploreTopics: { en: 'Explore Topics', hi: 'विषय देखें', gu: 'વિષયો જુઓ' },
    getResources: { en: 'Get Free Resources', hi: 'मुफ्त संसाधन पाएं', gu: 'મફત સાધનો મેળવો' },
    choosePathTitle: {
      en: 'Choose the path that fits your need',
      hi: 'अपनी ज़रूरत के अनुसार सही मार्ग चुनें',
      gu: 'તમારી જરૂરિયાત મુજબ યોગ્ય માર્ગ પસંદ કરો',
    },
    choosePathDescription: {
      en: 'The platform is organized by audience first so visitors can move toward the content, resource, or inquiry flow that matches them.',
      hi: 'प्लेटफ़ॉर्म को पहले ऑडियंस के आधार पर व्यवस्थित किया गया है ताकि विज़िटर अपने अनुरूप कंटेंट, संसाधन या पूछताछ प्रवाह तक पहुँच सकें।',
      gu: 'પ્લેટફોર્મને પ્રથમ પ્રેક્ષકોના આધાર પર ગોઠવાયું છે જેથી મુલાકાતીઓ તેમને અનુરૂપ કન્ટેન્ટ, સાધન અથવા પૂછપરછ પ્રવાહ સુધી પહોંચી શકે.',
    },
  },
  about: {
    eyebrow: { en: 'About Manish', hi: 'मनीष के बारे में', gu: 'મનીષ વિશે' },
    title: { en: 'A transformational coach and public speaker focused on students, parents, and families.', hi: 'छात्रों, माता-पिता और परिवारों पर केंद्रित एक ट्रांसफॉर्मेशनल कोच और सार्वजनिक वक्ता।', gu: 'વિદ્યાર્થીઓ, માતા-પિતા અને પરિવારો પર કેન્દ્રિત ટ્રાન્સફોર્મેશનલ કોચ અને જાહેર વક્તા.' },
    description: { en: "Public profiles describe Manish Vaghasiya as a transformational coach, inspirational speaker, trainer, and consultant. His visible content themes strongly center on family guidance, parenting, student confidence, and practical life lessons.", hi: 'सार्वजनिक प्रोफाइल मनीष वाघासिया को ट्रांसफॉर्मेशनल कोच, इंस्पिरेशनल स्पीकर, ट्रेनर और कंसल्टेंट के रूप में प्रस्तुत करते हैं। उनकी प्रमुख सामग्री परिवार मार्गदर्शन, पैरेंटिंग, छात्र आत्मविश्वास और व्यावहारिक जीवन पाठों पर केंद्रित है।', gu: 'જાહેર પ્રોફાઇલ મનીષ વાઘાસિયાને ટ્રાન્સફોર્મેશનલ કોચ, ઇન્સ્પિરેશનલ સ્પીકર, ટ્રેનર અને કન્સલ્ટન્ટ તરીકે દર્શાવે છે. તેમની દેખાતી સામગ્રી પરિવાર માર્ગદર્શન, પેરેન્ટિંગ, વિદ્યાર્થી આત્મવિશ્વાસ અને પ્રાયોગિક જીવન પાઠો પર કેન્દ્રિત છે.' },
  },
  contact: {
    eyebrow: { en: 'Contact', hi: 'संपर्क', gu: 'સંપર્ક' },
    title: { en: 'Clear contact details are part of trust, not just support.', hi: 'स्पष्ट संपर्क विवरण सिर्फ सहायता नहीं, भरोसे का भी हिस्सा हैं।', gu: 'સ્પષ્ટ સંપર્ક વિગતો માત્ર સહાય નહીં, વિશ્વાસનો પણ ભાગ છે.' },
    description: { en: 'Readers, organizers, institutions, and future partners should be able to reach the team without confusion.', hi: 'पाठक, आयोजक, संस्थान और भविष्य के साझेदार बिना भ्रम के टीम तक पहुँच सकें।', gu: 'વાચકો, આયોજનકર્તાઓ, સંસ્થાઓ અને ભવિષ્યના ભાગીદારો ટીમ સુધી સરળતાથી પહોંચી શકે તે જરૂરી છે.' },
  },
} as const
