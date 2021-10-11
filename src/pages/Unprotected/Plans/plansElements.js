import styled from 'styled-components';

import { colorSchema } from '../../../components';

export const PlansSection = styled.section`
    padding: 100px 0;
    position: relative;

    &::after{
        content: '';
        width: 100%;
        height: 100%;
        background: linear-gradient(to right, ${colorSchema.dprimary}, ${colorSchema.lprimary} 100%);
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0.85;
        z-index: -1;
    };
`;

export const PlansContainer = styled.div`
    width: 100%;
    max-width: 1400px;
    min-width: 320px;
    margin: 0 auto;
    padding: 0 15px;
`;

export const PlansIntro = styled.div`
    padding-bottom: 80px;
`;

export const PlansH1 = styled.h1`
    color: ${colorSchema.white};
    font-size: 36px;
    font-weight: 400;
    text-align: center;
`;

export const PlansStyle = styled.div`
    width: 130px;
    height: 12px;
    margin: 20px auto 0;
    position: relative;

    &::before{
        content: '';
        width: 80px;
        height: 1px;
        background: ${colorSchema.white};
        position: absolute;
        top: 0;
        left: 0;
    };

    &::after{
        content: '';
        width: 80px;
        height: 1px;
        background: ${colorSchema.white};
        position: absolute;
        right: 0;
        bottom: 0;
    };
`;

export const PlansTableWrapper = styled.div`
    position: relative;
    padding-top: 300px;

    @media screen and (max-width: 1200px){
        padding-top: 0px;
    };
`;

export const PlansCards = styled.div`
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;

    @media screen and (max-width: 1200px){
        position: static;
    };
`;

export const PlansRow = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;

export const PlanCard = styled.div`
    width: 360px;
    margin: 20px;
    background: ${colorSchema.white};
    text-align: center;
    border-radius: 5px;
    box-shadow: 0 2px 2px rgba(40, 25, 114, 0.1);
    transition: all 0.3s;

    &:hover{
        box-shadow: 0 20px 25px 5px rgba(33, 20, 106, 0.1);
    };
`;

export const PlanCardHeader = styled.div`
    padding: 40px 10px;
    border-bottom: 1px solid ${colorSchema.white};
`;

export const PlanH4 = styled.h4`
    margin-bottom: 5px;
    color: ${colorSchema.black};
    font-size: 27px;
    font-weight: 900;

    ${PlanCard}:hover & {
        color: ${colorSchema.lsecondary};
    };
`;

export const PlanP = styled.p`
    margin-bottom: 27px;
    color: #4e4e4e;
    font-size: 14px;

    ${PlanCard}:hover & {
        color: ${colorSchema.lsecondary};
    };
`;

export const PlanPrice = styled.h2`
    font-size: 60px;

    ${PlanCard}:hover & {
        color: ${colorSchema.lsecondary};
    };
`;

export const DollarSign = styled.span`
    margin-right: 3px;
    font-size: 30px;
    position: relative;
    bottom: 14px;
    vertical-align: middle;
`;

export const PlanCardList = styled.ul`
    padding: 30px 8px;
    list-style: none;
    border-bottom: 1px solid ${colorSchema.white};
`;

export const PlanCardListItem = styled.li`
    margin-bottom: 12px;
    color: #4e4e4e;
    font-weight: 300;
    font-size: 16px;
    line-height: 1.8;
`;

export const PlanCardFooter = styled.div`
    padding: 45px;
`;

export const Divider = styled.div`
    padding: 200px;
    @media screen and (max-width: 1200px){
        display: none;
    };
`;