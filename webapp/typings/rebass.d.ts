// from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/rebass
// last updated: 2019-10-25

declare module 'rebass' {
  import { ResponsiveStyleValue, SystemStyleObject } from '@styled-system/css'
  import * as React from 'react'
  import * as StyledSystem from 'styled-system'
  import { InterpolationWithTheme } from '@emotion/core'

  export {}

  export interface BaseProps extends React.RefAttributes<any> {
    as?: React.ElementType
    css?: InterpolationWithTheme<any>
  }

  /**
   * The `SxStyleProp` extension `SystemStyleObject` and `Emotion` [style props](https://emotion.sh/docs/object-styles)
   * such that properties that are part of the `Theme` will be transformed to
   * their corresponding values. Other valid CSS properties are also allowed.
   */
  export type SxStyleProp =
    | SystemStyleObject
    | Record<
        string,
        | SystemStyleObject
        | ResponsiveStyleValue<number | string>
        | Record<string, SystemStyleObject | ResponsiveStyleValue<number | string>>
      >

  export interface SxProps {
    /**
     * The sx prop lets you style elements inline, using values from your theme.
     */
    sx?: SxStyleProp
  }

  interface BoxKnownProps
    extends BaseProps,
      StyledSystem.SpaceProps,
      StyledSystem.LayoutProps,
      StyledSystem.FontSizeProps,
      StyledSystem.ColorProps,
      StyledSystem.FlexProps,
      StyledSystem.OrderProps,
      StyledSystem.AlignSelfProps,
      SxProps {
    variant?: StyledSystem.ResponsiveValue<string>
    tx?: string
  }
  export interface BoxProps
    extends BoxKnownProps,
      Omit<React.HTMLProps<HTMLDivElement>, keyof BoxKnownProps> {}

  interface ButtonKnownProps
    extends BoxKnownProps,
      StyledSystem.FontWeightProps,
      StyledSystem.ButtonStyleProps {}
  export interface ButtonProps
    extends ButtonKnownProps,
      Omit<React.HTMLProps<HTMLButtonElement>, keyof ButtonKnownProps> {}
  export const Button: React.FunctionComponent<ButtonProps>

  export interface CardProps
    extends BoxKnownProps,
      Omit<React.HTMLProps<HTMLDivElement>, keyof BoxKnownProps> {}

  interface FlexKnownProps
    extends BoxKnownProps,
      StyledSystem.FlexWrapProps,
      StyledSystem.FlexDirectionProps,
      StyledSystem.AlignItemsProps,
      StyledSystem.JustifyContentProps {}
  export interface FlexProps
    extends FlexKnownProps,
      Omit<React.HTMLProps<HTMLDivElement>, keyof FlexKnownProps> {}

  export const Box: React.FunctionComponent<FlexProps>
  export const Flex: React.FunctionComponent<FlexProps>
  export const Card: React.FunctionComponent<FlexProps>

  export interface ImageProps
    extends BoxKnownProps,
      Omit<React.HTMLProps<HTMLImageElement>, keyof BoxKnownProps> {}
  export const Image: React.FunctionComponent<ImageProps>

  // tslint:disable-next-line no-empty-interface
  interface LinkKnownProps extends BoxKnownProps {}
  export interface LinkProps
    extends LinkKnownProps,
      Omit<React.HTMLProps<HTMLAnchorElement>, keyof LinkKnownProps> {}
  export const Link: React.FunctionComponent<LinkProps>

  interface TextKnownProps
    extends BoxKnownProps,
      StyledSystem.FontFamilyProps,
      StyledSystem.FontWeightProps,
      StyledSystem.TextAlignProps,
      StyledSystem.LineHeightProps,
      StyledSystem.LetterSpacingProps {}
  export interface TextProps
    extends TextKnownProps,
      Omit<React.HTMLProps<HTMLDivElement>, keyof TextKnownProps> {}
  export const Text: React.FunctionComponent<TextProps>

  export interface HeadingProps
    extends TextKnownProps,
      Omit<React.HTMLProps<HTMLHeadingElement>, keyof TextKnownProps> {}
  export const Heading: React.FunctionComponent<HeadingProps>
}
