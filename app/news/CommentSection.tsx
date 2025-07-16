import IcComntEtc from "@/assets/images/ic_cmnt_etc (1).svg";
import IcHeart from "@/assets/images/ic_hrt.svg";
import IcSend from "@/assets/images/ic_send.svg";
import IcComment from "@/assets/images/material-symbols-light_reply-rounded.svg";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Reply = {
  id: string;
  user: string;
  time: string;
  content: string;
  opinion: string;
};

type Comment = {
  id: string;
  user: string;
  time: string;
  content: string;
  opinion: string;
  replies: Reply[];
};

type Props = {
  comments: Comment[];
  likedComments: { [key: string]: boolean };
  onToggleLike: (commentId: string) => void;
  opinionTheme: Record<string, any>;
  opinionBgColors: Record<string, string>;
  commentRef?: React.RefObject<View>;
  onOpenOption: () => void;
};

export default function CommentSection({
  comments,
  likedComments,
  onToggleLike,
  opinionTheme,
  opinionBgColors,
  commentRef,
  onOpenOption,
}: Props) {
  return (
    <View ref={commentRef} style={styles.commentSection}>
      <Text style={styles.commentCount}>댓글 {comments.length}</Text>

      {comments.map((comment) => (
        <View key={comment.id} style={styles.commentBox}>
          <View style={styles.commentHeader}>
            <View
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
            >
              <View style={styles.userIcon} />
              <View>
                <Text style={styles.user}>{comment.user}</Text>
                <Text style={styles.time}>{comment.time}</Text>
              </View>

              <View
                style={[
                  styles.tag,
                  {
                    backgroundColor: opinionBgColors[comment.opinion],
                  },
                ]}
              >
                <Text
                  style={{
                    color: opinionTheme[comment.opinion].tagTextColor,
                    fontSize: 12,
                  }}
                >
                  {comment.opinion}
                </Text>
              </View>
            </View>
          </View>

          <Text style={styles.content}>{comment.content}</Text>

          <View style={styles.actions}>
            <View style={styles.iconRow}>
              <TouchableOpacity
                onPress={() => onToggleLike(comment.id)}
                style={styles.iconWithText}
              >
                <IcHeart
                  width={24}
                  height={24}
                  stroke={likedComments[comment.id] ? "#FF5A5F" : "#C4C4C4"}
                />
                <Text style={styles.actionText}>
                  {likedComments[comment.id] ? 11 : 10}
                </Text>
              </TouchableOpacity>
              <View style={styles.iconWithText}>
                <IcComment width={24} height={24} />
                <Text style={styles.actionText}>답글 달기</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onOpenOption}>
              <IcComntEtc width={20} height={20} />
            </TouchableOpacity>
          </View>

          {comment.replies.length > 0 && (
            <View style={styles.replyContainer}>
              {comment.replies.map((reply) => (
                <View key={reply.id} style={styles.replyBox}>
                  <View style={styles.commentHeader}>
                    <View style={styles.userIcon} />
                    <View>
                      <Text style={styles.user}>{reply.user}</Text>
                      <Text style={styles.time}>{reply.time}</Text>
                    </View>
                    <View
                      style={[
                        styles.tag,
                        {
                          backgroundColor: opinionBgColors[reply.opinion],
                        },
                      ]}
                    >
                      <Text
                        style={{
                          color: opinionTheme[reply.opinion].tagTextColor,
                          fontSize: 12,
                        }}
                      >
                        {reply.opinion}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.content}>{reply.content}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}

      <View style={styles.inputContainer}>
        <View style={styles.inputBox}>
          <View style={styles.avatar} />
          <TextInput
            placeholder="댓글을 입력하세요"
            style={styles.textInput}
            placeholderTextColor="#9CA3AF"
          />
        </View>
        <TouchableOpacity style={styles.sendButton}>
          <IcSend width={20} height={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  commentSection: { marginTop: 8, paddingTop: 8, paddingHorizontal: 20 },
  commentCount: {
    fontSize: 13,
    fontWeight: "500",
    color: "#40454A",
  },
  commentBox: {
    marginTop: 12,
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomColor: "#F4F5F7",
    borderBottomWidth: 2,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  userIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#dcdcdc",
    marginRight: 8,
  },
  user: { fontWeight: "bold", fontSize: 14 },
  time: { fontSize: 12, color: "#888" },
  tag: {
    marginLeft: "auto",
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 4,
    minWidth: 55,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  content: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
    paddingLeft: 40,
  },
  actions: {
    flexDirection: "row",
    marginTop: 8,
    alignItems: "center",
    paddingLeft: 40,
    justifyContent: "space-between",
  },
  iconWithText: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  iconRow: {
    flexDirection: "row",
  },
  actionText: {
    fontSize: 12,
    color: "#6B7280",
    marginLeft: 4,
  },
  replyContainer: {
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    padding: 12,
    marginTop: 12,
    marginLeft: 40,
  },
  replyBox: {
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderTopColor: "#F0F0F0",
    borderTopWidth: 1,
    backgroundColor: "#FFFFFF",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#E4E6E7",
    borderWidth: 1,
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flex: 1,
    marginRight: 8,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#F2F3F5",
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: "#89939F",
  },
  sendButton: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});
