import Shopping from '../../../../assets/images/svg/shopping.svg';
import Profile from '../../../../assets/images/svg/profile.svg';
import Cashback from '../../../../assets/images/svg/cashback.svg';
import Team from '../../../../assets/images/svg/team.svg';

export const homeObjOne = {
    id: 'about',
    lightBg: true,
    lightText: false,
    lightTextDesc: false,
    darkText: true,
    topLine: 'Sobre nós',
    headline: 'Descubra quem somos.',
    description: 'Olá somos a Fidelijá uma planta forma feita para seus clientes. Ajudamos diversos lojistas a fidelizar sua clientela com os benéficios e vantagens que oferecemos.',
    buttonLabel: 'Saiba mais',
    buttonLarge: 0,
    url: '/about',
    imgStart: false,
    img: Team,
    alt: 'shopping',
    topLinePrimary: false,
    primary: 0,
    dartText: false
};

export const homeObjTwo = {
    id: 'discover',
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    darkText: false,
    topLine: 'Como funciona?',
    headline: 'Confira as diversas possibilidades.',
    description: 'Clique em Saiba mais e descubra como funciona as vantagens da Fidelijá.',
    buttonLabel: 'Saiba mais',
    buttonLarge: 0,
    url: '/plans',
    imgStart: true,
    img: Profile,
    alt: 'profile',
    topLinePrimary: true,
    primary: 1,
    dartText: false
};

export const homeObjThree = {
    id: 'register',
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    darkText: false,
    topLine: 'Cadastre-se',
    headline: 'Novo por aqui?',
    description: 'Quer começar a aproveitar as vantagens da Fidelijá? Cadastre-se agora mesmo de forma gratuita e fidelize seus clientes.',
    buttonLabel: 'Começar',
    buttonLarge: 0,
    url: '/plans',
    imgStart: false,
    img: Cashback,
    alt: 'cashback',
    topLinePrimary: true,
    primary: 1,
    dartText: false
};


export const homeObjFour = {
    id: 'subscription',
    lightBg: true,
    lightText: false,
    lightTextDesc: false,
    darkText: true,
    topLine: 'Nossos planos',
    headline: 'Confira os beneficios disponíveis',
    description: 'Aqui você pode encontrar todos as vantagens que vc precisa.',
    buttonLabel: 'Conferir',
    buttonLarge: 0,
    url: '/plans',
    imgStart: true,
    img: Cashback,
    alt: 'cashback',
    topLinePrimary: false,
    primary: 0,
    dartText: false
};
