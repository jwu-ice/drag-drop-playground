import Link from "next/link";

export type ALink = {
  url: string;
  redirectText: string;
  buttonText: string;
};

const RedirectText = ({ url, redirectText, buttonText }: ALink) => {
  return (
    <div className="space-x-2">
      <span className="text-xs">{redirectText}</span>
      <Link href={url} className="text-xs font-bold">
        {buttonText}
      </Link>
    </div>
  );
};

export default RedirectText;
