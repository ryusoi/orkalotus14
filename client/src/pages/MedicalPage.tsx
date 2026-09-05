import { useState, useRef } from "react";
import { Link } from "wouter";
import {
  Activity,
  AlertCircle,
  Award,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  ExternalLink,
  Heart,
  HeartPulse,
  Info,
  Layers,
  MapPin,
  Maximize2,
  MessageCircle,
  Phone,
  PhoneCall,
  Plus,
  Printer,
  QrCode,
  Shield,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserCheck,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import PageShell from "@/components/PageShell";
import { useLocale } from "@/contexts/LocaleContext";
import type { Locale } from "@/data/content";

/* -------------------------------------------------------------------------- */
/*                                IMAGE ASSETS                                */
/* -------------------------------------------------------------------------- */
const MEDICAL_IMAGES = {
  heroGif: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/MEDICAL/Medical%20Gif.gif",
  doctorFatih: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/MEDICAL/Fatih%20Doctor%20Image.png",
  kariaLogo: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/MEDICAL/Logo%20Medical.jpg",
  kariaFlyerQr: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/MEDICAL/KARIA%20HEALTH%20QR%20CODE.png",
  websiteQrCode: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/MEDICAL/QR%20CODE.jpg",
};

const OFFICIAL_MEDICAL_WEBSITE = "https://www.kariahealths.com/";
const DR_FATIH_WHATSAPP = "+90 545 799 78 34";
const WHATSAPP_LINK = "https://wa.me/905457997834?text=Hello%20Dr.%20Fatih%20Durmu%C5%9F%2C%20I%20am%20a%20guest%20at%20Orka%20Lotus%20Beach%20and%20would%20like%20to%20inquire%20about%20medical%20care%20and%20treatments.";

/* -------------------------------------------------------------------------- */
/*                               TRANSLATIONS                                 */
/* -------------------------------------------------------------------------- */
interface MedicalTranslations {
  badge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  directWebBtn: string;
  directWhatsappBtn: string;
  urgent247Title: string;
  urgent247Desc: string;
  doctorCardBadge: string;
  doctorName: string;
  doctorRole: string;
  doctorBio: string;
  missionQuoteTitle: string;
  missionQuote: string;
  vacationQuoteTitle: string;
  vacationQuote: string;
  vipTransferQuoteTitle: string;
  vipTransferQuote: string;
  hotelMonitoringQuoteTitle: string;
  hotelMonitoringQuote: string;
  aftercareQuoteTitle: string;
  aftercareQuote: string;
  flyerSectionBadge: string;
  flyerSectionTitle: string;
  flyerSectionSubtitle: string;
  printFlyerBtn: string;
  flyerHeaderMain: string;
  flyerHeaderSub: string;
  flyerEnHeadline: string;
  flyerEnPoints: string[];
  flyerTrHeadline: string;
  flyerTrPoints: string[];
  servicesTitle: string;
  servicesSubtitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;
  consultationTitle: string;
  consultationSubtitle: string;
  fullNameLabel: string;
  roomNumberLabel: string;
  treatmentTypeLabel: string;
  messageLabel: string;
  sendInquiryBtn: string;
}

const TRANSLATIONS: Record<Locale, MedicalTranslations> = {
  en: {
    badge: "Medical & Health Care Center",
    heroTitle: "In-Hotel Medical Care & Karia Health",
    heroSubtitle: "Dedicated Health Tourism & Urgent Medical Assistance in Marmaris",
    heroDescription:
      "Your health, safety, and comfort are our highest priority. Led by resident physician and KARIA HEALTH Founder Dr. Fatih Durmuş, our medical team delivers immediate 24/7 hotel-room care, certified emergency assistance, and seamless aesthetic health tourism designed around your vacation schedule.",
    directWebBtn: "Visit Karia Health Website",
    directWhatsappBtn: "Direct WhatsApp to Dr. Fatih",
    urgent247Title: "24/7 In-Hotel Medical Emergency",
    urgent247Desc: "Certified medical room visits, prescription dispatch, vital health checks, and emergency first aid directly within Orka Lotus Beach.",
    doctorCardBadge: "Resident Physician & Founder",
    doctorName: "Dr. Fatih Durmuş",
    doctorRole: "Head of Orka Medical Center & Founder / CEO of KARIA HEALTH",
    doctorBio:
      "Dr. Fatih Durmuş combines years of clinical emergency medicine with premier health tourism management. He oversees medical wellness inside Orka Lotus Beach while coordinating world-class aesthetic surgeries, dental transformations, hair restorations, and VIP clinical care across Marmaris.",
    missionQuoteTitle: "Vacation-Synchronized Care",
    missionQuote:
      "\"Our mission is to schedule your treatment while you're on vacation, so you have plenty of free time and we have time for follow-up and adjustments.\"",
    vacationQuoteTitle: "All-Inclusive Medical Package",
    vacationQuote:
      "\"My project includes both a hotel vacation package and all treatments: aesthetic beauty treatments, plastic surgery, dental treatments, hair transplantation, and cosmetic care.\"",
    vipTransferQuoteTitle: "Private Chauffeur VIP Clinic Transfer",
    vipTransferQuote:
      "\"We pick up the patient from their hotel in a private car, take them to the clinic for treatment, and then drop them back off at their hotel.\"",
    hotelMonitoringQuoteTitle: "Dedicated In-Hotel Medical Supervision",
    hotelMonitoringQuote:
      "\"Our healthcare professionals stationed at all hotels are also closely monitoring the patient and providing us with continuous health data.\"",
    aftercareQuoteTitle: "Seamless Post-Treatment Follow-up",
    aftercareQuote:
      "\"In this way, we can safely monitor our patients even after treatment and review the results together with absolute peace of mind.\"",
    flyerSectionBadge: "Printable Medical Grade Flyer",
    flyerSectionTitle: "Official KARIA HEALTH Medical Flyer (A4)",
    flyerSectionSubtitle: "High-resolution color printable flyer with direct QR code access & bilingual tourist patient information.",
    printFlyerBtn: "Print / Save A4 Flyer",
    flyerHeaderMain: "KARIA HEALTH & ORKA LOTUS MEDICAL",
    flyerHeaderSub: "International Health Tourism & Resort Healthcare • Marmaris, Türkiye",
    flyerEnHeadline: "Key Patient Benefits (English):",
    flyerEnPoints: [
      "Vacation + Treatment combined: Schedule surgeries with ample beach & relaxation time.",
      "Private VIP car transfers from Orka Lotus Beach to certified state-of-the-art clinics.",
      "Hotel-stationed medical staff providing continuous bedside follow-ups and dressing care.",
      "Full spectrum: Dental Hollywood Smile, Sapphire FUE Hair Transplant, Plastic Surgery & Medical Aesthetics.",
    ],
    flyerTrHeadline: "Önemli Hasta Ayrıcalıkları (Türkçe):",
    flyerTrPoints: [
      "Tatil ve tedavi bir arada: Ameliyat ve tedavilerinizi tatil programınıza göre planlıyoruz.",
      "Otelinizden özel VIP araç ile kliniğe gidiş ve konforlu dönüş transferi.",
      "Otelimizde görevli sağlık personelimiz ile operasyon sonrası 7/24 kesintisiz takip ve kontrol.",
      "Tam kapsamlı hizmet: Diş estetiği, Safir FUE saç ekimi, plastik cerrahi ve medikal estetik.",
    ],
    servicesTitle: "Specialized Medical & Aesthetic Treatments",
    servicesSubtitle: "Premium clinical procedures scheduled effortlessly around your holiday schedule.",
    step1Title: "1. In-Hotel Consultation",
    step1Desc: "Private assessment in the Orka medical office or your luxury suite with Dr. Fatih.",
    step2Title: "2. VIP Clinic Transfer",
    step2Desc: "Chauffeured private transport directly to top-tier accredited surgical and dental clinics.",
    step3Title: "3. Precision Procedure",
    step3Desc: "Board-certified surgeons and specialists perform treatments with modern European technology.",
    step4Title: "4. In-Suite Aftercare",
    step4Desc: "Daily hotel follow-up visits, pain management, and dressing checks by our resident nurses.",
    consultationTitle: "Schedule a Medical Consultation",
    consultationSubtitle: "Speak directly with Dr. Fatih Durmuş or request an immediate hotel suite visit.",
    fullNameLabel: "Full Name",
    roomNumberLabel: "Room / Suite Number",
    treatmentTypeLabel: "Treatment or Medical Concern",
    messageLabel: "Details or Urgency Description",
    sendInquiryBtn: "Send WhatsApp Medical Request",
  },
  tr: {
    badge: "Sağlık ve Medikal Merkez",
    heroTitle: "Otel İçi Sağlık Hizmeti & Karia Health",
    heroSubtitle: "Marmaris'te Güvenilir Sağlık Turizmi ve Acil Tıbbi Destek",
    heroDescription:
      "Sağlığınız, güvenliğiniz ve konforunuz bizim en büyük önceliğimizdir. Otel hekimimiz ve KARIA HEALTH Kurucusu Dr. Fatih Durmuş liderliğindeki medikal ekibimiz, Orka Lotus Beach bünyesinde 7/24 oda ziyareti, ilk yardım ve tatilinizle kusursuz uyum sağlayan estetik sağlık turizmi hizmetleri sunmaktadır.",
    directWebBtn: "Karia Health Web Sitesini Ziyaret Et",
    directWhatsappBtn: "Dr. Fatih'e Doğrudan WhatsApp",
    urgent247Title: "7/24 Otel İçi Tıbbi Acil Müdahale",
    urgent247Desc: "Sertifikalı doktor oda viziteleri, reçete temini, vital ölçümler ve acil ilk yardım hizmetleri doğrudan Orka Lotus Beach içinde.",
    doctorCardBadge: "Otel Hekimi ve Kurucu",
    doctorName: "Dr. Fatih Durmuş",
    doctorRole: "Orka Medikal Merkezi Sorumlusu & KARIA HEALTH Kurucusu ve CEO'su",
    doctorBio:
      "Dr. Fatih Durmuş, klinik acil tıp deneyimini uluslararası sağlık turizmi vizyonuyla birleştirmektedir. Orka Lotus Beach bünyesinde misafirlerin sağlık güvencesini sağlarken; estetik cerrahi, diş tedavileri, saç ekimi ve VIP klinik süreçlerini koordine etmektedir.",
    missionQuoteTitle: "Tatil ile Senkronize Tedavi",
    missionQuote:
      "\"Misyonumuz, tedavilerinizi siz tatildeyken planlamak; böylece hem bolca serbest zamanınız kalır hem de takip ve kontroller için vaktimiz olur.\"",
    vacationQuoteTitle: "Her Şey Dahil Medikal Paket",
    vacationQuote:
      "\"Projemiz hem otel tatil paketini hem de tüm tedavileri kapsar: estetik güzellik uygulamaları, plastik cerrahi, diş tedavileri, saç ekimi ve kozmetik bakım.\"",
    vipTransferQuoteTitle: "Özel VIP Araç ile Klinik Transferi",
    vipTransferQuote:
      "\"Hastamızı otelinden özel araçla alıp tedavi için kliniğe götürüyor, işlem sonrası tekrar oteline güvenle bırakıyoruz.\"",
    hotelMonitoringQuoteTitle: "Otelde Görevli Sağlık Personeli Takibi",
    hotelMonitoringQuote:
      "\"Otellerde görevlendirdiğimiz sağlık profesyonellerimiz hastalarımızı yakından izleyerek bize sürekli bilgi akışı sağlar.\"",
    aftercareQuoteTitle: "Tedavi Sonrası Kesintisiz Takip",
    aftercareQuote:
      "\"Bu sayede hastalarımızı tedavi sonrasında da güvenle takip edebiliyor, sonuçları gönül rahatlığıyla birlikte değerlendirebiliyoruz.\"",
    flyerSectionBadge: "Yazdırılabilir Medikal Broşür",
    flyerSectionTitle: "Resmi KARIA HEALTH A4 Medikal Broşürü",
    flyerSectionSubtitle: "Doğrudan QR kod erişimi ve Türkçe / İngilizce hasta bilgilendirme içeren yüksek çözünürlüklü renkli yazdırılabilir broşür.",
    printFlyerBtn: "A4 Broşürü Yazdır / Kaydet",
    flyerHeaderMain: "KARIA HEALTH & ORKA LOTUS MEDİKAL",
    flyerHeaderSub: "Uluslararası Sağlık Turizmi & Otel Sağlık Hizmetleri • Marmaris, Türkiye",
    flyerEnHeadline: "Key Patient Benefits (English):",
    flyerEnPoints: [
      "Vacation + Treatment combined: Schedule surgeries with ample beach & relaxation time.",
      "Private VIP car transfers from Orka Lotus Beach to certified state-of-the-art clinics.",
      "Hotel-stationed medical staff providing continuous bedside follow-ups and dressing care.",
      "Full spectrum: Dental Hollywood Smile, Sapphire FUE Hair Transplant, Plastic Surgery & Medical Aesthetics.",
    ],
    flyerTrHeadline: "Önemli Hasta Ayrıcalıkları (Türkçe):",
    flyerTrPoints: [
      "Tatil ve tedavi bir arada: Ameliyat ve tedavilerinizi tatil programınıza göre planlıyoruz.",
      "Otelinizden özel VIP araç ile kliniğe gidiş ve konforlu dönüş transferi.",
      "Otelimizde görevli sağlık personelimiz ile operasyon sonrası 7/24 kesintisiz takip ve kontrol.",
      "Tam kapsamlı hizmet: Diş estetiği, Safir FUE saç ekimi, plastik cerrahi ve medikal estetik.",
    ],
    servicesTitle: "Uzmanlaşmış Tıbbi & Estetik Tedaviler",
    servicesSubtitle: "Tatil keyfinizi bölmeden konforla planlanan birinci sınıf klinik prosedürler.",
    step1Title: "1. Otel İçi Ön Muayene",
    step1Desc: "Dr. Fatih ile otel medikal ofisinde veya süitinizde gizlilik odaklı konsültasyon.",
    step2Title: "2. Özel VIP Transfer",
    step2Desc: "Şoförlü özel VIP araç ile doğrudan akredite modern kliniklere konforlu ulaşım.",
    step3Title: "3. Uzman Tedavi Uygulaması",
    step3Desc: "Alanında uzman cerrahlar ve modern Avrupa standartlarında teknolojik altyapı.",
    step4Title: "4. Süit İçi Bakım ve Takip",
    step4Desc: "Hemşirelerimiz ve hekimimizce odanızda günlük pansuman, kontrol ve ağrı yönetimi.",
    consultationTitle: "Tıbbi Danışma ve Randevu Alın",
    consultationSubtitle: "Dr. Fatih Durmuş ile doğrudan görüşün veya odanıza doktor ziyareti talep edin.",
    fullNameLabel: "Ad Soyad",
    roomNumberLabel: "Oda / Süit Numarası",
    treatmentTypeLabel: "Tedavi veya Sağlık Talebi",
    messageLabel: "Detaylar veya Aciliyet Durumu",
    sendInquiryBtn: "WhatsApp ile Medikal Talep İlet",
  },
  ru: {
    badge: "Медицинский центр и здравоохранение",
    heroTitle: "Медицинская служба в отеле & Karia Health",
    heroSubtitle: "Профессиональный медицинский туризм и неотложная помощь в Мармарисе",
    heroDescription:
      "Ваше здоровье, безопасность и покой — наш главный приоритет. Под руководством врача отеля и основателя KARIA HEALTH доктора Фатиха Дурмуша наша медицинская команда обеспечивает круглосуточную помощь в номерах, первую помощь и эстетический медицинский туризм во время вашего отдыха.",
    directWebBtn: "Посетить сайт Karia Health",
    directWhatsappBtn: "Прямой WhatsApp доктору Фатиху",
    urgent247Title: "Круглосуточная неотложная помощь в отеле",
    urgent247Desc: "Визиты врача в номер, доставка медикаментов, проверка жизненных показателей и первая помощь на территории Orka Lotus Beach.",
    doctorCardBadge: "Главный врач отеля и основатель",
    doctorName: "Д-р Фатих Дурмуш",
    doctorRole: "Руководитель медпункта Orka & Основатель / CEO KARIA HEALTH",
    doctorBio:
      "Доктор Фатих Дурмуш объединяет богатый клинический опыт с международным медицинским туризмом. Он курирует здоровье гостей Orka Lotus Beach и организует эстетические операции, стоматологию, пересадку волос и VIP-лечение в Мармарисе.",
    missionQuoteTitle: "Лечение во время отдыха",
    missionQuote:
      "\"Наша цель — спланировать лечение во время вашего отпуска, чтобы у вас было достаточно свободного времени, а у нас — время для контроля и наблюдения.\"",
    vacationQuoteTitle: "Пакет «Отдых + Лечение»",
    vacationQuote:
      "\"Мой проект включает как проживание в отеле, так и все виды лечения: эстетическую косметологию, пластическую хирургию, стоматологию и пересадку волос.\"",
    vipTransferQuoteTitle: "VIP-трансфер с личным водителем",
    vipTransferQuote:
      "\"Мы забираем пациента из отеля на персональном автомобиле, доставляем в клинику и после процедуры с комфортом возвращаем обратно.\"",
    hotelMonitoringQuoteTitle: "Контроль медиков прямо в отеле",
    hotelMonitoringQuote:
      "\"Наши медицинские работники в отелях внимательно наблюдают за пациентами и постоянно передают нам данные о самочувствии.\"",
    aftercareQuoteTitle: "Безопасное послеоперационное наблюдение",
    aftercareQuote:
      "\"Благодаря этому мы можем безопасно наблюдать пациентов после процедур и вместе оценивать безупречные результаты.\"",
    flyerSectionBadge: "Медицинский флаер для печати",
    flyerSectionTitle: "Официальный медицинский флаер KARIA HEALTH (A4)",
    flyerSectionSubtitle: "Цветной флаер высокого разрешения формата А4 с прямым QR-кодом для печати и сохранения.",
    printFlyerBtn: "Печать / Сохранить флаер А4",
    flyerHeaderMain: "KARIA HEALTH & ORKA LOTUS MEDICAL",
    flyerHeaderSub: "Международный медицинский туризм • Мармарис, Турция",
    flyerEnHeadline: "Преимущества для пациентов (English):",
    flyerEnPoints: [
      "Vacation + Treatment combined: Schedule surgeries with ample beach & relaxation time.",
      "Private VIP car transfers from Orka Lotus Beach to certified state-of-the-art clinics.",
      "Hotel-stationed medical staff providing continuous bedside follow-ups and dressing care.",
      "Full spectrum: Dental Hollywood Smile, Sapphire FUE Hair Transplant, Plastic Surgery & Medical Aesthetics.",
    ],
    flyerTrHeadline: "Önemli Hasta Ayrıcalıkları (Türkçe):",
    flyerTrPoints: [
      "Tatil ve tedavi bir arada: Ameliyat ve tedavilerinizi tatil programınıza göre planlıyoruz.",
      "Otelinizden özel VIP araç ile kliniğe gidiş ve konforlu dönüş transferi.",
      "Otelimizde görevli sağlık personelimiz ile operasyon sonrası 7/24 kesintisiz takip ve kontrol.",
      "Tam kapsamlı hizmet: Diş estetiği, Safir FUE saç ekimi, plastik cerrahi ve medikal estetik.",
    ],
    servicesTitle: "Специализированные медицинские и эстетические услуги",
    servicesSubtitle: "Премиальные процедуры, спланированные без ущерба для вашего курортного отдыха.",
    step1Title: "1. Консультация в отеле",
    step1Desc: "Осмотр и конфиденциальная беседа с доктором Фатихом в медпункте отеля или вашем номере.",
    step2Title: "2. Персональный VIP-трансфер",
    step2Desc: "Комфортная поездка на автомобиле представительского класса в аккредитованные клиники.",
    step3Title: "3. Проведение процедуры",
    step3Desc: "Операции и лечение ведущими сертифицированными хирургами по европейским стандартам.",
    step4Title: "4. Уход и наблюдение в номере",
    step4Desc: "Ежедневные перевязки, контроль восстановления и круглосуточная поддержка медперсонала.",
    consultationTitle: "Запись на консультацию к врачу",
    consultationSubtitle: "Свяжитесь с доктором Фатихом Дурмушем напрямую или запросите визит в номер.",
    fullNameLabel: "Имя и Фамилия",
    roomNumberLabel: "Номер комнаты / виллы",
    treatmentTypeLabel: "Интересующая процедура или жалоба",
    messageLabel: "Описание или срочность",
    sendInquiryBtn: "Отправить запрос в WhatsApp",
  },
  de: {
    badge: "Medizinisches Zentrum & Gesundheitspflege",
    heroTitle: "Hotel-Medizinische Versorgung & Karia Health",
    heroSubtitle: "Erstklassiger Medizintourismus und Notfallversorgung in Marmaris",
    heroDescription:
      "Ihre Gesundheit, Sicherheit und Ihr Wohlbefinden stehen für uns an erster Stelle. Unter der Leitung unseres Hotelarztes und KARIA HEALTH Gründers Dr. Fatih Durmuş bietet unser medizinisches Team 24/7 Notfallbetreuung, Zimmerbesuche und erstklassigen Medizintourismus abgestimmt auf Ihren Urlaub.",
    directWebBtn: "Karia Health Website Besuchen",
    directWhatsappBtn: "Direktes WhatsApp an Dr. Fatih",
    urgent247Title: "24/7 Notfallversorgung im Hotel",
    urgent247Desc: "Zertifizierte Zimmerbesuche, Medikamentenversorgung, Vitalüberwachung und Erste Hilfe direkt im Orka Lotus Beach.",
    doctorCardBadge: "Hotelarzt & Gründer",
    doctorName: "Dr. Fatih Durmuş",
    doctorRole: "Leiter des Orka Medical Centers & Gründer / CEO von KARIA HEALTH",
    doctorBio:
      "Dr. Fatih Durmuş verbindet klinische Notfallmedizin mit internationalem Gesundheitstourismus. Er garantiert die medizinische Sicherheit im Orka Lotus Beach und leitet ästhetische Behandlungen, Zahnästhetik und Haartransplantationen in Marmaris.",
    missionQuoteTitle: "Behandlung synchron zum Urlaub",
    missionQuote:
      "\"Unsere Mission ist es, Ihre Behandlung während Ihres Urlaubs zu planen, damit Sie reichlich Freizeit haben und wir Zeit für Nachsorge und Anpassungen haben.\"",
    vacationQuoteTitle: "All-Inclusive Medizinisches Paket",
    vacationQuote:
      "\"Mein Projekt umfasst sowohl das Hotelurlaubspaket als auch alle Behandlungen: Schönheitsbehandlungen, plastische Chirurgie, Zahnbehandlungen, Haartransplantation und Kosmetik.\"",
    vipTransferQuoteTitle: "Privater VIP-Kliniktransfer mit Chauffeur",
    vipTransferQuote:
      "\"Wir holen den Patienten mit einem Privatwagen vom Hotel ab, bringen ihn zur Klinik und fahren ihn nach der Behandlung bequem zurück.\"",
    hotelMonitoringQuoteTitle: "Medizinische Betreuung direkt im Hotel",
    hotelMonitoringQuote:
      "\"Unser in den Hotels stationiertes Fachpersonal betreut die Patienten kontinuierlich und hält uns stets auf dem neuesten Stand.\"",
    aftercareQuoteTitle: "Sichere Nachsorge und Betreuung",
    aftercareQuote:
      "\"Auf diese Weise können wir unsere Patienten auch nach der Behandlung sicher überwachen und die Ergebnisse in aller Ruhe gemeinsam auswerten.\"",
    flyerSectionBadge: "Druckbarer Medizinischer Flyer",
    flyerSectionTitle: "Offizieller KARIA HEALTH A4 Medizin-Flyer",
    flyerSectionSubtitle: "Hochauflösender Farbflyer im A4-Format mit QR-Code für Touristen und Hotelgäste.",
    printFlyerBtn: "A4 Flyer Drucken / Speichern",
    flyerHeaderMain: "KARIA HEALTH & ORKA LOTUS MEDICAL",
    flyerHeaderSub: "Internationaler Medizintourismus & Hotelgesundheitsdienst • Marmaris, Türkei",
    flyerEnHeadline: "Key Patient Benefits (English):",
    flyerEnPoints: [
      "Vacation + Treatment combined: Schedule surgeries with ample beach & relaxation time.",
      "Private VIP car transfers from Orka Lotus Beach to certified state-of-the-art clinics.",
      "Hotel-stationed medical staff providing continuous bedside follow-ups and dressing care.",
      "Full spectrum: Dental Hollywood Smile, Sapphire FUE Hair Transplant, Plastic Surgery & Medical Aesthetics.",
    ],
    flyerTrHeadline: "Önemli Hasta Ayrıcalıkları (Türkçe):",
    flyerTrPoints: [
      "Tatil ve tedavi bir arada: Ameliyat ve tedavilerinizi tatil programınıza göre planlıyoruz.",
      "Otelinizden özel VIP araç ile kliniğe gidiş ve konforlu dönüş transferi.",
      "Otelimizde görevli sağlık personelimiz ile operasyon sonrası 7/24 kesintisiz takip ve kontrol.",
      "Tam kapsamlı hizmet: Diş estetiği, Safir FUE saç ekimi, plastik cerrahi ve medikal estetik.",
    ],
    servicesTitle: "Spezialisierte Medizin- & Ästhetikbehandlungen",
    servicesSubtitle: "Erstklassige klinische Eingriffe, die sich mühelos in Ihren Urlaub einfügen.",
    step1Title: "1. Voruntersuchung im Hotel",
    step1Desc: "Diskrete Beratung und Untersuchung mit Dr. Fatih in der Praxis oder in Ihrer Hotelsuite.",
    step2Title: "2. Chauffierter VIP-Transfer",
    step2Desc: "Bequeme Hin- und Rückfahrt mit Privatfahrzeug direkt zu modernen Partnerkliniken.",
    step3Title: "3. Präzise Behandlung",
    step3Desc: "Durchführung durch zertifizierte Fachärzte nach höchsten europäischen Qualitätsstandards.",
    step4Title: "4. Nachsorge im Hotelzimmer",
    step4Desc: "Tägliche Verbandswechsel, Schmerzmanagement und Betreuung durch unsere Hotelkrankenschwestern.",
    consultationTitle: "Medizinische Beratung anfragen",
    consultationSubtitle: "Sprechen Sie direkt mit Dr. Fatih Durmuş oder fordern Sie einen Zimmerbesuch an.",
    fullNameLabel: "Vollständiger Name",
    roomNumberLabel: "Zimmer- / Suiten-Nummer",
    treatmentTypeLabel: "Behandlungsart oder Anliegen",
    messageLabel: "Details oder Dringlichkeit",
    sendInquiryBtn: "WhatsApp-Anfrage Senden",
  },
};

/* -------------------------------------------------------------------------- */
/*                            TREATMENT CATEGORIES                            */
/* -------------------------------------------------------------------------- */
const TREATMENT_CATEGORIES = [
  {
    id: "hotel-urgencies",
    icon: Stethoscope,
    badge: "In-Hotel 24/7",
    color: "from-blue-600 to-cyan-600",
    border: "border-blue-500/40",
    title: "In-Hotel Urgent Care & General Health",
    subtitle: "Immediate on-site physician support inside Orka Lotus Beach",
    features: [
      "24/7 on-call doctor room visits & medical triage",
      "Blood pressure, blood sugar, ECG & vital sign monitoring",
      "Minor trauma, sunstroke, wound dressings & suture care",
      "Prescription coordination & rapid medication delivery to your suite",
      "Multilingual medical assistance for international insurance claims",
    ],
  },
  {
    id: "dental-aesthetics",
    icon: Sparkles,
    badge: "Karia Health Dental",
    color: "from-teal-600 to-emerald-600",
    border: "border-teal-500/40",
    title: "Dental Aesthetics & Hollywood Smile",
    subtitle: "Digital smile design & painless same-week restorations",
    features: [
      "Zirconia crowns & ultra-thin E-max porcelain veneers",
      "Painless dental implants & All-on-4 / All-on-6 full arch restoration",
      "Laser teeth whitening (Zoom laser technology)",
      "Digital 3D CAD/CAM oral scans & customized aesthetic smile preview",
      "Full post-treatment care and maintenance kit provided at hotel",
    ],
  },
  {
    id: "hair-transplantation",
    icon: Activity,
    badge: "Sapphire FUE & DHI",
    color: "from-sky-600 to-indigo-600",
    border: "border-sky-500/40",
    title: "Hair Transplantation & Restoration",
    subtitle: "Maximum graft density with painless local anesthesia",
    features: [
      "Sapphire FUE (Follicular Unit Extraction) for natural micro-incisions",
      "DHI (Direct Hair Implantation) with Choi implanter pens",
      "Beard, mustache & eyebrow micro-graft transplantation",
      "Platelet-Rich Plasma (PRP) regenerative hair therapy",
      "Daily specialized washing, anti-swelling treatment & recovery band in hotel",
    ],
  },
  {
    id: "plastic-surgery",
    icon: HeartPulse,
    badge: "Accredited Clinics",
    color: "from-blue-700 to-sky-700",
    border: "border-blue-600/40",
    title: "Plastic & Reconstructive Surgery",
    subtitle: "Board-certified aesthetic surgeons & VIP private clinic suites",
    features: [
      "Aesthetic Rhinoplasty (Ultrasonic Piezo nose reshaping)",
      "Vaser Liposuction & High-Definition body contouring",
      "Breast augmentation, lift & reduction procedures",
      "Facelift, neck lift, blepharoplasty (eyelid rejuvenation)",
      "Dedicated nurse visits in your Orka Lotus suite for daily follow-up",
    ],
  },
  {
    id: "medical-cosmetics",
    icon: Award,
    badge: "Anti-Aging & Glow",
    color: "from-indigo-600 to-cyan-600",
    border: "border-indigo-500/40",
    title: "Medical Aesthetics & Cosmetic Care",
    subtitle: "Quick, non-invasive rejuvenation treatments with zero downtime",
    features: [
      "Botulinum toxin wrinkle smoothing & baby botox",
      "Hyaluronic acid lip contouring & dermal volume fillers",
      "Mesotherapy skin glow cocktails & salmon DNA youth elixir",
      "Post-sun hydration drips, IV vitamin therapy & detox infusions",
      "Medical grade chemical peels & deep collagen stimulation",
    ],
  },
];

export default function MedicalPage() {
  const { locale, setLocale } = useLocale();
  const t = TRANSLATIONS[locale] || TRANSLATIONS.en;

  const [activeImageZoom, setActiveImageZoom] = useState<string | null>(null);
  const [formState, setFormState] = useState({
    fullName: "",
    roomNumber: "",
    treatmentType: "Hotel Room Doctor Visit",
    message: "",
  });

  const flyerRef = useRef<HTMLDivElement>(null);

  const handlePrintFlyer = () => {
    window.print();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedMsg = encodeURIComponent(
      `*Medical Request - Orka Lotus Beach*\n` +
      `*Patient Name:* ${formState.fullName || "Guest"}\n` +
      `*Room / Suite:* ${formState.roomNumber || "N/A"}\n` +
      `*Service / Concern:* ${formState.treatmentType}\n` +
      `*Details:* ${formState.message || "Please contact me for medical consultation."}`
    );
    window.open(`https://wa.me/905457997834?text=${encodedMsg}`, "_blank");
    toast.success("Connecting with Dr. Fatih Durmuş via WhatsApp...", {
      description: "Our medical desk will assist you immediately.",
    });
  };

  return (
    <PageShell currentLocale={locale} onLocaleChange={setLocale}>
      {/* ------------------------------------------------------------------ */}
      {/*                       HERO SECTION WITH CRISP GIF DISPLAY          */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative min-h-[600px] flex flex-col items-center justify-center overflow-hidden bg-slate-950 text-white pt-24 pb-16">
        {/* Subtle Ambient Background Gradient (Non-obstructive) */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/25 via-transparent to-transparent pointer-events-none" />

        {/* Floating Centered Dynamic Red Health Cross */}
        <div className="relative z-10 mb-4 flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            {/* Pulsing Outer Rings */}
            <div className="absolute w-20 h-20 rounded-full bg-red-500/20 animate-ping" />
            <div className="absolute w-14 h-14 rounded-full bg-red-600/30 animate-pulse" />
            
            {/* 3D Red Medical Cross */}
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-rose-700 shadow-[0_0_35px_rgba(239,68,68,0.75)] flex items-center justify-center border-2 border-red-300/60">
              <Plus className="w-8 h-8 text-white stroke-[3.5] drop-shadow-md" />
            </div>
          </div>
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
          {/* Breadcrumbs */}
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-cyan-300/80 mb-3 font-semibold">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Medical &amp; Karia Health</span>
          </div>

          {/* Medical Grade Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md mb-6 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>{t.badge}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-300">24/7 Active</span>
          </div>

          {/* Clean, Sized & Filter-Free Medical Animation Display */}
          <div className="relative mx-auto mb-8 max-w-2xl w-full rounded-2xl sm:rounded-3xl overflow-hidden border-2 sm:border-3 border-cyan-400/60 shadow-[0_12px_45px_rgba(6,182,212,0.35)] bg-slate-900 group">
            <img
              src={MEDICAL_IMAGES.heroGif}
              alt="Medical Center Animation"
              className="w-full h-auto max-h-[300px] sm:max-h-[380px] object-contain mx-auto block"
              referrerPolicy="no-referrer"
            />
            {/* Quick Zoom Trigger */}
            <button
              onClick={() => setActiveImageZoom(MEDICAL_IMAGES.heroGif)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center border border-cyan-400/40 transition-all opacity-80 hover:opacity-100 shadow-md"
              aria-label="Enlarge animation"
            >
              <Maximize2 className="w-3.5 h-3.5 text-cyan-300" />
            </button>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight text-white font-medium leading-tight mb-4">
            {t.heroTitle}
          </h1>

          <p className="text-lg sm:text-xl text-cyan-100/90 font-light mb-6 leading-relaxed max-w-2xl mx-auto">
            {t.heroSubtitle}
          </p>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8 max-w-3xl mx-auto">
            {t.heroDescription}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={OFFICIAL_MEDICAL_WEBSITE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium text-sm tracking-wide shadow-[0_4px_20px_rgba(2,132,199,0.4)] transition-all duration-200 transform hover:-translate-y-0.5 border border-cyan-300/30"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{t.directWebBtn}</span>
            </a>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium text-sm tracking-wide shadow-[0_4px_20px_rgba(16,185,129,0.35)] transition-all duration-200 transform hover:-translate-y-0.5 border border-emerald-300/30"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.directWhatsappBtn} ({DR_FATIH_WHATSAPP})</span>
            </a>
          </div>

          {/* Emergency Alert Strip */}
          <div className="mt-10 p-4 rounded-2xl bg-gradient-to-r from-red-950/70 via-slate-900/90 to-red-950/70 border-2 border-red-500/40 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-lg">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-red-600/30 border border-red-400/50 flex items-center justify-center shrink-0 text-red-400">
                <AlertCircle className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white tracking-wide uppercase flex items-center gap-2">
                  <span>{t.urgent247Title}</span>
                  <span className="px-2 py-0.5 text-[10px] bg-red-600 text-white font-bold rounded-full">EMERGENCY</span>
                </h2>
                <p className="text-xs text-slate-300 mt-0.5">{t.urgent247Desc}</p>
              </div>
            </div>
            <a
              href="tel:+905457997834"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider transition-colors shrink-0 shadow-md"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Emergency Call</span>
            </a>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*               DR. FATIH DURMUŞ & KARIA HEALTH OVERVIEW              */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 bg-[var(--paper)] text-[var(--ink)] border-b border-[var(--line)]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Dr. Fatih Image Card */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative group w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-blue-500/30 bg-slate-900">
                <img
                  src={MEDICAL_IMAGES.doctorFatih}
                  alt="Dr. Fatih Durmuş - Head Physician & Founder"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Doctor Overlay Badge */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-5 text-white">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600 text-[11px] font-bold uppercase tracking-wider mb-1">
                    <UserCheck className="w-3 h-3" />
                    <span>{t.doctorCardBadge}</span>
                  </div>
                  <h2 className="text-xl font-serif font-semibold text-white">{t.doctorName}</h2>
                  <p className="text-xs text-blue-200 mt-0.5">{t.doctorRole}</p>
                </div>

                {/* Lightbox Trigger */}
                <button
                  onClick={() => setActiveImageZoom(MEDICAL_IMAGES.doctorFatih)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-all"
                  aria-label="Enlarge image"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* KARIA HEALTH Official Logo Card */}
              <div className="mt-6 w-full max-w-md p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-blue-500/20 shadow-md flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={MEDICAL_IMAGES.kariaLogo}
                    alt="KARIA HEALTH Official Logo"
                    className="w-14 h-14 rounded-xl object-contain border border-slate-200 dark:border-slate-800 bg-white p-1"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-blue-900 dark:text-blue-300">KARIA HEALTH</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Founder &amp; CEO: Dr. Fatih Durmuş</p>
                  </div>
                </div>
                <a
                  href={OFFICIAL_MEDICAL_WEBSITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950 dark:hover:bg-blue-900 text-blue-600 dark:text-blue-400 transition-colors"
                  aria-label="Open Karia Health website"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Content & Direct Quotes Column */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-wide uppercase mb-3">
                <Stethoscope className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Hotel Medical Authority &amp; Vision</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--ink)] leading-tight mb-4">
                Comprehensive Healthcare &amp; Stress-Free Health Tourism in Marmaris
              </h2>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {t.doctorBio}
              </p>

              {/* Direct Statements & Philosophy from Dr. Fatih */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border-l-4 border-blue-600 text-sm">
                  <h3 className="font-bold text-blue-950 dark:text-blue-200 mb-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>{t.missionQuoteTitle}</span>
                  </h3>
                  <p className="italic text-slate-700 dark:text-slate-300">{t.missionQuote}</p>
                </div>

                <div className="p-4 rounded-2xl bg-teal-50/70 dark:bg-teal-950/30 border-l-4 border-teal-600 text-sm">
                  <h3 className="font-bold text-teal-950 dark:text-teal-200 mb-1 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    <span>{t.vacationQuoteTitle}</span>
                  </h3>
                  <p className="italic text-slate-700 dark:text-slate-300">{t.vacationQuote}</p>
                </div>

                <div className="p-4 rounded-2xl bg-sky-50/70 dark:bg-sky-950/30 border-l-4 border-sky-600 text-sm">
                  <h3 className="font-bold text-sky-950 dark:text-sky-200 mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                    <span>{t.vipTransferQuoteTitle}</span>
                  </h3>
                  <p className="italic text-slate-700 dark:text-slate-300">{t.vipTransferQuote}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
                    <span className="font-bold text-blue-700 dark:text-blue-400 block mb-1">
                      {t.hotelMonitoringQuoteTitle}
                    </span>
                    <p className="italic text-slate-600 dark:text-slate-400">{t.hotelMonitoringQuote}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400 block mb-1">
                      {t.aftercareQuoteTitle}
                    </span>
                    <p className="italic text-slate-600 dark:text-slate-400">{t.aftercareQuote}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*         LARGE A4 PRINTABLE MEDICAL GRADE FLYER SECTION             */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden" id="a4-flyer-section">
        {/* Background Subtle Medical Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Printer className="w-3.5 h-3.5" />
              <span>{t.flyerSectionBadge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-2">
              {t.flyerSectionTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-6">
              {t.flyerSectionSubtitle}
            </p>

            <button
              onClick={handlePrintFlyer}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-transform duration-200 hover:scale-105"
            >
              <Printer className="w-4 h-4" />
              <span>{t.printFlyerBtn}</span>
            </button>
          </div>

          {/* Large A4 Canvas Area with Medical Blue Frame & White Canvas */}
          <div
            ref={flyerRef}
            className="w-full max-w-3xl mx-auto rounded-3xl p-4 sm:p-7 bg-blue-700 shadow-[0_20px_60px_rgba(0,0,0,0.6)] border-4 border-cyan-400/80"
          >
            {/* White A4 Inner Surface */}
            <div className="w-full bg-white text-slate-900 rounded-2xl p-6 sm:p-10 shadow-inner border-2 border-blue-200 relative">
              
              {/* Flyer Top Header Banner */}
              <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b-2 border-blue-600 gap-4 text-center sm:text-left">
                <div className="flex items-center gap-4">
                  <img
                    src={MEDICAL_IMAGES.kariaLogo}
                    alt="KARIA HEALTH Logo"
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-xl border border-slate-300 bg-white p-1 shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-blue-900 tracking-tight font-serif">
                      {t.flyerHeaderMain}
                    </h2>
                    <p className="text-xs text-blue-700 font-semibold tracking-wide uppercase mt-0.5">
                      {t.flyerHeaderSub}
                    </p>
                    <p className="text-xs text-slate-600 font-medium mt-1">
                      Founder &amp; CEO: <strong>Dr. Fatih Durmuş</strong> • 24/7 Hotline: <strong>{DR_FATIH_WHATSAPP}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center shrink-0">
                  <span className="px-3 py-1 bg-red-600 text-white text-[11px] font-bold rounded-full uppercase tracking-wider shadow-sm">
                    24/7 In-Hotel Doctor
                  </span>
                  <span className="text-[10px] text-slate-500 mt-1">Orka Lotus Beach</span>
                </div>
              </div>

              {/* Flyer Center: Large High-Resolution QR Code Area Filling Nearly Most of Center */}
              <div className="my-8 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-50/70 to-cyan-50/50 rounded-2xl border-2 border-blue-300 relative shadow-sm">
                <div className="absolute -top-3 px-4 py-0.5 bg-blue-600 text-white text-[11px] font-bold rounded-full uppercase tracking-widest shadow">
                  Scan for Instant Care &amp; Booking
                </div>

                {/* Center QR Code Image (No Obstructions) */}
                <div className="relative group my-2 p-2 bg-white rounded-2xl shadow-xl border-4 border-blue-600 max-w-[280px] sm:max-w-[340px] w-full">
                  <img
                    src={MEDICAL_IMAGES.websiteQrCode}
                    alt="KARIA HEALTH QR Code - Direct Medical Access"
                    className="w-full h-auto object-contain rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="text-center mt-3">
                  <p className="text-xs font-bold text-blue-900 tracking-wide uppercase">
                    Official Website &amp; WhatsApp Direct Access
                  </p>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Scan with your smartphone camera to connect with Dr. Fatih Durmuş immediately
                  </p>
                </div>
              </div>

              {/* Flyer Dual Language Key Points (English & Turkish) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t-2 border-blue-100">
                {/* English Section */}
                <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200">
                  <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <span>{t.flyerEnHeadline}</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {t.flyerEnPoints.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Turkish Section */}
                <div className="p-4 rounded-xl bg-cyan-50/50 border border-cyan-200">
                  <h3 className="text-xs font-bold text-cyan-950 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-600" />
                    <span>{t.flyerTrHeadline}</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {t.flyerTrPoints.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Flyer Bottom Footer Callouts */}
              <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-3">
                <div>
                  <strong>Location:</strong> Cumhuriyet Mah. Atatürk Cad. No:56, İçmeler, Marmaris / Muğla
                </div>
                <div className="flex items-center gap-3 font-semibold text-blue-800">
                  <span>Web: www.kariahealths.com</span>
                  <span>•</span>
                  <span>WhatsApp: {DR_FATIH_WHATSAPP}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Printable Flyer Preview (Graphic Flyer) */}
          <div className="mt-12 text-center">
            <h3 className="text-base font-semibold text-slate-300 mb-4">
              Alternative High-Impact Visual Poster Flyer:
            </h3>
            <div className="inline-block relative group max-w-sm rounded-2xl overflow-hidden border-2 border-blue-500/40 shadow-xl bg-slate-950">
              <img
                src={MEDICAL_IMAGES.kariaFlyerQr}
                alt="KARIA HEALTH High Impact Poster"
                className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setActiveImageZoom(MEDICAL_IMAGES.kariaFlyerQr)}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold gap-2 transition-opacity"
              >
                <Maximize2 className="w-5 h-5" />
                <span>Click to Enlarge Flyer</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*                   TREATMENT CATEGORIES GRID                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 bg-[var(--paper)] text-[var(--ink)]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Full Medical Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--ink)] mb-3">
              {t.servicesTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
              {t.servicesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TREATMENT_CATEGORIES.map((cat) => {
              const IconComp = cat.icon;
              return (
                <div
                  key={cat.id}
                  className={`rounded-3xl p-6 bg-white dark:bg-slate-900 border-2 ${cat.border} shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.color} text-white flex items-center justify-center shadow-md`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[11px] font-bold tracking-wide uppercase border border-blue-200 dark:border-blue-800">
                        {cat.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-[var(--ink)] mb-1">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                      {cat.subtitle}
                    </p>

                    <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-4">
                      {cat.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 hover:bg-blue-600 dark:bg-slate-800 dark:hover:bg-blue-600 text-slate-800 hover:text-white dark:text-slate-200 dark:hover:text-white text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Inquire Treatment</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*                 THE 4-STEP GUEST MEDICAL JOURNEY                   */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 bg-gradient-to-b from-blue-950 to-slate-950 text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
              Flawless Care Protocol
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-3 mb-2">
              How Your Treatment Works
            </h2>
            <p className="text-sm text-cyan-100/80">
              Designed specifically so you enjoy Marmaris while achieving optimal medical outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-blue-500/30 backdrop-blur-md relative">
              <span className="text-4xl font-serif font-bold text-blue-500/30 absolute top-4 right-4">01</span>
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-4">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{t.step1Title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{t.step1Desc}</p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/80 border border-teal-500/30 backdrop-blur-md relative">
              <span className="text-4xl font-serif font-bold text-teal-500/30 absolute top-4 right-4">02</span>
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{t.step2Title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{t.step2Desc}</p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/80 border border-sky-500/30 backdrop-blur-md relative">
              <span className="text-4xl font-serif font-bold text-sky-500/30 absolute top-4 right-4">03</span>
              <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{t.step3Title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{t.step3Desc}</p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/80 border border-indigo-500/30 backdrop-blur-md relative">
              <span className="text-4xl font-serif font-bold text-indigo-500/30 absolute top-4 right-4">04</span>
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-4">
                <HeartPulse className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{t.step4Title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{t.step4Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*               CONSULTATION & DIRECT INQUIRY FORM                   */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 bg-[var(--paper)] text-[var(--ink)]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="rounded-3xl p-8 sm:p-12 bg-white dark:bg-slate-900 border-2 border-blue-500/30 shadow-2xl">
            <div className="text-center max-w-xl mx-auto mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-2">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Direct Doctor Dispatch</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--ink)] mb-2">
                {t.consultationTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                {t.consultationSubtitle}
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    {t.fullNameLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.fullName}
                    onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                    placeholder="e.g. Alexander Smith"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-[var(--ink)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    {t.roomNumberLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.roomNumber}
                    onChange={(e) => setFormState({ ...formState, roomNumber: e.target.value })}
                    placeholder="e.g. Suite 2405"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-[var(--ink)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  {t.treatmentTypeLabel}
                </label>
                <select
                  value={formState.treatmentType}
                  onChange={(e) => setFormState({ ...formState, treatmentType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-[var(--ink)]"
                >
                  <option>In-Hotel Doctor Room Visit (Urgent / Checkup)</option>
                  <option>Dental Aesthetics &amp; Hollywood Smile</option>
                  <option>Sapphire FUE / DHI Hair Transplantation</option>
                  <option>Plastic &amp; Aesthetic Surgery Consultation</option>
                  <option>Botox, Fillers &amp; Medical Skin Rejuvenation</option>
                  <option>General Health Inquiries &amp; Prescription</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  {t.messageLabel}
                </label>
                <textarea
                  rows={3}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Please describe symptoms, questions, or your preferred time for consultation..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-[var(--ink)]"
                />
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold uppercase tracking-wider shadow-md transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.sendInquiryBtn}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*                         LIGHTBOX ZOOM MODAL                        */}
      {/* ------------------------------------------------------------------ */}
      {activeImageZoom && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveImageZoom(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full flex items-center justify-center">
            <img
              src={activeImageZoom}
              alt="Enlarged Medical Asset"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border-2 border-white/20"
              referrerPolicy="no-referrer"
            />
            <button
              onClick={() => setActiveImageZoom(null)}
              className="absolute -top-12 right-0 sm:top-4 sm:right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors"
              aria-label="Close image zoom"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </PageShell>
  );
}
