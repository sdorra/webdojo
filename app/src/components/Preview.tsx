type Props = {
  url?: string;
};

export function Preview({ url }: Props) {
  if (!url) {
    return <div className="w-full h-full border">Loading...</div>;
  }

  return (
    <iframe
      className="w-full h-full border"
      src={url}
      title="Preview"
    />
  );
}