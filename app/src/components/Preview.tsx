import { Loading } from "./Loading";

type Props = {
  url?: string;
  challenge: string;
};

export function Preview({ url, challenge }: Props) {
  if (!url) {
    return (
      <div className="flex items-center justify-center h-[90%]">
        <Loading />
      </div>
    );
  }

  return (
    <iframe
      className="h-full w-full"
      src={`${url}?challenge=${challenge}`}
      title="Preview"
    />
  );
}
