"use client"

import { Check, ChevronDown, Search, X } from "lucide-react"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { createPortal } from "react-dom"

interface Country {
  code: string
  name: string
  dialCode: string
  flag: string
}

interface PhoneInputProps {
  isPending?: boolean
  placeholder?: string
  onChangeValue: (phoneNumber: string, countryCode: string, fullNumber: string) => void
  value?: string
  countryCode?: string
  className?: string
  disabled?: boolean
  maxHeight?: number
  allowClear?: boolean
}

type DropdownPosition = "bottom" | "top" | "modal"

// Liste des pays avec leurs codes et drapeaux
const countries: Country[] = [
  { code: "AD", name: "Andorre", dialCode: "+376", flag: "🇦🇩" },
  { code: "AE", name: "Émirats arabes unis", dialCode: "+971", flag: "🇦🇪" },
  { code: "AF", name: "Afghanistan", dialCode: "+93", flag: "🇦🇫" },
  { code: "AG", name: "Antigua-et-Barbuda", dialCode: "+1268", flag: "🇦🇬" },
  { code: "AI", name: "Anguilla", dialCode: "+1264", flag: "🇦🇮" },
  { code: "AL", name: "Albanie", dialCode: "+355", flag: "🇦🇱" },
  { code: "AM", name: "Arménie", dialCode: "+374", flag: "🇦🇲" },
  { code: "AO", name: "Angola", dialCode: "+244", flag: "🇦🇴" },
  { code: "AR", name: "Argentine", dialCode: "+54", flag: "🇦🇷" },
  { code: "AS", name: "Samoa américaines", dialCode: "+1684", flag: "🇦🇸" },
  { code: "AT", name: "Autriche", dialCode: "+43", flag: "🇦🇹" },
  { code: "AU", name: "Australie", dialCode: "+61", flag: "🇦🇺" },
  { code: "AW", name: "Aruba", dialCode: "+297", flag: "🇦🇼" },
  { code: "AZ", name: "Azerbaïdjan", dialCode: "+994", flag: "🇦🇿" },
  { code: "BA", name: "Bosnie-Herzégovine", dialCode: "+387", flag: "🇧🇦" },
  { code: "BB", name: "Barbade", dialCode: "+1246", flag: "🇧🇧" },
  { code: "BD", name: "Bangladesh", dialCode: "+880", flag: "🇧🇩" },
  { code: "BE", name: "Belgique", dialCode: "+32", flag: "🇧🇪" },
  { code: "BF", name: "Burkina Faso", dialCode: "+226", flag: "🇧🇫" },
  { code: "BG", name: "Bulgarie", dialCode: "+359", flag: "🇧🇬" },
  { code: "BH", name: "Bahreïn", dialCode: "+973", flag: "🇧🇭" },
  { code: "BI", name: "Burundi", dialCode: "+257", flag: "🇧🇮" },
  { code: "BJ", name: "Bénin", dialCode: "+229", flag: "🇧🇯" },
  { code: "BM", name: "Bermudes", dialCode: "+1441", flag: "🇧🇲" },
  { code: "BN", name: "Brunei", dialCode: "+673", flag: "🇧🇳" },
  { code: "BO", name: "Bolivie", dialCode: "+591", flag: "🇧🇴" },
  { code: "BR", name: "Brésil", dialCode: "+55", flag: "🇧🇷" },
  { code: "BS", name: "Bahamas", dialCode: "+1242", flag: "🇧🇸" },
  { code: "BT", name: "Bhoutan", dialCode: "+975", flag: "🇧🇹" },
  { code: "BW", name: "Botswana", dialCode: "+267", flag: "🇧🇼" },
  { code: "BY", name: "Biélorussie", dialCode: "+375", flag: "🇧🇾" },
  { code: "BZ", name: "Belize", dialCode: "+501", flag: "🇧🇿" },
  { code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦" },
  { code: "CD", name: "République démocratique du Congo", dialCode: "+243", flag: "🇨🇩" },
  { code: "CF", name: "République centrafricaine", dialCode: "+236", flag: "🇨🇫" },
  { code: "CG", name: "République du Congo", dialCode: "+242", flag: "🇨🇬" },
  { code: "CH", name: "Suisse", dialCode: "+41", flag: "🇨🇭" },
  { code: "CI", name: "Côte d'Ivoire", dialCode: "+225", flag: "🇨🇮" },
  { code: "CK", name: "Îles Cook", dialCode: "+682", flag: "🇨🇰" },
  { code: "CL", name: "Chili", dialCode: "+56", flag: "🇨🇱" },
  { code: "CM", name: "Cameroun", dialCode: "+237", flag: "🇨🇲" },
  { code: "CN", name: "Chine", dialCode: "+86", flag: "🇨🇳" },
  { code: "CO", name: "Colombie", dialCode: "+57", flag: "🇨🇴" },
  { code: "CR", name: "Costa Rica", dialCode: "+506", flag: "🇨🇷" },
  { code: "CU", name: "Cuba", dialCode: "+53", flag: "🇨🇺" },
  { code: "CV", name: "Cap-Vert", dialCode: "+238", flag: "🇨🇻" },
  { code: "CY", name: "Chypre", dialCode: "+357", flag: "🇨🇾" },
  { code: "CZ", name: "République tchèque", dialCode: "+420", flag: "🇨🇿" },
  { code: "DE", name: "Allemagne", dialCode: "+49", flag: "🇩🇪" },
  { code: "DJ", name: "Djibouti", dialCode: "+253", flag: "🇩🇯" },
  { code: "DK", name: "Danemark", dialCode: "+45", flag: "🇩🇰" },
  { code: "DM", name: "Dominique", dialCode: "+1767", flag: "🇩🇲" },
  { code: "DO", name: "République dominicaine", dialCode: "+1809", flag: "🇩🇴" },
  { code: "DZ", name: "Algérie", dialCode: "+213", flag: "🇩🇿" },
  { code: "EC", name: "Équateur", dialCode: "+593", flag: "🇪🇨" },
  { code: "EE", name: "Estonie", dialCode: "+372", flag: "🇪🇪" },
  { code: "EG", name: "Égypte", dialCode: "+20", flag: "🇪🇬" },
  { code: "ER", name: "Érythrée", dialCode: "+291", flag: "🇪🇷" },
  { code: "ES", name: "Espagne", dialCode: "+34", flag: "🇪🇸" },
  { code: "ET", name: "Éthiopie", dialCode: "+251", flag: "🇪🇹" },
  { code: "FI", name: "Finlande", dialCode: "+358", flag: "🇫🇮" },
  { code: "FJ", name: "Fidji", dialCode: "+679", flag: "🇫🇯" },
  { code: "FK", name: "Îles Malouines", dialCode: "+500", flag: "🇫🇰" },
  { code: "FM", name: "Micronésie", dialCode: "+691", flag: "🇫🇲" },
  { code: "FO", name: "Îles Féroé", dialCode: "+298", flag: "🇫🇴" },
  { code: "FR", name: "France", dialCode: "+33", flag: "🇫🇷" },
  { code: "GA", name: "Gabon", dialCode: "+241", flag: "🇬🇦" },
  { code: "GB", name: "Royaume-Uni", dialCode: "+44", flag: "🇬🇧" },
  { code: "GD", name: "Grenade", dialCode: "+1473", flag: "🇬🇩" },
  { code: "GE", name: "Géorgie", dialCode: "+995", flag: "🇬🇪" },
  { code: "GF", name: "Guyane française", dialCode: "+594", flag: "🇬🇫" },
  { code: "GH", name: "Ghana", dialCode: "+233", flag: "🇬🇭" },
  { code: "GI", name: "Gibraltar", dialCode: "+350", flag: "🇬🇮" },
  { code: "GL", name: "Groenland", dialCode: "+299", flag: "🇬🇱" },
  { code: "GM", name: "Gambie", dialCode: "+220", flag: "🇬🇲" },
  { code: "GN", name: "Guinée", dialCode: "+224", flag: "🇬🇳" },
  { code: "GP", name: "Guadeloupe", dialCode: "+590", flag: "🇬🇵" },
  { code: "GQ", name: "Guinée équatoriale", dialCode: "+240", flag: "🇬🇶" },
  { code: "GR", name: "Grèce", dialCode: "+30", flag: "🇬🇷" },
  { code: "GT", name: "Guatemala", dialCode: "+502", flag: "🇬🇹" },
  { code: "GU", name: "Guam", dialCode: "+1671", flag: "🇬🇺" },
  { code: "GW", name: "Guinée-Bissau", dialCode: "+245", flag: "🇬🇼" },
  { code: "GY", name: "Guyana", dialCode: "+592", flag: "🇬🇾" },
  { code: "HK", name: "Hong Kong", dialCode: "+852", flag: "🇭🇰" },
  { code: "HN", name: "Honduras", dialCode: "+504", flag: "🇭🇳" },
  { code: "HR", name: "Croatie", dialCode: "+385", flag: "🇭🇷" },
  { code: "HT", name: "Haïti", dialCode: "+509", flag: "🇭🇹" },
  { code: "HU", name: "Hongrie", dialCode: "+36", flag: "🇭🇺" },
  { code: "ID", name: "Indonésie", dialCode: "+62", flag: "🇮🇩" },
  { code: "IE", name: "Irlande", dialCode: "+353", flag: "🇮🇪" },
  { code: "IL", name: "Israël", dialCode: "+972", flag: "🇮🇱" },
  { code: "IN", name: "Inde", dialCode: "+91", flag: "🇮🇳" },
  { code: "IO", name: "Territoire britannique de l'océan Indien", dialCode: "+246", flag: "🇮🇴" },
  { code: "IQ", name: "Irak", dialCode: "+964", flag: "🇮🇶" },
  { code: "IR", name: "Iran", dialCode: "+98", flag: "🇮🇷" },
  { code: "IS", name: "Islande", dialCode: "+354", flag: "🇮🇸" },
  { code: "IT", name: "Italie", dialCode: "+39", flag: "🇮🇹" },
  { code: "JM", name: "Jamaïque", dialCode: "+1876", flag: "🇯🇲" },
  { code: "JO", name: "Jordanie", dialCode: "+962", flag: "🇯🇴" },
  { code: "JP", name: "Japon", dialCode: "+81", flag: "🇯🇵" },
  { code: "KE", name: "Kenya", dialCode: "+254", flag: "🇰🇪" },
  { code: "KG", name: "Kirghizistan", dialCode: "+996", flag: "🇰🇬" },
  { code: "KH", name: "Cambodge", dialCode: "+855", flag: "🇰🇭" },
  { code: "KI", name: "Kiribati", dialCode: "+686", flag: "🇰🇮" },
  { code: "KM", name: "Comores", dialCode: "+269", flag: "🇰🇲" },
  { code: "KN", name: "Saint-Christophe-et-Niévès", dialCode: "+1869", flag: "🇰🇳" },
  { code: "KP", name: "Corée du Nord", dialCode: "+850", flag: "🇰🇵" },
  { code: "KR", name: "Corée du Sud", dialCode: "+82", flag: "🇰🇷" },
  { code: "KW", name: "Koweït", dialCode: "+965", flag: "🇰🇼" },
  { code: "KY", name: "Îles Caïmans", dialCode: "+1345", flag: "🇰🇾" },
  { code: "KZ", name: "Kazakhstan", dialCode: "+7", flag: "🇰🇿" },
  { code: "LA", name: "Laos", dialCode: "+856", flag: "🇱🇦" },
  { code: "LB", name: "Liban", dialCode: "+961", flag: "🇱🇧" },
  { code: "LC", name: "Sainte-Lucie", dialCode: "+1758", flag: "🇱🇨" },
  { code: "LI", name: "Liechtenstein", dialCode: "+423", flag: "🇱🇮" },
  { code: "LK", name: "Sri Lanka", dialCode: "+94", flag: "🇱🇰" },
  { code: "LR", name: "Liberia", dialCode: "+231", flag: "🇱🇷" },
  { code: "LS", name: "Lesotho", dialCode: "+266", flag: "🇱🇸" },
  { code: "LT", name: "Lituanie", dialCode: "+370", flag: "🇱🇹" },
  { code: "LU", name: "Luxembourg", dialCode: "+352", flag: "🇱🇺" },
  { code: "LV", name: "Lettonie", dialCode: "+371", flag: "🇱🇻" },
  { code: "LY", name: "Libye", dialCode: "+218", flag: "🇱🇾" },
  { code: "MA", name: "Maroc", dialCode: "+212", flag: "🇲🇦" },
  { code: "MC", name: "Monaco", dialCode: "+377", flag: "🇲🇨" },
  { code: "MD", name: "Moldavie", dialCode: "+373", flag: "🇲🇩" },
  { code: "ME", name: "Monténégro", dialCode: "+382", flag: "🇲🇪" },
  { code: "MG", name: "Madagascar", dialCode: "+261", flag: "🇲🇬" },
  { code: "MH", name: "Îles Marshall", dialCode: "+692", flag: "🇲🇭" },
  { code: "MK", name: "Macédoine du Nord", dialCode: "+389", flag: "🇲🇰" },
  { code: "ML", name: "Mali", dialCode: "+223", flag: "🇲🇱" },
  { code: "MM", name: "Myanmar", dialCode: "+95", flag: "🇲🇲" },
  { code: "MN", name: "Mongolie", dialCode: "+976", flag: "🇲🇳" },
  { code: "MO", name: "Macao", dialCode: "+853", flag: "🇲🇴" },
  { code: "MP", name: "Îles Mariannes du Nord", dialCode: "+1670", flag: "🇲🇵" },
  { code: "MQ", name: "Martinique", dialCode: "+596", flag: "🇲🇶" },
  { code: "MR", name: "Mauritanie", dialCode: "+222", flag: "🇲🇷" },
  { code: "MS", name: "Montserrat", dialCode: "+1664", flag: "🇲🇸" },
  { code: "MT", name: "Malte", dialCode: "+356", flag: "🇲🇹" },
  { code: "MU", name: "Maurice", dialCode: "+230", flag: "🇲🇺" },
  { code: "MV", name: "Maldives", dialCode: "+960", flag: "🇲🇻" },
  { code: "MW", name: "Malawi", dialCode: "+265", flag: "🇲🇼" },
  { code: "MX", name: "Mexique", dialCode: "+52", flag: "🇲🇽" },
  { code: "MY", name: "Malaisie", dialCode: "+60", flag: "🇲🇾" },
  { code: "MZ", name: "Mozambique", dialCode: "+258", flag: "🇲🇿" },
  { code: "NA", name: "Namibie", dialCode: "+264", flag: "🇳🇦" },
  { code: "NC", name: "Nouvelle-Calédonie", dialCode: "+687", flag: "🇳🇨" },
  { code: "NE", name: "Niger", dialCode: "+227", flag: "🇳🇪" },
  { code: "NF", name: "Île Norfolk", dialCode: "+672", flag: "🇳🇫" },
  { code: "NG", name: "Nigeria", dialCode: "+234", flag: "🇳🇬" },
  { code: "NI", name: "Nicaragua", dialCode: "+505", flag: "🇳🇮" },
  { code: "NL", name: "Pays-Bas", dialCode: "+31", flag: "🇳🇱" },
  { code: "NO", name: "Norvège", dialCode: "+47", flag: "🇳🇴" },
  { code: "NP", name: "Népal", dialCode: "+977", flag: "🇳🇵" },
  { code: "NR", name: "Nauru", dialCode: "+674", flag: "🇳🇷" },
  { code: "NU", name: "Niue", dialCode: "+683", flag: "🇳🇺" },
  { code: "NZ", name: "Nouvelle-Zélande", dialCode: "+64", flag: "🇳🇿" },
  { code: "OM", name: "Oman", dialCode: "+968", flag: "🇴🇲" },
  { code: "PA", name: "Panama", dialCode: "+507", flag: "🇵🇦" },
  { code: "PE", name: "Pérou", dialCode: "+51", flag: "🇵🇪" },
  { code: "PF", name: "Polynésie française", dialCode: "+689", flag: "🇵🇫" },
  { code: "PG", name: "Papouasie-Nouvelle-Guinée", dialCode: "+675", flag: "🇵🇬" },
  { code: "PH", name: "Philippines", dialCode: "+63", flag: "🇵🇭" },
  { code: "PK", name: "Pakistan", dialCode: "+92", flag: "🇵🇰" },
  { code: "PL", name: "Pologne", dialCode: "+48", flag: "🇵🇱" },
  { code: "PM", name: "Saint-Pierre-et-Miquelon", dialCode: "+508", flag: "🇵🇲" },
  { code: "PR", name: "Porto Rico", dialCode: "+1787", flag: "🇵🇷" },
  { code: "PS", name: "Palestine", dialCode: "+970", flag: "🇵🇸" },
  { code: "PT", name: "Portugal", dialCode: "+351", flag: "🇵🇹" },
  { code: "PW", name: "Palaos", dialCode: "+680", flag: "🇵🇼" },
  { code: "PY", name: "Paraguay", dialCode: "+595", flag: "🇵🇾" },
  { code: "QA", name: "Qatar", dialCode: "+974", flag: "🇶🇦" },
  { code: "RE", name: "La Réunion", dialCode: "+262", flag: "🇷🇪" },
  { code: "RO", name: "Roumanie", dialCode: "+40", flag: "🇷🇴" },
  { code: "RS", name: "Serbie", dialCode: "+381", flag: "🇷🇸" },
  { code: "RU", name: "Russie", dialCode: "+7", flag: "🇷🇺" },
  { code: "RW", name: "Rwanda", dialCode: "+250", flag: "🇷🇼" },
  { code: "SA", name: "Arabie saoudite", dialCode: "+966", flag: "🇸🇦" },
  { code: "SB", name: "Îles Salomon", dialCode: "+677", flag: "🇸🇧" },
  { code: "SC", name: "Seychelles", dialCode: "+248", flag: "🇸🇨" },
  { code: "SD", name: "Soudan", dialCode: "+249", flag: "🇸🇩" },
  { code: "SE", name: "Suède", dialCode: "+46", flag: "🇸🇪" },
  { code: "SG", name: "Singapour", dialCode: "+65", flag: "🇸🇬" },
  { code: "SH", name: "Sainte-Hélène", dialCode: "+290", flag: "🇸🇭" },
  { code: "SI", name: "Slovénie", dialCode: "+386", flag: "🇸🇮" },
  { code: "SK", name: "Slovaquie", dialCode: "+421", flag: "🇸🇰" },
  { code: "SL", name: "Sierra Leone", dialCode: "+232", flag: "🇸🇱" },
  { code: "SM", name: "Saint-Marin", dialCode: "+378", flag: "🇸🇲" },
  { code: "SN", name: "Sénégal", dialCode: "+221", flag: "🇸🇳" },
  { code: "SO", name: "Somalie", dialCode: "+252", flag: "🇸🇴" },
  { code: "SR", name: "Suriname", dialCode: "+597", flag: "🇸🇷" },
  { code: "ST", name: "Sao Tomé-et-Principe", dialCode: "+239", flag: "🇸🇹" },
  { code: "SV", name: "El Salvador", dialCode: "+503", flag: "🇸🇻" },
  { code: "SY", name: "Syrie", dialCode: "+963", flag: "🇸🇾" },
  { code: "SZ", name: "Eswatini", dialCode: "+268", flag: "🇸🇿" },
  { code: "TC", name: "Îles Turques-et-Caïques", dialCode: "+1649", flag: "🇹🇨" },
  { code: "TD", name: "Tchad", dialCode: "+235", flag: "🇹🇩" },
  { code: "TG", name: "Togo", dialCode: "+228", flag: "🇹🇬" },
  { code: "TH", name: "Thaïlande", dialCode: "+66", flag: "🇹🇭" },
  { code: "TJ", name: "Tadjikistan", dialCode: "+992", flag: "🇹🇯" },
  { code: "TK", name: "Tokelau", dialCode: "+690", flag: "🇹🇰" },
  { code: "TL", name: "Timor oriental", dialCode: "+670", flag: "🇹🇱" },
  { code: "TM", name: "Turkménistan", dialCode: "+993", flag: "🇹🇲" },
  { code: "TN", name: "Tunisie", dialCode: "+216", flag: "🇹🇳" },
  { code: "TO", name: "Tonga", dialCode: "+676", flag: "🇹🇴" },
  { code: "TR", name: "Turquie", dialCode: "+90", flag: "🇹🇷" },
  { code: "TT", name: "Trinité-et-Tobago", dialCode: "+1868", flag: "🇹🇹" },
  { code: "TV", name: "Tuvalu", dialCode: "+688", flag: "🇹🇻" },
  { code: "TW", name: "Taïwan", dialCode: "+886", flag: "🇹🇼" },
  { code: "TZ", name: "Tanzanie", dialCode: "+255", flag: "🇹🇿" },
  { code: "UA", name: "Ukraine", dialCode: "+380", flag: "🇺🇦" },
  { code: "UG", name: "Ouganda", dialCode: "+256", flag: "🇺🇬" },
  { code: "US", name: "États-Unis", dialCode: "+1", flag: "🇺🇸" },
  { code: "UY", name: "Uruguay", dialCode: "+598", flag: "🇺🇾" },
  { code: "UZ", name: "Ouzbékistan", dialCode: "+998", flag: "🇺🇿" },
  { code: "VA", name: "Vatican", dialCode: "+39", flag: "🇻🇦" },
  { code: "VC", name: "Saint-Vincent-et-les-Grenadines", dialCode: "+1784", flag: "🇻🇨" },
  { code: "VE", name: "Venezuela", dialCode: "+58", flag: "🇻🇪" },
  { code: "VG", name: "Îles Vierges britanniques", dialCode: "+1284", flag: "🇻🇬" },
  { code: "VI", name: "Îles Vierges américaines", dialCode: "+1340", flag: "🇻🇮" },
  { code: "VN", name: "Vietnam", dialCode: "+84", flag: "🇻🇳" },
  { code: "VU", name: "Vanuatu", dialCode: "+678", flag: "🇻🇺" },
  { code: "WF", name: "Wallis-et-Futuna", dialCode: "+681", flag: "🇼🇫" },
  { code: "WS", name: "Samoa", dialCode: "+685", flag: "🇼🇸" },
  { code: "YE", name: "Yémen", dialCode: "+967", flag: "🇾🇪" },
  { code: "YT", name: "Mayotte", dialCode: "+262", flag: "🇾🇹" },
  { code: "ZA", name: "Afrique du Sud", dialCode: "+27", flag: "🇿🇦" },
  { code: "ZM", name: "Zambie", dialCode: "+260", flag: "🇿🇲" },
  { code: "ZW", name: "Zimbabwe", dialCode: "+263", flag: "🇿🇼" },
]

// Fonction pour parser un numéro de téléphone complet et extraire le code pays
const parsePhoneNumber = (fullNumber: string): { country: Country | null; phoneNumber: string } => {
  if (!fullNumber || !fullNumber.startsWith("+")) {
    return { country: null, phoneNumber: fullNumber }
  }

  // Trier les pays par longueur de dialCode décroissante pour éviter les conflits
  const sortedCountries = [...countries].sort((a, b) => b.dialCode.length - a.dialCode.length)

  for (const country of sortedCountries) {
    if (fullNumber.startsWith(country.dialCode)) {
      const phoneNumber = fullNumber.slice(country.dialCode.length)
      return { country, phoneNumber }
    }
  }

  return { country: null, phoneNumber: fullNumber }
}

// Fonction pour valider le format E.164
const isValidE164 = (phoneNumber: string): boolean => {
  // Format E.164: +[1-3 digits country code][up to 15 digits total]
  const e164Regex = /^\+[1-9]\d{1,14}$/
  return e164Regex.test(phoneNumber)
}

// Fonction pour formater en E.164
const formatToE164 = (dialCode: string, phoneNumber: string): string => {
  if (!phoneNumber) return ""
  // Nettoyer le numéro (garder seulement les chiffres)
  const cleanNumber = phoneNumber.replace(/\D/g, "")
  if (!cleanNumber) return ""

  const fullNumber = `${dialCode}${cleanNumber}`
  // Vérifier que le numéro total ne dépasse pas 15 chiffres (sans le +)
  if (fullNumber.slice(1).length > 15) {
    return ""
  }

  return fullNumber
}

// Fonction pour filtrer seulement les chiffres
const filterNumericInput = (value: string): string => {
  return value.replace(/\D/g, "")
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value = "",
  countryCode = "CD",
  placeholder = "Numéro de téléphone",
  onChangeValue,
  className,
  disabled = false,
  isPending = false,
  maxHeight = 280,
  allowClear = true,
}) => {
  // Fonction pour initialiser les états à partir de la valeur
  const initializeFromValue = useCallback(
    (val: string, code?: string) => {
      if (val && val.startsWith("+")) {
        // Si la valeur commence par +, on essaie de parser le numéro complet
        const parsed = parsePhoneNumber(val)
        if (parsed.country) {
          return {
            country: parsed.country,
            phoneNumber: parsed.phoneNumber,
          }
        }
      }
      // Sinon, on utilise le code pays fourni ou le défaut
      const country = countries.find((c) => c.code === (code || countryCode)) || countries.find((c) => c.code === "CD")!
      return {
        country,
        phoneNumber: val.startsWith("+") ? "" : filterNumericInput(val), // Filtrer les caractères non numériques
      }
    },
    [countryCode],
  )

  // États initialisés une seule fois
  const [initialized, setInitialized] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<Country>(() => {
    const init = initializeFromValue(value, countryCode)
    return init.country
  })
  const [phoneNumber, setPhoneNumber] = useState(() => {
    const init = initializeFromValue(value, countryCode)
    return init.phoneNumber
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)
  const [dropdownPosition, setDropdownPosition] = useState<DropdownPosition>("bottom")
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({})

  const wrapperRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const phoneInputRef = useRef<HTMLInputElement>(null)

  // Calculate dropdown position
  const calculateDropdownPosition = useCallback(() => {
    if (!wrapperRef.current) return

    const rect = wrapperRef.current.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const spaceBelow = viewportHeight - rect.bottom
    const spaceAbove = rect.top
    const dropdownHeight = maxHeight + 60

    if (spaceBelow >= dropdownHeight) {
      setDropdownPosition("bottom")
      setDropdownStyle({
        top: "100%",
        left: 0,
        right: 0,
        maxHeight: `${Math.min(maxHeight, spaceBelow - 20)}px`,
      })
    } else if (spaceAbove >= dropdownHeight) {
      setDropdownPosition("top")
      setDropdownStyle({
        bottom: "100%",
        left: 0,
        right: 0,
        maxHeight: `${Math.min(maxHeight, spaceAbove - 20)}px`,
      })
    } else {
      setDropdownPosition("modal")
      setDropdownStyle({
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: Math.min(400, window.innerWidth - 40),
        maxHeight: `${Math.min(maxHeight, viewportHeight - 100)}px`,
        zIndex: 9999,
      })
    }
  }, [maxHeight])

  // Effet pour gérer les changements de props (corrigé)
  useEffect(() => {
    // Éviter les mises à jour infinies en utilisant une référence d'initialisation
    if (!initialized) {
      setInitialized(true)
      return
    }

    const init = initializeFromValue(value, countryCode)

    // Mettre à jour seulement si les valeurs ont réellement changé
    if (init.country.code !== selectedCountry.code) {
      setSelectedCountry(init.country)
    }

    if (init.phoneNumber !== phoneNumber) {
      setPhoneNumber(init.phoneNumber)
    }
  }, [value, countryCode]) // Supprimer les dépendances circulaires

  // Filter countries based on search
  const filteredCountries = React.useMemo(
    () =>
      countries.filter(
        (country) =>
          country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          country.dialCode.includes(searchTerm) ||
          country.code.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [searchTerm],
  )

  // Reset search and highlighted index when search changes
  useEffect(() => {
    setHighlightedIndex(-1)
  }, [searchTerm])

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        if (dropdownPosition === "modal") {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false)
            setSearchTerm("")
            setHighlightedIndex(-1)
          }
        } else {
          setIsOpen(false)
          setSearchTerm("")
          setHighlightedIndex(-1)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [dropdownPosition])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setHighlightedIndex((prev) => (prev < filteredCountries.length - 1 ? prev + 1 : prev))
          break
        case "ArrowUp":
          e.preventDefault()
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev))
          break
        case "Enter":
          e.preventDefault()
          if (highlightedIndex >= 0 && filteredCountries[highlightedIndex]) {
            selectCountry(filteredCountries[highlightedIndex])
          }
          break
        case "Escape":
          e.preventDefault()
          setIsOpen(false)
          setSearchTerm("")
          setHighlightedIndex(-1)
          break
      }
    }

    if (isOpen) document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, highlightedIndex, filteredCountries])

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Calculate position when dropdown opens
  useEffect(() => {
    if (isOpen) {
      calculateDropdownPosition()
      const handleResize = () => calculateDropdownPosition()
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [isOpen, calculateDropdownPosition])

  const toggleDropdown = () => {
    if (disabled || isPending) return
    setIsOpen(!isOpen)
    setHighlightedIndex(-1)
    setSearchTerm("")
  }

  const selectCountry = (country: Country) => {
    setSelectedCountry(country)
    setIsOpen(false)
    setSearchTerm("")
    setHighlightedIndex(-1)
    // Focus phone input after selecting country
    setTimeout(() => phoneInputRef.current?.focus(), 100)

    // Construire le numéro complet avec le nouveau pays (format E.164)
    const fullNumber = formatToE164(country.dialCode, phoneNumber)
    onChangeValue(phoneNumber, country.code, fullNumber)
  }

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    // Filtrer pour garder seulement les chiffres
    const numericValue = filterNumericInput(rawValue)

    // Vérifier la longueur maximale (15 chiffres total - longueur du code pays)
    const maxLocalLength = 15 - selectedCountry.dialCode.slice(1).length
    const truncatedValue = numericValue.slice(0, maxLocalLength)

    setPhoneNumber(truncatedValue)

    // Construire le numéro complet au format E.164
    const fullNumber = formatToE164(selectedCountry.dialCode, truncatedValue)
    onChangeValue(truncatedValue, selectedCountry.code, fullNumber)
  }

  // Gérer les touches pour empêcher la saisie de caractères non numériques
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Autoriser les touches de navigation et de contrôle
    const allowedKeys = [
      "Backspace",
      "Delete",
      "Tab",
      "Escape",
      "Enter",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "End",
      "PageUp",
      "PageDown",
    ]

    // Autoriser Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+Z
    if (e.ctrlKey || e.metaKey) {
      return
    }

    // Autoriser les chiffres 0-9
    if (e.key >= "0" && e.key <= "9") {
      return
    }

    // Bloquer tout le reste si ce n'est pas une touche autorisée
    if (!allowedKeys.includes(e.key)) {
      e.preventDefault()
    }
  }

  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (disabled || isPending) return
    setPhoneNumber("")
    onChangeValue("", selectedCountry.code, "")
  }

  // Calculer si le numéro actuel est valide en E.164
  const currentFullNumber = formatToE164(selectedCountry.dialCode, phoneNumber)
  const isValidNumber = currentFullNumber ? isValidE164(currentFullNumber) : false

  const renderDropdownContent = () => (
    <div className="flex flex-col h-full">
      {/* Header with close button for modal */}
      {dropdownPosition === "modal" && (
        <div className="flex items-center justify-between p-3 border-b">
          <h3 className="font-medium text-sm">Sélectionner un pays</h3>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setIsOpen(false)}>
            <X size={14} />
          </Button>
        </div>
      )}

      {/* Search */}
      <div className="p-3 border-b">
        <div className="relative">
          <Search size={16} className="absolute left-2.5 top-2.5 text-muted-foreground" />
          <Input
            ref={searchInputRef}
            className="pl-8 h-8"
            placeholder="Rechercher un pays..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>

      {/* Countries list */}
      <div
        className="overflow-y-auto flex-1"
        style={{
          maxHeight: `${Math.max(120, Math.min(200, maxHeight - 100))}px`,
        }}
      >
        {filteredCountries.length > 0 ? (
          <div className="p-1">
            {filteredCountries.map((country, index) => (
              <div
                key={country.code}
                className={cn(
                  "px-3 py-2 cursor-pointer flex items-center gap-3 rounded-sm",
                  "transition-colors text-sm hover:bg-muted/50",
                  highlightedIndex === index && "bg-muted",
                  selectedCountry.code === country.code && "bg-muted/70",
                )}
                onClick={() => selectCountry(country)}
                onMouseEnter={() => setHighlightedIndex(index)}
                role="option"
                aria-selected={selectedCountry.code === country.code}
              >
                <span className="text-lg flex-shrink-0">{country.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{country.name}</div>
                  <div className="text-xs text-muted-foreground">{country.dialCode}</div>
                </div>
                {selectedCountry.code === country.code && <Check size={16} className="text-primary flex-shrink-0" />}
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-center text-muted-foreground text-sm">
            Aucun pays trouvé
          </div>
        )}
      </div>

      {/* Footer info */}
      {filteredCountries.length > 0 && (
        <div className="flex-shrink-0 p-2 border-t bg-muted/10 text-xs text-muted-foreground text-center">
          {filteredCountries.length} pays disponible{filteredCountries.length > 1 ? "s" : ""}
        </div>
      )}
    </div>
  )

  if (isPending) {
    return <Skeleton className="h-10 w-full rounded-md" />
  }

  const dropdown = (
    <div
      ref={dropdownRef}
      className={cn(
        "bg-popover border rounded-md shadow-lg transition-all duration-200",
        dropdownPosition === "modal" ? "fixed" : "absolute z-50",
        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none",
        dropdownPosition === "top" && "origin-bottom",
        dropdownPosition === "bottom" && "origin-top",
        dropdownPosition === "modal" && "origin-center",
      )}
      style={dropdownStyle}
    >
      {isOpen && !disabled && !isPending && renderDropdownContent()}
    </div>
  )

  return (
    <div className={cn("space-y-2", className)}>
      <div className="relative w-full" ref={wrapperRef}>
        <div
          className={cn(
            "flex h-10 w-full items-center rounded-md border border-input bg-background",
            "ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
            "transition-colors hover:border-muted-foreground/50",
            isOpen && "ring-2 ring-ring ring-offset-2",
            (disabled || isPending) && "cursor-not-allowed opacity-50",
            // Indicateur visuel pour numéro invalide
            phoneNumber && !isValidNumber && "border-destructive/50",
          )}
        >
          {/* Country selector */}
          <div
            className={cn(
              "flex items-center gap-2 px-3 py-2 border-r cursor-pointer hover:bg-muted/50 transition-colors",
              !disabled && !isPending && "cursor-pointer",
              (disabled || isPending) && "cursor-not-allowed",
            )}
            onClick={toggleDropdown}
            tabIndex={disabled || isPending ? -1 : 0}
            onKeyDown={(e) => {
              if ((e.key === "Enter" || e.key === " ") && !disabled && !isPending) {
                e.preventDefault()
                toggleDropdown()
              }
            }}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
          >
            <span className="text-lg flex-shrink-0">{selectedCountry.flag}</span>
            <span className="text-sm font-medium text-muted-foreground">{selectedCountry.dialCode}</span>
            <ChevronDown
              size={14}
              className={cn("text-muted-foreground transition-transform duration-200", isOpen && "rotate-180")}
            />
          </div>

          {/* Phone number input */}
          <div className="flex-1 flex items-center">
            <Input
              ref={phoneInputRef}
              type="tel"
              inputMode="numeric"
              className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 h-auto px-3"
              placeholder={placeholder}
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              onKeyDown={handleKeyDown}
              disabled={disabled || isPending}
              maxLength={15} // Limite de sécurité
            />
            {phoneNumber && allowClear && !disabled && !isPending && (
              <X
                size={16}
                className="cursor-pointer text-muted-foreground hover:text-destructive transition-colors mr-3 flex-shrink-0"
                onClick={clearAll}
                aria-label="Effacer le numéro"
              />
            )}
          </div>
        </div>

        {/* Render dropdown */}
        {dropdownPosition === "modal" && typeof window !== "undefined"
          ? createPortal(
              <>
                {isOpen && <div className="fixed inset-0 bg-black/20 z-[9998]" onClick={() => setIsOpen(false)} />}
                {dropdown}
              </>,
              document.body,
            )
          : dropdown}
      </div>
    </div>
  )
}
