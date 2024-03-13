import { theme } from '@/app/styles/theme';
import { styled } from '@linaria/react';
import Link from 'next/link';
import { lighten } from 'polished';

export const ChangeLink = styled(Link)`
  color: ${theme.COLORS.WARNING};
  font-size: 1.063rem;
`;

export const Container = styled.div`
  > label {
    color: ${theme.COLORS.DARK};
    font-size: 0.75rem;
  }

  & > div {
    overflow: auto;
    height: 90%;
    padding-bottom: 170px;
  }

  & > footer {
    padding: 0px 1rem;
    position: fixed;
    width: 100%;
    max-width: 1200px;
    height: 8rem;
    bottom: 70px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
  }
`;

export const DeliveryData = styled.div`
  margin-top: 25px;
  height: 100%;

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    & > label {
      font-size: 1.063rem;
    }
  }

  & > section {
    font-size: 1.063rem;
    width: 100%;
    background-color: ${theme.COLORS.WHITE};
    border-radius: 20px;
    padding: 25px;
    margin-top: 15px;

    & > div {
      color: ${theme.COLORS.DARK};
      font-weight: lighter;
      border-style: solid;
      border-color: ${() => lighten(0.25, theme.COLORS.GRAY)};
      border-width: 1px;
      border-right: none;
      border-left: none;
      padding: 15px 0px;
    }

    & > p {
      font-weight: 500;
    }

    > p:nth-of-type(1) {
      margin-bottom: 15px;
    }

    > p:nth-of-type(2) {
      margin-top: 15px;
    }
  }
`;

export const DeliveryMethod = styled.div`
  margin-top: 40px;

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    & > label {
      font-size: 1.063rem;
    }
  }

  & > section {
    margin-top: 15px;
    font-size: 1.063rem;
    width: 100%;
    background-color: ${theme.COLORS.WHITE};
    padding: 25px;
    border-radius: 20px;

    > div:nth-of-type(1) {
      padding-bottom: 15px;
      border-color: ${() => lighten(0.25, theme.COLORS.GRAY)};
      border-style: solid;
      border-width: 1px;
      border-right: none;
      border-left: none;
      border-top: none;
    }

    > div:nth-of-type(2) {
      margin-top: 15px;
    }
  }
`;

export const Total = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
  align-items: flex-end;

  & > div {
    > caption {
      font-size: 0.75rem;
      font-weight: lighter;
      color: ${theme.COLORS.PRIMARY};
    }
    > span {
      color: ${theme.COLORS.DARK};
      font-size: 1.375rem;
    }

    display: flex;
    flex-direction: column;

    align-items: end;
    align-items: flex-end;
  }

  margin-bottom: 30px;
`;

export const Payment = styled.div`
  margin-top: 5rem;

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const ToogleSwitchContainer = styled.div`
  padding: 40px;
`;