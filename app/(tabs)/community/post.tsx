import EtcVerIcon from "@/assets/images/ic_cmnt_etc_ver.svg";
import ShareIcon from "@/assets/images/ic_header.svg";
import NextLgIcon from "@/assets/images/icon_next_lg.svg";
import { Header } from "@/components/ui/Header";

export default function PostScreen() {
  return (
    <>
      <Header
        title=""
        leftSlot={<NextLgIcon />}
        rightSlot={
          <>
            <ShareIcon />
            <EtcVerIcon />
          </>
        }
      />
    </>
  );
}
