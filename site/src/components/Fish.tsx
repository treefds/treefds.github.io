import type { Game } from '../content';

/** Image-space mouth anchors keep catch positioning independent of asset format. */
export function Fish({ game }: { game: Game }) {
  const { width, height, mouthX, mouthY, facing } = game.fishGeometry;
  return (
    <span
      className="fish-illustration"
      data-facing={facing}
      data-mouth-x={mouthX / width}
      data-mouth-y={mouthY / height}
    >
      <img
        className="fish-art"
        src={`./assets/${game.fishAsset}`}
        width={width}
        height={height}
        alt=""
      />
    </span>
  );
}
