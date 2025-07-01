import classNames from "classnames/bind";

import AddLinkPrompt from "./_components/AddLinkPrompt/AddLinkPrompt";
import styles from "./page.module.css";

const cx = classNames.bind(styles);

interface BoxPageProps {
  params: Promise<{
    boxId: string;
  }>;
}

export default async function BoxPage({ params }: BoxPageProps) {
  const { boxId } = await params;

  return (
    <div className={cx("container")}>
      <AddLinkPrompt boxId={boxId} />
    </div>
  );
}
