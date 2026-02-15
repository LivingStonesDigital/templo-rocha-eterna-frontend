import { useColorScheme } from 'nativewind';
import { TouchableOpacity } from 'react-native';
import { Sun, Moon } from 'lucide-react-native';

export function ThemeToggle() {
  const { colorScheme, setColorScheme } = useColorScheme();

  return (
    <TouchableOpacity onPress={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}>
      {colorScheme === 'dark' ? (
        <Sun color='#efefef' className="text-foreground" size={24} />
      ) : (
        <Moon color='#232222' className="text-foreground" size={24} />
      )}
    </TouchableOpacity>
  );
}
