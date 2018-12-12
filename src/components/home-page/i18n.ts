export enum DateFormat {
  'MM/YY',
  'MM/YYYY',
  'YY/MM',
  'YYYY/MM'
};

export enum MonthFormat {
  SHORT = 'short',
  LONG = 'long'
}

export interface II18n {
  monthFormat: MonthFormat,
  dateFormat: object,
  monthNames: object
};

export const DATE_FORMAT = {
  'default': 'MM/YYYY',
  'ja': 'YY/MM'
};

const ENGLISH_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const BRAZILIAN_MONTHS = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
];

export const MONTH_NAMES = {
  default: BRAZILIAN_MONTHS,
  en: ENGLISH_MONTHS,
  ja: [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12'
  ],
  es: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ],
  fr: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Aout',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
  ],
  ru: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ],
  ua: [
    'Січень',
    'Лютий',
    'Березень',
    'Квітень',
    'Травень',
    'Червень',
    'Липень',
    'Серпень',
    'Вересень',
    'Жовтень',
    'Листопад',
    'Грудень'
  ],
  hu: [
    'Január',
    'Február',
    'Március',
    'Aprilis',
    'Május',
    'Junius',
    'Julius',
    'Augusztus',
    'Szeptember',
    'Október',
    'November',
    'December'
  ]
};

export const DEFAULT_I18N = {
  monthFormat: MonthFormat.LONG,
  dateFormat: DATE_FORMAT,
  monthNames: MONTH_NAMES
};