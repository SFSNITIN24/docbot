import styled from "styled-components";

interface CircleProps {
  width?: string;
  height?: string;
  bg?: string;
  mediaQuery?: {
    screenSize: string;
    style?: {
      width?: string;
      height?: string;
    };
  };
  mediaQuerySm?: {
    screenSize: string;
    style?: {
      width?: string;
      height?: string;
    };
  };
}

export const Circle = styled.div<CircleProps>`
  width: ${(props) => props.width || "46px"};
  height: ${(props) => props.height || "46px"};
  border-radius: 50%;
  background-color: ${(props) => props.bg || "white"};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @media (max-width: ${({ mediaQuery }) => mediaQuery?.screenSize}) {
    width: ${({ mediaQuery }) => mediaQuery?.style?.width || "100%"};
    height: ${({ mediaQuery }) => mediaQuery?.style?.height || "100%"};
  }

  @media (max-width: ${({ mediaQuerySm }) => mediaQuerySm?.screenSize}) {
    width: ${({ mediaQuerySm }) => mediaQuerySm?.style?.width || "100%"};
    height: ${({ mediaQuerySm }) => mediaQuerySm?.style?.height || "100%"};
  }
`;