interface RenderIfProps {
  shouldRender: boolean | undefined | null;
  children: React.ReactNode;
}

export const RenderIf = ({ shouldRender, children }: RenderIfProps) => {
  return shouldRender ? <>{children}</> : null;
};
