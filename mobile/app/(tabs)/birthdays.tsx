import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Calendar, Gift, MessageCircle, Bell, Cake, Phone, Mail, ChevronRight } from 'lucide-react-native';

type Birthday = {
  id: string;
  name: string;
  photo: string;
  date: string;
  age: number;
  phone: string;
  email: string;
  daysUntil: number;
  isToday: boolean;
};

export default function BirthdaysScreen() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Mock birthday data
  const birthdays: Birthday[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      photo: 'https://i.pravatar.cc/150?img=1',
      date: 'March 15',
      age: 28,
      phone: '(555) 123-4567',
      email: 'sarah.j@email.com',
      daysUntil: 0,
      isToday: true,
    },
    {
      id: '2',
      name: 'Michael Chen',
      photo: 'https://i.pravatar.cc/150?img=12',
      date: 'March 16',
      age: 35,
      phone: '(555) 234-5678',
      email: 'michael.c@email.com',
      daysUntil: 1,
      isToday: false,
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      photo: 'https://i.pravatar.cc/150?img=5',
      date: 'March 18',
      age: 42,
      phone: '(555) 345-6789',
      email: 'emily.r@email.com',
      daysUntil: 3,
      isToday: false,
    },
    {
      id: '4',
      name: 'David Thompson',
      photo: 'https://i.pravatar.cc/150?img=13',
      date: 'March 22',
      age: 31,
      phone: '(555) 456-7890',
      email: 'david.t@email.com',
      daysUntil: 7,
      isToday: false,
    },
    {
      id: '5',
      name: 'Jessica Williams',
      photo: 'https://i.pravatar.cc/150?img=9',
      date: 'March 25',
      age: 29,
      phone: '(555) 567-8901',
      email: 'jessica.w@email.com',
      daysUntil: 10,
      isToday: false,
    },
    {
      id: '6',
      name: 'Robert Martinez',
      photo: 'https://i.pravatar.cc/150?img=14',
      date: 'March 28',
      age: 38,
      phone: '(555) 678-9012',
      email: 'robert.m@email.com',
      daysUntil: 13,
      isToday: false,
    },
  ];

  const todaysBirthdays = birthdays.filter(b => b.isToday);
  const upcomingBirthdays = birthdays.filter(b => !b.isToday).sort((a, b) => a.daysUntil - b.daysUntil);

  const handleSendWishes = (person: Birthday) => {
    // Placeholder for sending birthday wishes
    console.log('Sending wishes to:', person.name);
  };

  const handleSetReminder = (person: Birthday) => {
    // Placeholder for setting reminder
    console.log('Setting reminder for:', person.name);
  };

  const handleCall = (phone: string) => {
    console.log('Calling:', phone);
  };

  const handleEmail = (email: string) => {
    console.log('Emailing:', email);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 border-b border-border">
        <View>
          <Text className="text-2xl font-bold text-foreground">Birthdays</Text>
          <Text className="text-sm text-muted-foreground mt-1">
            {todaysBirthdays.length} today • {upcomingBirthdays.length} upcoming
          </Text>
        </View>
        {/* <ThemeToggle /> */}
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 128 }}>
        {/* Month Selector */}
        <View className="px-6 py-4">
          <Text className="text-sm font-semibold text-muted-foreground mb-3">SELECT MONTH</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}
          >
            {months.map((month, index) => (
              <TouchableOpacity
                key={month}
                onPress={() => setSelectedMonth(index)}
                className={`px-4 py-2 rounded-full border ${
                  selectedMonth === index
                    ? 'bg-primary border-primary'
                    : 'bg-card border-border'
                }`}
              >
                <Text
                  className={`font-medium ${
                    selectedMonth === index
                      ? 'text-primary-foreground'
                      : 'text-foreground'
                  }`}
                >
                  {month}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Today's Birthdays */}
        {todaysBirthdays.length > 0 && (
          <View className="px-6 mb-6">
            <View className="flex-row items-center mb-4">
              <Cake className="text-primary mr-2" size={20} />
              <Text className="text-lg font-bold text-foreground">Today's Birthdays 🎉</Text>
            </View>

            {todaysBirthdays.map((person) => (
              <View key={person.id} className="bg-primary/10 rounded-2xl p-4 mb-3 border-2 border-primary">
                <View className="flex-row items-start">
                  <Image
                    source={{ uri: person.photo }}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <View className="flex-1">
                    <View className="flex-row items-center justify-between mb-1">
                      <Text className="text-lg font-bold text-foreground">{person.name}</Text>
                      <View className="bg-primary px-3 py-1 rounded-full">
                        <Text className="text-primary-foreground text-xs font-bold">TODAY</Text>
                      </View>
                    </View>
                    <View className="flex-row items-center mb-3">
                      <Calendar className="text-muted-foreground mr-1" size={14} />
                      <Text className="text-sm text-muted-foreground">
                        {person.date} • Turning {person.age}
                      </Text>
                    </View>

                    {/* Contact Info */}
                    <View className="flex-row items-center gap-4 mb-3">
                      <TouchableOpacity 
                        onPress={() => handleCall(person.phone)}
                        className="flex-row items-center"
                      >
                        <Phone className="text-primary mr-1" size={14} />
                        <Text className="text-xs text-primary">{person.phone}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        onPress={() => handleEmail(person.email)}
                        className="flex-row items-center"
                      >
                        <Mail className="text-primary mr-1" size={14} />
                        <Text className="text-xs text-primary">Email</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Quick Actions */}
                    <View className="flex-row gap-2">
                      <TouchableOpacity
                        onPress={() => handleSendWishes(person)}
                        className="flex-1 bg-primary py-2 rounded-lg flex-row items-center justify-center"
                      >
                        <MessageCircle className="text-primary-foreground mr-2" size={16} />
                        <Text className="text-primary-foreground font-semibold text-sm">
                          Send Wishes
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleCall(person.phone)}
                        className="bg-secondary py-2 px-4 rounded-lg"
                      >
                        <Phone className="text-secondary-foreground" size={16} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Upcoming Birthdays */}
        <View className="px-6">
          <View className="flex-row items-center mb-4">
            <Gift className="text-primary mr-2" size={20} />
            <Text className="text-lg font-bold text-foreground">Upcoming Birthdays</Text>
          </View>

          {upcomingBirthdays.map((person, index) => (
            <TouchableOpacity
              key={person.id}
              className="bg-card rounded-2xl p-4 mb-3 border border-border"
            >
              <View className="flex-row items-start">
                <Image
                  source={{ uri: person.photo }}
                  className="w-14 h-14 rounded-full mr-3"
                />
                <View className="flex-1">
                  <View className="flex-row items-center justify-between mb-1">
                    <Text className="text-base font-bold text-foreground">{person.name}</Text>
                    <View className="bg-accent px-3 py-1 rounded-full">
                      <Text className="text-accent-foreground text-xs font-semibold">
                        {person.daysUntil === 1 ? '1 day' : `${person.daysUntil} days`}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row items-center mb-3">
                    <Calendar className="text-muted-foreground mr-1" size={12} />
                    <Text className="text-sm text-muted-foreground">
                      {person.date} • {person.age} years old
                    </Text>
                  </View>

                  {/* Quick Actions Row */}
                  <View className="flex-row gap-2">
                    <TouchableOpacity
                      onPress={() => handleSetReminder(person)}
                      className="flex-row items-center bg-secondary px-3 py-2 rounded-lg"
                    >
                      <Bell className="text-secondary-foreground mr-1" size={14} />
                      <Text className="text-secondary-foreground text-xs font-medium">
                        Set Reminder
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleCall(person.phone)}
                      className="bg-secondary px-3 py-2 rounded-lg"
                    >
                      <Phone className="text-secondary-foreground" size={14} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleEmail(person.email)}
                      className="bg-secondary px-3 py-2 rounded-lg"
                    >
                      <Mail className="text-secondary-foreground" size={14} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Birthday Stats Card */}
        <View className="px-6 mt-6">
          <View className="bg-gradient-to-r from-primary to-accent rounded-2xl p-6">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-primary-foreground text-2xl font-bold mb-1">
                  {birthdays.length}
                </Text>
                <Text className="text-primary-foreground/80 text-sm">
                  Birthdays This Month
                </Text>
              </View>
              <Cake className="text-primary-foreground" size={40} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}