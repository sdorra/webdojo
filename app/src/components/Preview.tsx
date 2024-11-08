import { Loading } from "./Loading";

type Props = {
  url?: string;
  challenge: string;
};

export function Preview({ url, challenge }: Props) {
  if (!url) {
    return (
      <div className="flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <iframe
      className="w-full h-full border"
      src={`${url}?challenge=${challenge}`}
      title="Preview"
    />
  );
}
