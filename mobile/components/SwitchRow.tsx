import { View } from 'react-native';
import { Text } from './ui/text';
import { Switch } from './ui/switch';

export function SwitchRow({
  title,
  description,
  value,
  onChange,
}: {
  title: string;
  description?: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <View className="flex-row items-center justify-between border-b border-border p-4">
      <View className="flex-1">
        <Text className="font-semibold text-foreground">{title}</Text>
        {description && <Text className="mt-1 text-sm text-muted-foreground">{description}</Text>}
      </View>
      <Switch checked={value} onCheckedChange={onChange} />
    </View>
  );
}
