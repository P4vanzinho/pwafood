import { theme } from '@/app/styles/theme';
import { styled } from '@linaria/react';
import { lighten } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  > span {
    color: ${theme.COLORS.PRIMARY};
    font-size: 0.875rem;
  }

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  button {
    &:nth-of-type(2) {
      margin-left: 10px;
    }

    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    padding: 0;
    width: 50%;
    height: 100%;
    background-color: transparent;

    &:active {
      border-style: none;
    }

    &:focus {
      color: #333;
      text-decoration: none;
    }

    &:hover {
      background-color: ${() => lighten(0.2, theme.COLORS.GRAY)};
    }

    > svg {
      fill: ${theme.COLORS.PRIMARY};
      size: 200rem;
    }

    &:disabled {
      background-color: ${theme.COLORS.LIGHT};
      cursor: not-allowed;

      > svg {
        fill: ${() => lighten(0.25, theme.COLORS.GRAY)};
      }
    }
  }
`;

export const Input = styled.div`
  display: flex;
  height: 2.5rem;
  border-radius: 20px;
  width: 10rem;
  background-color: ${theme.COLORS.LIGHT};
  overflow: hidden;

  > div {
    display: flex;
    padding: 0px 10px 0px 0px;
    width: 100%;
    justify-content: space-around;
    height: 100%;
    margin-right: -10px;
  }

  > input {
    display: flex;
    color: ${theme.COLORS.DARK};
    background-color: transparent;
    font-size: 0.875rem;
    width: 80px;
    height: 10px;
    padding: 0px;
    margin: 0px;
    outline: none;
    border: none;
    padding: 20px;
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;
    -webkit-appearance: none;
  }
`;
