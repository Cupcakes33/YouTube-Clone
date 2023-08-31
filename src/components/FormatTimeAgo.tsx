import TimeAgo from "timeago-react";
import * as timeago from "timeago.js";
import ko from "timeago.js/lib/lang/ko";

type Props = {
  date: string;
};

timeago.register("ko", ko);

export default function FormatTimeAgo({ date }: Props) {
  return <TimeAgo datetime={date} locale="ko" />;
}
