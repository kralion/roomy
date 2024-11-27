// import { TermsPolicyModal } from "@/components/popups/terms&policy";
import { useOAuth, useSignUp } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { Link, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { Image, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function SignUpScreen() {
  const { signUp, setActive } = useSignUp();
  const [showTCModal, setShowTCModal] = React.useState(false);
  const router = useRouter();

  return (
    <ScrollView>
      <SafeAreaView style={{ paddingHorizontal: 16, paddingTop: 16 }}>
        <View className="flex flex-col gap-5 w-full">
          <View className="flex flex-col align-middle gap-1">
            <Image
              style={{
                width: 125,
                height: 125,
              }}
              source={require("../../assets/logo.png")}
            />
            <Text className="text-2xl font-bold"> Crea una cuenta</Text>
            <View className="flex gap-1.5">
              <Text>Ya tienes una cuenta?</Text>

              <Text
                className="text-primary active:underline"
                onPress={() => router.back()}
              >
                Inicia Sesión
              </Text>
            </View>
          </View>

          <View className="space-y-4">
            <SignInWithOAuthGoogle />
            <SignInWithOAuthFacebook />
            <SignInWithOAuthTiktok />
          </View>
          <View className="space-y-6 align-middle">
            <Text className="text-secondary text-sm text-center">
              Al continuar aceptas los{" "}
              <Text
                className="text-primary active:underline active:opacity-80"
                onPress={() => setShowTCModal(true)}
              >
                Términos y Condiciones{" "}
              </Text>
              , en estos se describen como usamos tus datos y como protegemos tu
              privacidad.
            </Text>
            <View className="flex justify-center align-middle">
              <Text className="text-sm">Copyright © 2024 </Text>
              <Text className="text-sm text-primary active:underline">
                <Link href="https://x.com/brayanpaucar_">Brayan</Link>
              </Text>

              <Text> & </Text>
              <Text className="text-sm text-primary active:underline">
                <Link href="https://x.com/MiguelParis11">Miguel</Link>
              </Text>
            </View>
          </View>
        </View>
        {/* <TermsPolicyModal
          openModal={showTCModal}
          setOpenModal={setShowTCModal}
        /> */}
      </SafeAreaView>
    </ScrollView>
  );
}

export const SignInWithOAuthGoogle = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/(tabs)", { scheme: "roomy" }),
      });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <Button variant="outline" size="lg" onPress={onPress}>
      <Image
        style={{ width: 24, height: 24 }}
        source={{
          uri: "https://img.icons8.com/?size=96&id=17949&format=png",
        }}
        alt="google"
      />
      Continuar con Google
    </Button>
  );
};
export const SignInWithOAuthTiktok = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_tiktok" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/(tabs)", { scheme: "roomy" }),
      });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <Button variant="outline" size="lg" onPress={onPress}>
      <Image
        style={{ width: 24, height: 24 }}
        source={{
          uri: "https://cdn-icons-png.flaticon.com/128/3046/3046121.png",
        }}
        alt="tiktok"
      />
      Continuar con TikTok
    </Button>
  );
};
export const SignInWithOAuthFacebook = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_facebook" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/(tabs)", { scheme: "roomy" }),
      });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <Button variant="outline" size="lg" onPress={onPress}>
      <Image
        style={{ width: 24, height: 24 }}
        source={{
          uri: "https://cdn-icons-png.flaticon.com/128/5968/5968764.png",
        }}
        alt="Facebook"
      />
      Continuar con Facebook
    </Button>
  );
};
