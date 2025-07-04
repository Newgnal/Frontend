import PlusIcon from "@/assets/images/ic_add.svg";
import SearchIcon from "@/assets/images/ic_search.svg";
import { Header } from "@/components/ui/Header";
// import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyPageScreen() {
  // const router = useRouter();
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header
          title="홈"
          leftSlot={<View />}
          rightSlot={
            <>
              <SearchIcon />
              <PlusIcon />
            </>
          }
        />

        <View style={styles.contents}>
          <View>
            <Text>인기테마</Text>
            <View>
              <View>
                <Text>1위</Text>
                <Text>반도체</Text>
              </View>
              <View>
                <Text>2위</Text>
                <Text>IT/인터넷</Text>
              </View>
              <View>
                <Text>3위</Text>
                <Text>모빌리티</Text>
              </View>
            </View>
            <View>
              <Text>지금 뜨는 이야기</Text>
              <View>
                <Text>1</Text>
              </View>
              <View>
                <Text>2</Text>
              </View>
              <View>
                <Text>3</Text>
              </View>
            </View>
            <View>
              <Text>방금 올라온 글</Text>
              <View>
                <Text>게시글 1</Text>
              </View>
              <View>
                <Text>게시글 2</Text>
              </View>
              <View>
                <Text>게시글 3</Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  contents: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    // alignSelf: "center",
  },
});
