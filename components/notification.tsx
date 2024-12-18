import { INotification } from "@/interfaces/notification";
import { View } from "react-native";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Text } from "./ui/text";
const iconos = {
  info: "https://img.icons8.com/?size=100&id=VQOfeAx5KWTK&format=png&color=000000",
  warning: "https://img.icons8.com/?size=48&id=12116&format=png",
  error: "https://img.icons8.com/?size=48&id=12226&format=png",
};

export default function Notification({
  notification,
}: {
  notification: INotification;
}) {
  const formattedDate = new Date(notification.created_At).toLocaleDateString(
    "es-ES",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }
  );

  return (
    <View className="flex-row bg-white px-4 items-center gap-1">
      <Avatar alt="User">
        <AvatarImage source={{ uri: iconos[notification.tipo] }} />
      </Avatar>

      <View className="flex-1 border-t border-gray-100 p-2">
        <View className="flex-row justify-between items-center mb-1">
          <Text className="font-bold text-gray-900">
            {notification.title.toUpperCase()}
          </Text>
          <Text className="text-sm text-gray-500">{formattedDate}</Text>
        </View>

        <Text className="text-sm text-gray-600 leading-5">
          {notification.description.slice(0, 100)}...
        </Text>
      </View>
    </View>
  );
}
