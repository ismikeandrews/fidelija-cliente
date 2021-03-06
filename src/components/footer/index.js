import React from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import InstagramIcon from '@material-ui/icons/Instagram';

import { 
    FooterContainer, 
    FooterWrap, 
    FooterLinksContainer, 
    FooterLinksWrapper, 
    FooterLinkItems, 
    FooterLinkTitle, 
    FooterLink, 
    SocialMedia, 
    SocialMediaWrap, 
    SocialLogo, 
    WebsiteRights, 
    SocialIcons, 
    SocialIconLink,
    LogoImg
} from './footerElements';

import Logo from '../../assets/images/img/fidelija-logo.png';

const Footer = () => {
    return (
        <FooterContainer>
            <FooterWrap>
                <FooterLinksContainer>
                    <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle>Sobre</FooterLinkTitle>
                            <FooterLink to='/login'>Como funciona</FooterLink>
                            <FooterLink to='/login'>Depoimentos</FooterLink>
                            <FooterLink to='/login'>Carreira</FooterLink>
                            <FooterLink to='/login'>Investidores</FooterLink>
                            <FooterLink to='/login'>Termos de uso</FooterLink>
                        </FooterLinkItems>
                        <FooterLinkItems>
                            <FooterLinkTitle>Sobre</FooterLinkTitle>
                            <FooterLink to='/login'>Como funciona</FooterLink>
                            <FooterLink to='/login'>Depoimentos</FooterLink>
                            <FooterLink to='/login'>Carreira</FooterLink>
                            <FooterLink to='/login'>Investidores</FooterLink>
                            <FooterLink to='/login'>Termos de uso</FooterLink>
                        </FooterLinkItems>
                    </FooterLinksWrapper>
                    <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle>Sobre</FooterLinkTitle>
                            <FooterLink to='/login'>Como funciona</FooterLink>
                            <FooterLink to='/login'>Depoimentos</FooterLink>
                            <FooterLink to='/login'>Carreira</FooterLink>
                            <FooterLink to='/login'>Investidores</FooterLink>
                            <FooterLink to='/login'>Termos de uso</FooterLink>
                        </FooterLinkItems>
                        <FooterLinkItems>
                            <FooterLinkTitle>Sobre</FooterLinkTitle>
                            <FooterLink to='/login'>Como funciona</FooterLink>
                            <FooterLink to='/login'>Depoimentos</FooterLink>
                            <FooterLink to='/login'>Carreira</FooterLink>
                            <FooterLink to='/login'>Investidores</FooterLink>
                            <FooterLink to='/login'>Termos de uso</FooterLink>
                        </FooterLinkItems>
                    </FooterLinksWrapper>
                </FooterLinksContainer>
                <SocialMedia>
                    <SocialMediaWrap>
                        <SocialLogo to="/"><LogoImg src={Logo}/></SocialLogo>
                        <WebsiteRights>Fidelij?? ?? {new Date().getFullYear()} All Rights Reserved</WebsiteRights>
                        <SocialIcons>
                            <SocialIconLink href="" target="_blank" aria-label="Facebook">
                                <FacebookIcon/>
                            </SocialIconLink>
                            <SocialIconLink href="" target="_blank" aria-label="Twitter">
                                <TwitterIcon/>
                            </SocialIconLink>
                            <SocialIconLink href="" target="_blank" aria-label="YouTube">
                                <YouTubeIcon/>
                            </SocialIconLink>
                            <SocialIconLink href="" target="_blank" aria-label="Instagram">
                                <InstagramIcon/>
                            </SocialIconLink>
                        </SocialIcons>
                    </SocialMediaWrap>
                </SocialMedia>
            </FooterWrap>
        </FooterContainer>
    );
};

export default Footer;
