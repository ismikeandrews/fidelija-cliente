import React from 'react';

import { LButton } from '../../../../components';
import { 
    InfoContainer, 
    InfoWrapper, 
    InfoRow, 
    Column1, 
    Column2, 
    TopLine, 
    Heading, 
    Subtitle, 
    BtnWrap, 
    ImgWrap, 
    Img, 
    TextWrapper 
} from './InfoElements';

const InfoSection = ({lightBg, id, imgStart, topLine, lightText, headline, darkText, description, buttonLabel, img, alt, url, primary, topLinePrimary, buttonLarge}) => {
    return (
        <InfoContainer lightBg={lightBg} id={id}>
            <InfoWrapper>
                <InfoRow imgStart={imgStart}>
                    <Column1>
                        <TextWrapper>
                            <TopLine primary={topLinePrimary}>{topLine}</TopLine>
                            <Heading lightText={lightText}>{headline}</Heading>
                            <Subtitle darkText={darkText}>{description}</Subtitle>
                            <BtnWrap>
                                <LButton redirectTo={url} primary={primary} large={buttonLarge}>{buttonLabel}</LButton>
                            </BtnWrap>
                        </TextWrapper>
                    </Column1>
                    <Column2>
                        <ImgWrap>
                            <Img src={img} alt={alt}/>
                        </ImgWrap>
                    </Column2>
                </InfoRow>
            </InfoWrapper>
        </InfoContainer>
    );
};

export default InfoSection;
