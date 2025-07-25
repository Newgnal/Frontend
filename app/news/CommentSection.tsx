/* eslint-disable react/display-name */
import IcComntEtc from "@/assets/images/ic_cmnt_etc (1).svg";
import IcHeart from "@/assets/images/ic_hrt.svg";
import Icfillheart from "@/assets/images/ic_hrt_filled.svg";
import IcSend from "@/assets/images/ic_send.svg";
import IcComment from "@/assets/images/material-symbols-light_reply-rounded.svg";
import { typography } from "@/styles/typography";
import { forwardRef, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Reply = {
  id: number;
  user: string;
  time: string;
  content: string;
  voteType?: string;
  opinion: string;
};

type Comment = {
  id: number;
  user: string;
  time: string;
  content: string;
  opinion: string;
  voteType?: string;
  replies: Comment[];
};

type Props = {
  comments: Comment[];
  commentInput: string;
  setCommentInput: React.Dispatch<React.SetStateAction<string>>;
  onPostComment: (newsId: number, comment: string, voteType?: string) => void;
  onOpenOption: () => void;
  onSelectComment: (commentId: number) => void;
  isEditing: boolean;
  selectedCommentId: number | null;
  onEditComment: (
    commentId: number,
    newContent: string,
    newsId: number
  ) => void;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  newsId: number;
  onDeleteComment: (commentId: number) => void;
  onPostReply: (parentId: number, comment: string) => void;

  likedCounts: { [key: number]: number };
  likedCommentIds: { [key: number]: boolean };
  onToggleLike: (commentId: number) => void;
  opinionTheme: any;
  opinionBgColors: any;
};

const CommentSection = forwardRef<View, Props>(
  (
    {
      comments,
      likedCounts,
      likedCommentIds,
      onToggleLike,
      opinionTheme,
      opinionBgColors,
      onOpenOption,
      newsId,
      onSelectComment,
      commentInput,
      setCommentInput,
      onPostComment,
      isEditing,
      selectedCommentId,
      onEditComment,
      setIsEditing,
      onPostReply,
    },
    ref
  ) => {
    const [replyTargetId, setReplyTargetId] = useState<number | null>(null);
    const [replyInput, setReplyInput] = useState("");
    const [selectedVoteType, setSelectedVoteType] = useState("NEUTRAL");

    useEffect(() => {
      setReplyTargetId(null);
      setReplyInput("");
    }, [comments]);

    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={90}
      >
        <View style={{ flex: 1 }} ref={ref}>
          <ScrollView
            contentContainerStyle={styles.commentSection}
            showsVerticalScrollIndicator={false}
          >
            {comments.length > 0 && <View style={styles.divider} />}

            <Text style={styles.commentCount}>댓글 {comments.length}</Text>

            {comments.map((comment) => (
              <View key={comment.id} style={styles.commentBox}>
                <View style={styles.commentHeader}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <View style={styles.userIcon} />
                    <View>
                      <Text style={styles.user}>{comment.user}</Text>
                      <Text style={styles.time}>{comment.time}</Text>
                    </View>
                    <View
                      style={[
                        styles.tag,
                        { backgroundColor: opinionBgColors[comment.opinion] },
                      ]}
                    >
                      <Text
                        style={{
                          color: opinionTheme[comment.opinion].tagTextColor,
                          fontSize: 12,
                          fontWeight: "400",
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
                      {likedCommentIds[comment.id] ? (
                        <Icfillheart width={24} height={24} />
                      ) : (
                        <IcHeart width={24} height={24} />
                      )}
                      <Text style={styles.actionText}>
                        {likedCounts[comment.id] ?? 0}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        setReplyTargetId(comment.id);
                        setReplyInput("");
                      }}
                      style={styles.iconWithText}
                    >
                      <IcComment width={24} height={24} />
                      <Text style={styles.actionText}>답글 달기</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      onSelectComment(comment.id);
                      onOpenOption();
                    }}
                  >
                    <IcComntEtc width={20} height={20} />
                  </TouchableOpacity>
                </View>
                {Array.isArray(comment.replies) &&
                  comment.replies.length > 0 && (
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
                                  backgroundColor:
                                    opinionBgColors[reply.opinion],
                                },
                              ]}
                            >
                              <Text
                                style={{
                                  color:
                                    opinionTheme[reply.opinion].tagTextColor,
                                  fontSize: 12,
                                }}
                              >
                                {reply.opinion}
                              </Text>
                            </View>
                          </View>
                          <Text style={styles.content}>
                            <Text
                              style={{ color: "#497AFA", fontWeight: "bold" }}
                            >
                              @{comment.user}{" "}
                            </Text>
                            {reply.content}
                          </Text>
                          <View style={styles.actions}>
                            <View style={styles.iconRow}>
                              <TouchableOpacity
                                onPress={() => onToggleLike(reply.id)}
                                style={styles.iconWithText}
                              >
                                {likedCommentIds[reply.id] ? (
                                  <Icfillheart width={24} height={24} />
                                ) : (
                                  <IcHeart width={24} height={24} />
                                )}
                                <Text style={styles.actionText}>
                                  {likedCounts[reply.id] ?? 0}
                                </Text>
                              </TouchableOpacity>

                              <TouchableOpacity
                                onPress={() => {
                                  setReplyTargetId(comment.id);
                                  setReplyInput(`@${reply.user} `);
                                }}
                                style={styles.iconWithText}
                              >
                                <IcComment width={24} height={24} />
                                <Text style={styles.actionText}>답글 달기</Text>
                              </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                              onPress={() => {
                                onSelectComment(reply.id);
                                onOpenOption();
                              }}
                            >
                              <IcComntEtc width={20} height={20} />
                            </TouchableOpacity>
                          </View>
                        </View>
                      ))}
                    </View>
                  )}
              </View>
            ))}
          </ScrollView>

          <View style={styles.inputContainer}>
            <View style={styles.inputBox}>
              <View style={styles.avatar} />
              <TextInput
                placeholder={
                  replyTargetId ? "답글을 입력하세요" : "댓글을 입력하세요"
                }
                style={styles.textInput}
                placeholderTextColor="#9CA3AF"
                value={replyTargetId ? replyInput : commentInput}
                onChangeText={replyTargetId ? setReplyInput : setCommentInput}
              />
            </View>

            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => {
                if (replyTargetId !== null) {
                  if (replyInput.trim() && onPostReply) {
                    onPostReply(replyTargetId, replyInput);

                    setReplyInput("");
                    setReplyTargetId(null);
                  }
                } else {
                  if (isEditing && selectedCommentId !== null) {
                    onEditComment(selectedCommentId, commentInput, newsId);
                  } else {
                    onPostComment(newsId, commentInput, selectedVoteType);
                    setCommentInput("");
                  }
                }
              }}
            >
              <IcSend width={20} height={20} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
);

export default CommentSection;

const styles = StyleSheet.create({
  commentSection: {
    paddingTop: 8,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  divider: {
    borderBottomColor: "#F4F5F7",
    borderBottomWidth: 8,
    marginBottom: 16,
    marginTop: 20,
  },
  commentCount: {
    ...typography.label_l3_13_regular,
    color: "#40454A",
  },
  commentBox: {
    marginTop: 20,
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
  user: {
    ...typography.label_l2_13_medium,
    color: "#0E0F15",
  },
  time: {
    ...typography.label_l3_13_regular,
    color: "#40454A",
  },
  tag: {
    marginLeft: "auto",
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 4,
    width: 57,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  content: {
    ...typography.body_b3_14_regular,
    color: "#0E0F15",
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
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    marginLeft: 0,
    gap: 12,
  },

  replyBox: {
    borderRadius: 8,
    padding: 12,
    paddingLeft: 25,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
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
    color: "#0E0F15",
  },
  sendButton: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});
