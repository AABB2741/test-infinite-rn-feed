export interface ResizeProps {
  from: {
    width: number;
    height: number;
  };
  to?: {
    width?: number;
    height?: number;
  };
}

export function resize({ from, to }: ResizeProps) {
  const widthRatio = (to?.width ?? from.width) / from.width;
  const heightRatio = (to?.height ?? from.height) / from.height;

  const ratio = Math.min(widthRatio, heightRatio);

  const newWidth = Math.floor(from.width * ratio);
  const newHeight = Math.floor(from.height * ratio);

  return {
    newWidth,
    newHeight,
  };
}
